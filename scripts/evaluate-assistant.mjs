import { mkdir, writeFile } from 'node:fs/promises'
import { setTimeout as pause } from 'node:timers/promises'
import { randomUUID } from 'node:crypto'
import { loadLocalEnvironment } from '../server/local-env.mjs'
import { generateReply } from '../server/assistant/providers.mjs'
import { EVALUATIONS } from '../tests/fixtures/assistant-evaluations.mjs'

loadLocalEnvironment()
const env = { ...process.env }
const provider = process.argv
  .find((argument) => argument.startsWith('--provider='))
  ?.split('=')[1]
if (provider && !['gemini', 'openrouter'].includes(provider))
  throw new Error('Provider must be gemini or openrouter.')
if (provider === 'gemini') env.OPENROUTER_API_KEY = ''
if (provider === 'openrouter') env.GEMINI_API_KEY = ''
if (!env.GEMINI_API_KEY && !env.OPENROUTER_API_KEY) {
  console.error(
    'No configured provider key. Add keys to ignored .env; no live evaluation was run.',
  )
  process.exitCode = 1
} else {
  let cases = process.argv.includes('--full')
    ? EVALUATIONS
    : EVALUATIONS.slice(0, 8)
  const selected = process.argv
    .find((argument) => argument.startsWith('--ids='))
    ?.slice(6)
    .split(',')
  if (selected) {
    cases = EVALUATIONS.filter((item) => selected.includes(item.id))
    if (cases.length !== new Set(selected).size)
      throw new Error('Unknown evaluation ID.')
  }
  const results = []
  console.log(
    `Live evaluation: ${cases.length} synthetic prompts. Free-tier routes only; this consumes quota. Ordinary CI never runs it.`,
  )
  for (const item of cases) {
    let usedProvider = null
    const events = []
    try {
      const reply = await generateReply(
        {
          message: item.message,
          history: item.history,
          sessionId: randomUUID(),
        },
        {
          env,
          limiter: {
            providerAvailable: async () => true,
            providerFailed: async () => {},
          },
          onEvent: (event) => {
            events.push(event)
            if (event.event === 'assistant_response')
              usedProvider = event.provider
          },
        },
      )
      const dispositionPass = item.dispositions.includes(reply.disposition)
      const citationPass =
        !item.sources.length ||
        reply.disposition !== 'answer' ||
        reply.sources.some((source) => item.sources.includes(source.id))
      const passed = dispositionPass && citationPass
      results.push({
        id: item.id,
        passed,
        provider: usedProvider,
        dispositionPass,
        citationPass,
        reply,
        manualFactualReviewRequired: true,
        events,
      })
      console.log(
        `${item.id}: ${passed ? 'PASS' : 'FAIL'} (${usedProvider}; ${reply.disposition})`,
      )
    } catch {
      results.push({
        id: item.id,
        passed: false,
        error: 'provider_unavailable_or_invalid_output',
        events,
      })
      console.log(`${item.id}: FAIL (unavailable or invalid output)`)
    }
    await pause(1000)
  }
  await mkdir('.qa', { recursive: true })
  await writeFile(
    '.qa/assistant-live-evaluation.json',
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        primaryModel: env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
        fallbackModel:
          env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free',
        kind: 'live synthetic evaluation; disposition/citations checked automatically, factual meaning requires review',
        results,
      },
      null,
      2,
    ),
  )
  const passed = results.filter((result) => result.passed).length
  console.log(
    `${passed}/${results.length} passed automatic disposition/reference checks. Review the saved replies for factual accuracy.`,
  )
  if (passed !== results.length) process.exitCode = 1
}
