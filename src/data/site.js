// Kryzect — site-level SEO + entity data (single canonical source).
// Blueprint V2 §68 (SEO/Discoverability) + §69 (AI Discoverability).
// SITE_URL is the production domain; used for canonical URLs, Open Graph,
// structured data, robots.txt and sitemap.xml. Deployed on Vercel.
// Flip routes in NOINDEX_PATTERNS when real data ships (launch-hiding).

import { CONTACT_EMAIL } from '../config.js'
import { SOCIAL_LINKS } from './navigation.js'
import { TEAM_MEMBERS } from './team.js'

export const SITE_NAME = 'Kryzect'
export const SITE_URL = 'https://kryzect.vercel.app'
export const SITE_DESCRIPTION =
  'Kryzect — Think First. Build Better. Software engineering, AI, and automation built around what your business actually needs.'
export const SITE_TAGLINE = 'Think First. Build Better.'

// Static brand mark used for favicon, default Open Graph image, and schema.
export const LOGO_URL = `${SITE_URL}/logo.png`

// Entity fields kept consistent across Website/LinkedIn/GitHub/Instagram/
// Facebook/X/Mail (Blueprint §69). The website is the canonical source.
export const ENTITY = {
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  founderName: TEAM_MEMBERS[0]?.name ?? '',
  founderUrl: TEAM_MEMBERS[0]?.links?.find((l) => l.icon === 'portfolio')?.href ?? '',
  sameAs: SOCIAL_LINKS.map((l) => l.href),
}

// Routes that exist in the codebase but must NOT be indexed until they hold
// real data (launch-hiding principle). /work and /blog are intentionally empty
// for now; /careers lists no open roles; industry detail pages are placeholders.
// Remove a pattern here when real content ships so it becomes indexable again.
const NOINDEX_PATTERNS = [
  /^\/work(?:\/|$)/, // empty work gallery (PROJECTS = [])
  /^\/blog(?:\/|$)/, // empty blog (ARTICLES = [])
  /^\/careers(?:\/|$)/, // no open roles yet
  /^\/industries\/[\w-]+$/i, // industry detail placeholders
]

// True when the given route should be indexable by search engines.
// Dynamic pages can also force this with the Seo `noindex` prop (e.g. a
// "not found" branch of a valid-looking route).
export function isIndexable(pathname) {
  return !NOINDEX_PATTERNS.some((re) => re.test(pathname))
}
