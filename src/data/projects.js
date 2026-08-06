// Kryzect — projects content model (Blueprint V2 §31–32).
// Home and /work render only projects that genuinely exist here.
// No fabricated projects: PROJECTS stays empty until real work is recorded.

// Project data model:
//   slug, name, type, category (key into PROJECT_CATEGORIES), description,
//   problem, objective, understanding, approach, solution, technicalDetails,
//   challenges, outcome, image?, alt?, role?, liveUrl?, githubUrl?, status
// Buttons (Live Project / GitHub / Product Page) render only when the
// matching URL exists. Never fabricate metrics or outcomes.

// Category model for the Work page. Filters render only when enough
// genuine projects exist (see pages/Work.jsx).
export const PROJECT_CATEGORIES = [
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ai', label: 'AI' },
  { key: 'automation', label: 'Automation' },
  { key: 'saas', label: 'SaaS' },
  { key: 'data', label: 'Data' },
  { key: 'ecommerce', label: 'E-commerce' },
]

export function getProjectCategory(key) {
  return PROJECT_CATEGORIES.find((c) => c.key === key) ?? null
}

// Empty by design — add genuine projects here as real work is completed.
export const PROJECTS = []
