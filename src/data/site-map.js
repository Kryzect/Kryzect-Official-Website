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
    note: 'Landing page. Always indexable.',
  },
  {
    slug: '/services',
    label: 'Services',
    kind: 'section',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
    child: { indexable: true }, // 12 detail pages — complete, credible
    note: 'Complete catalogue: 12 services, rich uses. Launch-ready.',
  },
  {
    slug: '/products',
    label: 'Products',
    kind: 'section',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
    child: { indexable: true }, // IncidentIQ product page
    note: 'IncidentIQ is real (in development) + honest future-products block.',
  },
  {
    slug: '/about',
    label: 'About',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
    note: 'Foundation story + values — complete.',
  },
  {
    slug: '/why-kryzect',
    label: 'Why Kryzect',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
    note: 'Positioning/philosophy — complete, distinct from About.',
  },
  {
    slug: '/process',
    label: 'Process',
    kind: 'company',
    headerVisible: true,
    footerVisible: 'Company',
    indexable: true,
    note: '8-stage workflow — complete.',
  },
  {
    slug: '/team',
    label: 'Team',
    kind: 'company',
    headerVisible: false,
    footerVisible: 'Company',
    indexable: true,
    note: 'Single real founder (honest). Footer only; hidden from header.',
  },
  {
    slug: '/contact',
    label: 'Contact',
    kind: 'conversion',
    headerVisible: true,
    footerVisible: 'Explore',
    indexable: true,
    note: 'Form (Web3Forms) + booking — live.',
  },
  {
    slug: '/book-a-call',
    label: 'Book a Call',
    kind: 'conversion',
    headerVisible: false,
    footerVisible: 'Explore',
    indexable: true,
    note: 'Google Calendar scheduler — live. Reached via CTAs.',
  },
  {
    slug: '/work',
    label: 'Work',
    kind: 'gallery',
    headerVisible: false,
    footerVisible: null,
    indexable: false,
    child: { indexable: false }, // case studies
    note: 'EMPTY (PROJECTS = []). Hidden + noindex until genuine projects ship.',
  },
  {
    slug: '/blog',
    label: 'Blog',
    kind: 'gallery',
    headerVisible: false,
    footerVisible: null,
    indexable: false,
    child: { indexable: false }, // article pages
    note: 'EMPTY (ARTICLES = []). Hidden + noindex until real articles ship.',
  },
  {
    slug: '/faq',
    label: 'FAQ',
    kind: 'content',
    headerVisible: false,
    footerVisible: null,
    indexable: true,
    note: 'Verbatim blueprint Q&A — complete. Reachable via links.',
  },
  {
    slug: '/industries',
    label: 'Industries',
    kind: 'content',
    headerVisible: false,
    footerVisible: null,
    indexable: true,
    child: { indexable: false }, // detail pages are honest placeholders
    note: 'Overview indexable; detail pages hidden/noindex until real experience.',
  },
  {
    slug: '/careers',
    label: 'Careers',
    kind: 'content',
    headerVisible: false,
    footerVisible: null,
    indexable: false,
    note: 'Premature/thin (no real open roles). Hidden + noindex until hiring.',
  },
  {
    slug: '/privacy',
    label: 'Privacy',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
    note: 'Legal — footer, indexable.',
  },
  {
    slug: '/terms',
    label: 'Terms',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
    note: 'Legal — footer, indexable.',
  },
  {
    slug: '/cookies',
    label: 'Cookies',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
    note: 'Legal — footer, indexable.',
  },
  {
    slug: '/security',
    label: 'Security',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
    note: 'Legal — footer, indexable.',
  },
  {
    slug: '/accessibility',
    label: 'Accessibility',
    kind: 'legal',
    headerVisible: false,
    footerVisible: 'Legal',
    indexable: true,
    note: 'Legal — footer, indexable.',
  },
]

// Header navigation (discovery) — headerVisible entries in registry order.
export const HEADER_NAV = SITE_PAGES.filter((p) => p.headerVisible).map((p) => ({
  label: p.label,
  to: p.slug,
}))

// Footer columns (completeness) — grouped by footerVisible column, in order.
export const FOOTER_COLUMNS = SITE_PAGES.filter((p) => p.footerVisible).reduce((cols, p) => {
  const existing = cols.find((c) => c.heading === p.footerVisible)
  const item = { label: p.label, to: p.slug }
  if (existing) existing.links.push(item)
  else cols.push({ heading: p.footerVisible, links: [item] })
  return cols
}, [])

// Indexability lookups.
function findBySlug(slug) {
  return SITE_PAGES.find((p) => p.slug === slug)
}

// True when the given route should be indexable.
export function isIndexable(pathname) {
  // Match an exact section (e.g. "/work").
  const exact = findBySlug(pathname)
  if (exact) return exact.indexable

  // Match a detail page under a section (e.g. "/work/xyz").
  for (const p of SITE_PAGES) {
    if (p.slug !== '/' && pathname.startsWith(`${p.slug}/`)) {
      return p.child ? p.child.indexable : p.indexable
    }
  }

  // Unknown/other routes default to indexable (caught by NotFound manually).
  return true
}