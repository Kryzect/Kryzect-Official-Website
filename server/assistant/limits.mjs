import { createHmac } from 'node:crypto'
import { isIP } from 'node:net'

export class LimitError extends Error {
  constructor(code, retryAfter = 60) {
    super(code)
    this.name = 'LimitError'
    this.code = code
    this.retryAfter = retryAfter
  }
}

export function boundedInteger(value, fallback, maximum) {
  const number = Number(value)
  return Number.isInteger(number) && number > 0 && number <= maximum
    ? number
    : fallback
}

export function limiterKeys(request, sessionId, env, now = Date.now()) {
  const trusted =
    env.VERCEL === '1'
      ? String(
          request.headers['x-vercel-forwarded-for'] ||
            request.headers['x-forwarded-for'] ||
            '',
        )
          .split(',')[0]
          .trim()
      : request.socket?.remoteAddress || 'local'
  const ip = isIP(trusted) ? trusted : 'unknown'
  const day = new Date(now).toISOString().slice(0, 10)
  const secret =
    env.UPSTASH_REDIS_REST_TOKEN ||
    env.GEMINI_API_KEY ||
    env.OPENROUTER_API_KEY ||
    'local-development-only'
  const hash = (value) =>
    createHmac('sha256', secret)
      .update(`${day}:${value}`)
      .digest('hex')
      .slice(0, 40)
  return [
    `kryzect:assistant:ip:${hash(ip)}`,
    `kryzect:assistant:session:${hash(sessionId)}`,
    `kryzect:assistant:day:${day}`,
  ]
}

// Check all counters before incrementing any: blocked traffic does not spend the daily budget.
export const RESERVE_SCRIPT = `
for i=1,3 do
  local count=tonumber(redis.call('GET',KEYS[i]) or '0')
  if count>=tonumber(ARGV[(i-1)*2+1]) then
    return {0,math.max(1,redis.call('TTL',KEYS[i]))}
  end
end
for i=1,3 do
  local count=redis.call('INCR',KEYS[i])
  if count==1 then redis.call('EXPIRE',KEYS[i],tonumber(ARGV[(i-1)*2+2])) end
end
return {1,0}`

export function createLimiter({
  env = process.env,
  fetchImpl = fetch,
  now = Date.now,
} = {}) {
  const memory = new Map()
  const shared = Boolean(
    env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN,
  )
  const production = env.VERCEL === '1' || env.NODE_ENV === 'production'
  const ready = shared || !production
  const settings = [
    boundedInteger(env.ASSISTANT_IP_MINUTE_LIMIT, 10, 60),
    60,
    boundedInteger(env.ASSISTANT_SESSION_LIMIT, 30, 200),
    1800,
    boundedInteger(env.ASSISTANT_DAILY_LIMIT, 300, 10000),
    86400,
  ]
  async function command(args) {
    const url = env.UPSTASH_REDIS_REST_URL
    if (!url?.startsWith('https://'))
      throw new LimitError('limiter_unavailable')
    try {
      const response = await fetchImpl(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
        signal: AbortSignal.timeout(2000),
      })
      if (!response.ok) throw new Error('Redis unavailable')
      const data = await response.json()
      if (data.error || !Object.hasOwn(data, 'result'))
        throw new Error('Invalid Redis response')
      return data.result
    } catch {
      throw new LimitError('limiter_unavailable')
    }
  }
  function entry(key) {
    const item = memory.get(key)
    if (item && item.expires > now()) return item
    memory.delete(key)
    return null
  }
  return {
    ready,
    async reserve(keys) {
      if (!ready) throw new LimitError('limiter_unconfigured')
      if (shared) {
        const result = await command([
          'EVAL',
          RESERVE_SCRIPT,
          '3',
          ...keys,
          ...settings.map(String),
        ])
        if (
          !Array.isArray(result) ||
          result.length !== 2 ||
          ![0, 1].includes(Number(result[0])) ||
          !Number.isFinite(Number(result[1]))
        )
          throw new LimitError('limiter_unavailable')
        if (!Number(result[0]))
          throw new LimitError(
            'rate_limited',
            Math.min(86400, Math.max(1, Number(result[1]))),
          )
        return
      }
      for (const key of memory.keys()) entry(key)
      for (let i = 0; i < keys.length; i++) {
        const item = entry(keys[i])
        if (item && item.count >= settings[i * 2])
          throw new LimitError(
            'rate_limited',
            Math.ceil((item.expires - now()) / 1000),
          )
      }
      if (memory.size > 2000) throw new LimitError('rate_limited')
      for (let i = 0; i < keys.length; i++) {
        const item = entry(keys[i]) || {
          count: 0,
          expires: now() + settings[i * 2 + 1] * 1000,
        }
        item.count++
        memory.set(keys[i], item)
      }
    },
    async providerAvailable(name) {
      const key = `kryzect:assistant:circuit:${name}`
      return shared ? !(await command(['GET', key])) : !entry(key)
    },
    async providerFailed(name, seconds) {
      const key = `kryzect:assistant:circuit:${name}`
      if (shared) await command(['SET', key, '1', 'EX', String(seconds)])
      else memory.set(key, { count: 1, expires: now() + seconds * 1000 })
    },
  }
}
