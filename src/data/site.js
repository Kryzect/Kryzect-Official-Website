import { SITE_NAME, SITE_URL, CONTACT_EMAIL, SOCIAL_LINKS } from '../config.js'
import { TEAM_MEMBERS } from './team.js'
export { SITE_NAME, SITE_URL } from '../config.js'
export { isIndexable } from './site-map.js'
export const SITE_TAGLINE = 'Think First. Build Better.'
export const SITE_DESCRIPTION =
  'Software engineering, AI, and automation for businesses and founders. Kryzect helps define the scope, build the system, and plan the handover.'
export const LOGO_URL = `${SITE_URL}/logo.png`
export const SHARE_IMAGE_URL = `${SITE_URL}/share-card.png`
export const ENTITY = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  logo: LOGO_URL,
  founder: {
    '@type': 'Person',
    name: TEAM_MEMBERS[0].name,
    url: TEAM_MEMBERS[0].links[0].href,
  },
  sameAs: SOCIAL_LINKS.filter((link) => link.icon !== 'mail').map(
    (link) => link.href,
  ),
}
