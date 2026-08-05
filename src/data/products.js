// Kryzect — products content model (Blueprint V2 §71).
// Only describe capabilities that actually exist.

export const PRODUCTS = [
  {
    slug: 'ai-postmortem',
    name: 'AI Postmortem',
    tagline: 'Postmortem analysis, made useful.',
    description:
      'AI Postmortem is a Kryzect product being built to explore how AI can make postmortem analysis more useful, structured, and actionable.',
    status: 'In Development',
    capabilities: [],
    screenshots: [],
    roadmap: [],
  },
]

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug) ?? null