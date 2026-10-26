import { execFileSync } from 'node:child_process'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

// Signature scan, not an assurance that all possible credentials are detected.
// Never print matched material or write a raw history patch to disk.
const signatures = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['aws-access', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  [
    'github-token',
    /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
  ],
  ['npm-token', /\bnpm_[A-Za-z0-9]{30,}\b/],
  ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ['stripe-secret', /\bsk_live_[A-Za-z0-9]{20,}\b/],
]
const findings = []
function scan(text, location) {
  for (const [type, pattern] of signatures)
    if (pattern.test(text)) findings.push({ type, location })
}
const ignored = new Set([
  '.git',
  'node_modules',
  'dist',
  '.audit',
  '.qa',
  '.build',
])
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue
    const file = join(dir, entry.name)
    if (entry.isDirectory()) await walk(file)
    else if (!/\.(png|woff2?|jpg|jpeg|ico)$/i.test(file))
      scan(await readFile(file, 'utf8'), file)
  }
}
await walk('.')
const history = execFileSync(
  'git',
  ['log', '--all', '--format=', '--no-ext-diff', '--patch'],
  { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 },
)
scan(history, 'reachable Git history')
console.log(
  JSON.stringify(
    { scope: 'working tree plus all locally reachable Git history', findings },
    null,
    2,
  ),
)
if (findings.length) process.exitCode = 1
