// Kryzect — site-level SEO + entity data (single canonical source).
// Blueprint V2 §68 (SEO/Discoverability) + §69 (AI Discoverability).
// SITE_URL is the production domain; used for canonical URLs, Open Graph,
// structured data, robots.txt and sitemap.xml. Deployed on Vercel.
// Indexability is driven by the central page registry in data/site-map.js —
// flip the `indexable` flag there to gate launch-visibility without touching
// components or this file.

import { CONTACT_EMAIL } from '../config.js'
import { SOCIAL_LINKS } from './navigation.js'
import { TEAM_MEMBERS } from './team.js'
import { isIndexable as isRegistryIndexable } from './site-map.js'

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

// Indexability delegates to the central page registry (data/site-map.js).
// Dynamic pages can also force noindex via the Seo `noindex` prop (e.g. a
// "not found" branch of a valid-looking route).
export const isIndexable = isRegistryIndexable
