// Sitemap generator — imports real data sources + the central page registry so
// sitemap.xml stays in sync with launch-visibility.
// Run: node scripts/generate-sitemap.mjs  (rewrites public/sitemap.xml)
// The registry (data/site-map.js) controls indexability: only indexable pages
// are included. Crafted service/products/industries detail routes are added
// from their data sources. Detail routes that are noindexed (work/blog/case
// studies/industry placeholders) are intentionally excluded.
import { writeFileSync } from 'node:fs'

import { SITE_PAGES, isIndexable } from '../src/data/site-map.js'
import { SERVICES } from '../src/data/services-catalog.js'
import { PRODUCTS } from '../src/data/products.js'

const BASE = 'https://kryzect.vercel.app'

// Static pages: every registry entry that is indexable.
const STATIC = SITE_PAGES.filter((p) => p.indexable).map((p) => p.slug)

// Indexable detail routes (registry says /services & /products children are
// indexable; /work, /blog, /industries children are not).
const serviceSlugs = SERVICES.map((s) => `/services/${s.slug}`)
const productSlugs = PRODUCTS.map((p) => `/products/${p.slug}`)

const all = [...STATIC, ...serviceSlugs, ...productSlugs].filter((p) => isIndexable(p))

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