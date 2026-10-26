import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { render } from '../.build/server/entry-server.js'
import {
  PUBLIC_ROUTES,
  INDEXABLE_ROUTES,
} from '../src/data/published-routes.js'
import { SITE_URL } from '../src/config.js'

const template = await readFile('dist/index.html', 'utf8')
for (const route of [...PUBLIC_ROUTES, '/404']) {
  let markup = await render(route)
  if (markup.includes('<template id="B:') || markup.includes('<div hidden'))
    throw new Error(
      `Static output contains an unresolved suspense boundary: ${route}`,
    )
  let metadata = ''
  markup = markup.replace(
    /<title>[\s\S]*?<\/title>|<meta\s[^>]*\/>|<link\s[^>]*rel="canonical"[^>]*\/>/g,
    (tag) => {
      metadata += tag
      return ''
    },
  )
  if (!metadata.includes('<title>') || !markup.includes('<h1'))
    throw new Error(`Incomplete static page: ${route}`)
  const html = template
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  const filename = route === '/' ? 'dist/index.html' : `dist${route}.html`
  await mkdir(dirname(filename), { recursive: true })
  await writeFile(filename, html)
}
const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${INDEXABLE_ROUTES.map((route) => `  <url><loc>${escapeXml(new URL(route, SITE_URL).href)}</loc></url>`).join('\n')}\n</urlset>\n`,
)
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)
console.log(
  `Generated ${PUBLIC_ROUTES.length} pages, a 404, and ${INDEXABLE_ROUTES.length} sitemap URLs.`,
)
