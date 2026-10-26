import { build } from 'vite'
import { rm, realpath } from 'node:fs/promises'
import { resolve } from 'node:path'
import { validateContent } from './validate-content.mjs'

validateContent()
await build()
try {
  await build({
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: '.build/server',
      emptyOutDir: true,
    },
  })
  await import('./prerender.mjs')
} finally {
  // Only this build's known temporary directory is eligible for cleanup.
  const target = resolve('.build')
  const workspace = await realpath('.')
  if (target.startsWith(workspace + '\\') || target.startsWith(workspace + '/'))
    await rm(target, { recursive: true, force: true })
}
