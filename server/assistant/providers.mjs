import { RESPONSE_SCHEMA, SYSTEM_POLICY } from './policy.mjs'
import { ACTIONS, KNOWLEDGE } from './knowledge.mjs'
import { ASSISTANT_LIMITS } from '../../src/utils/assistant.js'

export class ProviderError extends Error {
  constructor(code, status = 0) {
    super(code)
    this.name = 'ProviderError'
    this.code = code
    this.status = status
  }
}

export function validateReply(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    Object.keys(value).sort().join() !==
      'actionIds,answer,disposition,sourceIds'
  )
    throw new ProviderError('invalid_output')
  const { disposition, answer, sourceIds, actionIds } = value
  if (
    !RESPONSE_SCHEMA.properties.disposition.enum.includes(disposition) ||
    typeof answer !== 'string' ||
    !answer.trim() ||
    answer.length > ASSISTANT_LIMITS.answer
  )
    throw new ProviderError('invalid_output')
  if (/https?:\/\/|www\.|<[a-z!/][^>]*>/i.test(answer))
    throw new ProviderError('invalid_output')
  if (
    !Array.isArray(sourceIds) ||
    sourceIds.length > 4 ||
    sourceIds.some(
      (id) =>
        typeof id !== 'string' || !KNOWLEDGE.some((entry) => entry.id === id),
    )
  )
    throw new ProviderError('invalid_output')
  if (
    !Array.isArray(actionIds) ||
    actionIds.length > 3 ||
    actionIds.some(
      (id) => typeof id !== 'string' || !Object.hasOwn(ACTIONS, id),
    )
  )
    throw new ProviderError('invalid_output')
  if (disposition === 'answer' && !sourceIds.length)
    throw new ProviderError('ungrounded_output')
  if (disposition === 'out_of_scope')
    return {
      disposition,
      answer:
        'I can help with Kryzect’s services, products, founder, and project enquiries. If you’re exploring something you’d like us to build, tell me about it.',
      sources: [],
      actions: [],
    }
  return {
    disposition,
    answer: answer.trim(),
    sources: [...new Set(sourceIds)].slice(0, 2).map((id) => {
      const entry = KNOWLEDGE.find((item) => item.id === id)
      return { id, label: entry.label, href: entry.url }
    }),
    actions: [
      ...new Set(
        disposition === 'unknown' ? ['contact', ...actionIds] : actionIds,
      ),
    ]
      .filter(
        (id) =>
          !sourceIds
            .slice(0, 2)
            .some(
              (sourceId) =>
                KNOWLEDGE.find((entry) => entry.id === sourceId)?.url ===
                ACTIONS[id].href,
            ),
      )
      .slice(0, 1)
      .map((id) => ({ id, ...ACTIONS[id] })),
  }
}

async function readResponse(response) {
  if (!response.ok) {
    await response.body?.cancel().catch(() => {})
    throw new ProviderError('upstream_http', response.status)
  }
  const reader = response.body?.getReader()
  if (!reader) throw new ProviderError('invalid_output')
  let size = 0
  const chunks = []
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 100000) throw new ProviderError('oversized_output')
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch (error) {
    await reader.cancel().catch(() => {})
    if (error instanceof ProviderError) throw error
    throw new ProviderError('invalid_output')
  } finally {
    reader.releaseLock()
  }
}

