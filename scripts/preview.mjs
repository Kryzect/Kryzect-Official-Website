import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { brotliCompressSync } from 'node:zlib'
import { createAssistantHandler } from '../server/assistant/handler.mjs'
import { loadLocalEnvironment } from '../server/local-env.mjs'

// Local production preview: static clean URLs and genuine missing-file 404s.
export async function startPreview(port = 4173, { assistantOptions } = {}) {
  loadLocalEnvironment()
  const assistant = createAssistantHandler(assistantOptions)
  const root = resolve('dist')
  const config = JSON.parse(await readFile('vercel.json', 'utf8'))
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8',
    '.woff2': 'font/woff2',
  }
  const server = createServer(async (request, response) => {
    try {
      if (
        new URL(request.url, 'http://localhost').pathname === '/api/assistant'
      ) {
        await assistant(request, response)
        return
      }
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' })
        response.end()
        return
      }
      let pathname = decodeURIComponent(
        new URL(request.url, 'http://localhost').pathname,
      )
      if (pathname.endsWith('.html')) {
        response.writeHead(308, { Location: pathname.slice(0, -5) || '/' })
        response.end()
        return
      }
      if (pathname !== '/' && pathname.endsWith('/')) {
        response.writeHead(308, { Location: pathname.slice(0, -1) })
        response.end()
        return
      }
      const file = resolve(
        root,
        pathname === '/'
          ? 'index.html'
          : '.' + pathname + (extname(pathname) ? '' : '.html'),
      )
      if (!file.startsWith(root + sep)) {
        response.writeHead(400)
        response.end()
        return
      }
      let status = 200,
        actual = file
      if (
        !(await stat(file)
          .then((s) => s.isFile())
          .catch(() => false))
      ) {
        status = 404
        actual = resolve(root, '404.html')
      }
      const headers = {
        'Content-Type': types[extname(actual)] || 'application/octet-stream',
      }
      for (const entry of config.headers ?? [])
        if (
          entry.source === '/(.*)' ||
          (entry.source === '/assets/(.*)' && pathname.startsWith('/assets/'))
        )
          for (const h of entry.headers) headers[h.key] = h.value
      if (status === 404) headers['X-Robots-Tag'] = 'noindex, follow'
      let body = await readFile(actual)
      if (
        request.headers['accept-encoding']?.includes('br') &&
        /^(text\/|application\/(xml|json))/.test(headers['Content-Type'])
      ) {
        body = brotliCompressSync(body)
        headers['Content-Encoding'] = 'br'
        headers.Vary = 'Accept-Encoding'
      }
      response.writeHead(status, headers)
      response.end(request.method === 'HEAD' ? undefined : body)
    } catch {
      response.writeHead(400)
      response.end('Invalid request')
    }
  })
  await new Promise((done, reject) =>
    server.once('error', reject).listen(port, '127.0.0.1', done),
  )
  return server
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const port = Number(process.env.PORT || 4173)
  await startPreview(port)
  console.log(`Production preview: http://127.0.0.1:${port}`)
}
