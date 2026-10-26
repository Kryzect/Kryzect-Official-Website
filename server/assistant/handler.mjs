import { randomUUID } from 'node:crypto'
import { SITE_URL } from '../../src/config.js'
import {
  ASSISTANT_LIMITS,
  validateAssistantRequest,
} from '../../src/utils/assistant.js'
import { createLimiter, limiterKeys, LimitError } from './limits.mjs'
import { generateReply } from './providers.mjs'
import { canUseFreeGemini } from './eligibility.mjs'

class RequestError extends Error {
  constructor(status) {
    super('Invalid assistant request')
    this.status = status
  }
}

export function allowedOrigin(origin, env) {
  if (typeof origin !== 'string') return false
  try {
    const url = new URL(origin)
    if (url.origin !== origin || url.username || url.password) return false
    if (
      env.VERCEL !== '1' &&
      env.NODE_ENV !== 'production' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) &&
      url.protocol === 'http:'
    )
      return true
    const configured = [
      SITE_URL,
      ...String(env.ASSISTANT_ALLOWED_ORIGINS || '').split(','),
      ...[env.VERCEL_URL, env.VERCEL_BRANCH_URL]
        .filter(Boolean)
        .map((host) => `https://${host}`),
    ]
      .map((value) => value.trim())
      .filter(Boolean)
    return url.protocol === 'https:' && configured.includes(origin)
  } catch {
    return false
  }
}

async function readBody(request) {
  const length = Number(request.headers['content-length'])
  if (Number.isFinite(length) && length > ASSISTANT_LIMITS.requestBytes)
    throw new RequestError(413)
  if (request.body !== undefined) {
    const text =
      typeof request.body === 'string'
        ? request.body
        : JSON.stringify(request.body)
    if (Buffer.byteLength(text) > ASSISTANT_LIMITS.requestBytes)
      throw new RequestError(413)
    try {
      return JSON.parse(text)
    } catch {
      throw new RequestError(400)
    }
  }
  let size = 0
  const chunks = []
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += Buffer.byteLength(chunk)
    if (size > ASSISTANT_LIMITS.requestBytes) {
      request.resume()
      throw new RequestError(413)
    }
    chunks.push(Buffer.from(chunk))
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new RequestError(400)
  }
}

export function createAssistantHandler({
  env = process.env,
  fetchImpl = fetch,
  limiter = createLimiter({ env, fetchImpl }),
  onEvent = () => {},
} = {}) {
  return async function assistantHandler(request, response) {
    const requestId = randomUUID()
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.setHeader('X-Robots-Tag', 'noindex, nofollow')
    const send = (status, body) => {
      if (response.destroyed || response.writableEnded) return
      response.statusCode = status
      response.end(JSON.stringify({ ...body, requestId }))
    }
    if (
      request.method === 'GET' &&
      new URL(request.url, 'http://localhost').searchParams.get('config') ===
        '1'
    ) {
      const production = env.VERCEL === '1' || env.NODE_ENV === 'production'
      send(200, {
        aiEnabled:
          env.ASSISTANT_ENABLED !== 'false' &&
          Boolean(
            (env.GEMINI_API_KEY && canUseFreeGemini(request, env)) ||
            env.OPENROUTER_API_KEY,
          ) &&
          (!production ||
            Boolean(
              env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN,
            )),
      })
      return
    }
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      send(405, { error: 'method_not_allowed' })
      return
    }
    if (!allowedOrigin(request.headers.origin, env)) {
      send(403, { error: 'forbidden' })
      return
    }
    if (
      !/^application\/json(?:\s*;|$)/i.test(
        request.headers['content-type'] || '',
      )
    ) {
      send(415, { error: 'unsupported_media_type' })
      return
    }
    if (
      env.ASSISTANT_ENABLED === 'false' ||
      (!env.GEMINI_API_KEY && !env.OPENROUTER_API_KEY)
    ) {
      send(503, { error: 'unavailable' })
      return
    }
    const cancelled = new AbortController()
    const disconnect = () => {
      if (!response.writableEnded) cancelled.abort()
    }
    request.once('aborted', disconnect)
    response.once('close', disconnect)
    try {
      const body = validateAssistantRequest(await readBody(request))
      if (!body) throw new RequestError(400)
      await limiter.reserve(limiterKeys(request, body.sessionId, env))
      const reply = await generateReply(body, {
        env: canUseFreeGemini(request, env)
          ? env
          : { ...env, GEMINI_API_KEY: '' },
        fetchImpl,
        limiter,
        signal: AbortSignal.any([cancelled.signal, AbortSignal.timeout(33000)]),
        onEvent: (event) => onEvent({ ...event, requestId }),
      })
      send(200, reply)
    } catch (error) {
      if (cancelled.signal.aborted) return
      if (error instanceof RequestError) {
        send(error.status, { error: 'invalid_request' })
        return
      }
      if (error instanceof LimitError && error.code === 'rate_limited') {
        response.setHeader('Retry-After', String(error.retryAfter))
        send(429, { error: 'rate_limited' })
        return
      }
      // Never expose provider error bodies, prompts, secrets, or exception messages.
      onEvent({
        event: 'assistant_unavailable',
        requestId,
        code: error instanceof LimitError ? error.code : 'unavailable',
      })
      send(503, { error: 'unavailable' })
    } finally {
      request.off('aborted', disconnect)
      response.off('close', disconnect)
    }
  }
}
