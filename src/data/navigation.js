// Kryzect — site navigation: header, footer, social links.
// This is a THIN derived layer. The single source of truth is
// `data/site-map.js` (the page registry), which controls header visibility,
// footer visibility, indexability, and future page visibility. Change a flag
// in site-map.js and both Header and Footer update automatically — no
// component code changes.

import { HEADER_NAV, FOOTER_COLUMNS } from './site-map.js'

// Primary header navigation (discovery) — from the registry.
export const PRIMARY_NAV = HEADER_NAV

// Header primary CTA.
export const HEADER_CTA = { label: 'Start a Project', to: '/contact' }

// Footer column structure (completeness) — from the registry.
export const FOOTER_NAV = FOOTER_COLUMNS

// Official Kryzect links (exact URLs from Blueprint V2 §14/§38).
export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/kryzect',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Kryzect',
    icon: 'github',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/kryzect',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61592775425002',
    icon: 'facebook',
  },
  {
    label: 'X',
    href: 'https://x.com/kryzect',
    icon: 'x',
  },
  {
    label: 'Mail',
    href: 'mailto:ali.kryzect@gmail.com',
    icon: 'mail',
  },
]