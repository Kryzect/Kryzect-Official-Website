// Sitemap generator — imports real data sources so sitemap.xml stays in sync.
// Run: node scripts/generate-sitemap.mjs  (rewrites public/sitemap.xml)
import { writeFileSync } from 'node:fs'

import { SERVICES } from '../src/data/services-catalog.js'
import { PRODUCTS } from '../src/data/products.js'

const BASE = 'https://kryzect.vercel.app'

const STATIC = [
  '',
  '/about',
  '/why-kryzect',
  '/team',
  '/process',
  '/services',
  '/products',
  '/industries',
  '/faq',
  '/contact',
  '/book-a-call',
  '/privacy',
  '/terms',
  '/cookies',
  '/security',
  '/accessibility',
]

const serviceSlugs = SERVICES.map((s) => `/services/${s.slug}`)
const productSlugs = PRODUCTS.map((p) => `/products/${p.slug}`)
// Industries overview is indexable; detail pages are noindexed placeholders.

const all = [...STATIC, ...serviceSlugs, ...productSlugs]

const urls = all
  .map(
    (p) => `  <url>
    <loc>${BASE}${p === '' ? '/' : p}</loc>
    <changefreq>monthly</changefreq>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync('public/sitemap.xml', xml, 'utf8')
console.log(`Wrote public/sitemap.xml with ${all.length} URLs`)