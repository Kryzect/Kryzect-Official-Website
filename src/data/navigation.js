// Kryzect — site data: navigation, footer structure, social links.
// Centralized so the visible navigation can change at launch without
// rewriting Header/Footer components (Blueprint V2: "header is for discovery,
// footer is for completeness", final nav decided after all pages built).

// Primary header navigation (discovery).
export const PRIMARY_NAV = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// Header primary CTA.
export const HEADER_CTA = { label: 'Start a Project', to: '/contact' }

// Footer column structure (completeness).
export const FOOTER_NAV = [
  {
    heading: 'Explore',
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Work', to: '/work' },
      { label: 'Products', to: '/products' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Why Kryzect', to: '/why-kryzect' },
      { label: 'Team', to: '/team' },
      { label: 'Process', to: '/process' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Security', to: '/security' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
]

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