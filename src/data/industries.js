// Kryzect — industries overview (Blueprint V2 §47).
//
// IMPORTANT: These are potential categories only. Listing an industry does NOT
// claim specialization in it. Strong industry claims are only made once genuine
// project experience exists. Per the Blueprint: interact with each industry as
// a set of problems solved by the same engineering skills, not as pre-built
// specialisations.
//
// Each entry has only a neutral description of what that type of work CAN
// involve — no fabricated clients, no invented metrics, no unearned expertise.
// The list architecture is here for both this overview and future detail pages.

export const INDUSTRIES = [
  {
    slug: 'startups',
    name: 'Startups',
    description:
      'Early products, MVPs, and fast-moving teams. Work starts from whatever stage you are at.',
  },
  {
    slug: 'small-business',
    name: 'Small Business',
    description:
      'Websites, internal tools, and practical automation for teams with limited resources.',
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    description:
      'Online stores, catalogues, checkout, and the systems that run them.',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    description:
      'Firms that rely on their practice tools, websites, and internal efficiency.',
  },
  {
    slug: 'education',
    name: 'Education',
    description:
      'Learning platforms, course tools, and systems that support learners and educators.',
  },
  {
    slug: 'technology',
    name: 'Technology',
    description:
      'Software businesses and teams building digital products.',
  },
  {
    slug: 'operations',
    name: 'Operations',
    description:
      'Software that removes friction from operational workflows and manual work.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    description:
      'Systems concerned with financial data, calculations, and reporting.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      'Systems that support patient-adjacent or administrative processes.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description:
      'Listings, property management, and the tools real-estate teams use day to day.',
  },
  {
    slug: 'creators',
    name: 'Creators',
    description:
      'Portfolios, membership, and the tools creators use to reach their audience.',
  },
]

export function getIndustry(slug) {
  return INDUSTRIES.find((industry) => industry.slug === slug)
}