import { SERVICES } from './services-catalog.js'
import { PRODUCTS } from './products.js'
import { PROJECTS } from './projects.js'
import { ARTICLES } from './articles.js'

// Kryzect — central page registry (SINGLE source of truth for visibility).
//
// Every route in the app is listed here exactly once. This file alone controls:
//   - header visibility   (headerVisible)   — discovery nav
//   - footer visibility   (footerVisible)   — completeness nav (column name)
//   - indexability        (indexable)       — whether SEO should index the page
//   - future visibility   (edit these flags)
//
// Launch policy (Blueprint V2): build every page, but only surface pages that
// are complete, useful, credible and content-rich. A page that is empty,
// premature, thin, repetitive, or not yet supported by real experience is kept
// in the codebase + router but HIDDEN from nav and NOINDEXED — never deleted,
// never fabricated. Toggle a flag here to adjust launch visibility.
//
// `childIndexable` (optional) overrides indexability for detail routes under a
// section (e.g. /work/:slug, /blog/:slug, /industries/:slug, /services/:slug).

export const SITE_PAGES = [
  {
    slug: '/',
    label: 'Home',
    kind: 'home',
    headerVisible: false,
    footerVisible: null,
    indexable: true,
  },
  {
    slug: '/services',
    label: 'Services',
    kind: 'section',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
    child: { indexable: true }, // 12 detail pages — complete, credible
  },
  {
    slug: '/products',
    label: 'Products',
    kind: 'section',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
    child: { indexable: true }, // IncidentIQ product page
  },
  {
    slug: '/about',
    label: 'About',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
  },
  {
    slug: '/why-kryzect',
    label: 'Why Kryzect',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
  },
  {
    slug: '/process',
    label: 'Process',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
  },
  {
    slug: '/team',
    label: 'Team',
    kind: 'company',
    headerVisible: false,
    footerVisible: 'Company',
    indexable: true,
  },
  {
    slug: '/contact',
    label: 'Contact',
    kind: 'conversion',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
  },
  {
    slug: '/book-a-call',
    label: 'Book a Call',
    kind: 'conversion',
    headerVisible: false,
    footerVisible: 'Explore',
    indexable: true,
  },
  {
    slug: '/work',
    label: 'Work',
    kind: 'gallery',
    headerVisible: PROJECTS.length > 0,
    footerVisible: PROJECTS.length > 0 ? 'Explore' : null,
    indexable: PROJECTS.length > 0,
    child: { indexable: PROJECTS.length > 0 }, // case studies
  },
  {
    slug: '/blog',
    label: 'Blog',
    kind: 'gallery',
    headerVisible: ARTICLES.length > 0,
    footerVisible: ARTICLES.length > 0 ? 'Explore' : null,
    indexable: ARTICLES.length > 0,
    child: { indexable: ARTICLES.length > 0 }, // article pages
  },
  {
    slug: '/faq',
    label: 'FAQ',
    kind: 'content',
    headerVisible: false,
    footerVisible: 'Explore',
    indexable: true,
  },
  {
    slug: '/industries',
    label: 'Industries',
    kind: 'content',
    headerVisible: false,
    footerVisible: null,
    indexable: true,
    child: { indexable: false }, // Detail pages remain outside search until their content is developed.
  },
  {
    slug: '/careers',
    label: 'Careers',
    kind: 'content',
    headerVisible: false,
    footerVisible: null,
    indexable: false,
  },
  {
    slug: '/privacy',
    label: 'Privacy',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
  },
  {
    slug: '/terms',
    label: 'Terms',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
  },
  {
    slug: '/cookies',
    label: 'Cookies',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
  },
  {
    slug: '/security',
    label: 'Security',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
  },
  {
    slug: '/accessibility',
    label: 'Accessibility',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
  },
]

// Header navigation (discovery) — headerVisible entries in registry order.
export const HEADER_NAV = SITE_PAGES.filter((p) => p.headerVisible).map(
  (p) => ({
    label: p.label,
    to: p.slug,
  }),
)

// Footer columns (completeness) — grouped by footerVisible column, in order.
export const FOOTER_COLUMNS = SITE_PAGES.filter((p) => p.footerVisible).reduce(
  (cols, p) => {
    const existing = cols.find((c) => c.heading === p.footerVisible)
    const item = { label: p.label, to: p.slug }
    if (existing) existing.links.push(item)
    else cols.push({ heading: p.footerVisible, links: [item] })
    return cols
  },
  [],
)

// Exact known paths and content records define indexability; visibility is separate.
export function isIndexable(pathname) {
  const exact = SITE_PAGES.find((page) => page.slug === pathname)
  if (exact) return exact.indexable
  const collections = {
    services: SERVICES,
    products: PRODUCTS,
    work: PROJECTS,
    blog: ARTICLES,
  }
  const match = /^\/(services|products|work|blog)\/([^/]+)$/.exec(pathname)
  if (!match) return false
  const parent = SITE_PAGES.find((page) => page.slug === `/${match[1]}`)
  return Boolean(
    parent?.child?.indexable &&
    collections[match[1]].some((item) => item.slug === match[2]),
  )
}
