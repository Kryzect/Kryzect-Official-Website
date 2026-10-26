import { readFile, readdir } from 'node:fs/promises'
import { loadEnv } from 'vite'

export async function checkAssistantBuild() {
  const env = loadEnv('production', process.cwd(), '')
  const secrets = [
    'GEMINI_API_KEY',
    'OPENROUTER_API_KEY',
    'UPSTASH_REDIS_REST_TOKEN',
  ]
    .map((key) => env[key])
    .filter(Boolean)
  for (const file of await readdir('dist/assets')) {
    if (!file.endsWith('.js')) continue
    const text = await readFile(`dist/assets/${file}`, 'utf8')
    if (
      /GEMINI_API_KEY|OPENROUTER_API_KEY|UPSTASH_REDIS_REST_TOKEN|APPROVED KNOWLEDGE \(data|generativelanguage\.googleapis\.com/.test(
        text,
      ) ||
      secrets.some((value) => text.includes(value))
    )
      throw new Error(
        'Assistant server code or private configuration reached a browser asset. Build refused.',
      )
  }
}