export async function callProvider(
  name,
  request,
  { env, fetchImpl = fetch, signal, timeoutMs = 8500 },
) {
  const localSignal = AbortSignal.any([
    signal ?? new AbortController().signal,
    AbortSignal.timeout(timeoutMs),
  ])
  const conversation = JSON.stringify({
    conversation: request.history,
    question: request.message,
  })
  let url, headers, body
  if (name === 'gemini') {
    const model = env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
    if (
      ![
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-3.1-flash-lite',
        'gemini-3.5-flash-lite',
      ].includes(model)
    )
      throw new ProviderError('non_free_model_not_allowed')
    url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    headers = {
      'Content-Type': 'application/json',
      'x-goog-api-key': env.GEMINI_API_KEY,
    }
    body = {
      systemInstruction: { parts: [{ text: SYSTEM_POLICY }] },
      contents: [{ role: 'user', parts: [{ text: conversation }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 768,
        responseMimeType: 'application/json',
        responseJsonSchema: RESPONSE_SCHEMA,
        thinkingConfig: model.startsWith('gemini-2.5-')
          ? { thinkingBudget: 0 }
          : { thinkingLevel: 'minimal' },
      },
    }
  } else {
    const model =
      env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free'
    if (!/^[a-zA-Z0-9._/-]+:free$/.test(model))
      throw new ProviderError('paid_model_not_allowed')
    url = 'https://openrouter.ai/api/v1/chat/completions'
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://kryzect.vercel.app',
      'X-Title': 'Kryzect Assistant',
    }
    body = {
      model,
      messages: [
        { role: 'system', content: SYSTEM_POLICY },
        { role: 'user', content: conversation },
      ],
      temperature: 0.2,
      max_tokens: 768,
      reasoning: { enabled: false },
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'kryzect_answer',
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
      provider: {
        require_parameters: true,
        data_collection:
          env.ASSISTANT_OPENROUTER_DATA_COLLECTION === 'allow'
            ? 'allow'
            : 'deny',
        allow_fallbacks: true,
        max_price: { prompt: 0, completion: 0 },
      },
    }
  }
  let response
  try {
    response = await fetchImpl(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: localSignal,
    })
  } catch {
    throw new ProviderError(
      localSignal.aborted ? 'timeout_or_cancelled' : 'network_error',
    )
  }
  const raw = await readResponse(response)
  let text, tokens
  if (name === 'gemini') {
    const candidate = raw.candidates?.[0]
    if (
      raw.promptFeedback?.blockReason ||
      ['SAFETY', 'PROHIBITED_CONTENT', 'RECITATION'].includes(
        candidate?.finishReason,
      )
    )
      return {
        reply: validateReply({
          disposition: 'unknown',
          answer:
            'I can help with Kryzect’s services and project enquiries. Please describe your business goal without sensitive information.',
          sourceIds: [],
          actionIds: ['contact'],
        }),
        tokens: 0,
      }
    if (candidate?.finishReason !== 'STOP')
      throw new ProviderError('incomplete_output')
    text = candidate.content?.parts
      ?.filter((part) => !part.thought)
      .map((part) => part.text || '')
      .join('')
    tokens = raw.usageMetadata?.totalTokenCount
  } else {
    const choice = raw.choices?.[0]
    if (choice?.finish_reason === 'content_filter')
      return {
        reply: validateReply({
          disposition: 'unknown',
          answer:
            'I can help with Kryzect’s services and project enquiries. Please describe your business goal without sensitive information.',
          sourceIds: [],
          actionIds: ['contact'],
        }),
        tokens: 0,
      }
    if (
      choice?.finish_reason !== 'stop' ||
      typeof choice.message?.content !== 'string'
    )
      throw new ProviderError('incomplete_output')
    text = choice.message.content
    tokens = raw.usage?.total_tokens
  }
  try {
    return {
      reply: validateReply(JSON.parse(text)),
      tokens: Number.isFinite(tokens) ? tokens : 0,
    }
  } catch (error) {
    if (error instanceof ProviderError) throw error
    throw new ProviderError('invalid_output')
  }
}

export async function generateReply(request, options) {
  const { env, limiter, signal, onEvent = () => {} } = options
  for (const name of ['gemini', 'openrouter']) {
    if (!(name === 'gemini' ? env.GEMINI_API_KEY : env.OPENROUTER_API_KEY))
      continue
    if (signal?.aborted) throw new ProviderError('cancelled')
    if (!(await limiter.providerAvailable(name))) continue
    const started = Date.now()
    try {
      const result = await callProvider(name, request, {
        ...options,
        timeoutMs: options.timeoutMs ?? (name === 'gemini' ? 18000 : 10000),
      })
      onEvent({
        event: 'assistant_response',
        provider: name,
        disposition: result.reply.disposition,
        latencyMs: Date.now() - started,
        tokens: result.tokens,
      })
      return result.reply
    } catch (error) {
      if (signal?.aborted) throw new ProviderError('cancelled')
      await limiter.providerFailed(
        name,
        error.status === 401 || error.status === 403 ? 300 : 30,
      )
      onEvent({
        event: 'assistant_provider_error',
        provider: name,
        code: error instanceof ProviderError ? error.code : 'upstream_error',
        status: error.status || 0,
        latencyMs: Date.now() - started,
      })
    }
  }
  throw new ProviderError('unavailable')
}
