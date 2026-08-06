// Kryzect — products content model (Blueprint V2 §33–34).
// Only describe capabilities that actually exist.
// /products/ai-postmortem keeps its URL for stability; the product display
// name is IncidentIQ (project name per owner). No fabricated capabilities.

export const PRODUCTS = [
  {
    slug: 'ai-postmortem',
    name: 'IncidentIQ',
    tagline: 'AI-powered incident postmortem automation.',
    description:
      'Submit raw incident data once — alerts, log snippets, engineer notes — and receive a structured, human-reviewed postmortem report.',
    problem:
      'Postmortems are the single most effective tool for turning production outages into lasting reliability improvements, yet most teams struggle to write them consistently. They are written too late, too inconsistently, and too shallowly — buried in chat instead of turned into action.',
    painPoints: [
      'Postmortems are slow — a thorough write-up takes 4–8 hours of an engineer’s time, often days after the incident, when the details are already fuzzy.',
      'Postmortems are inconsistent — every team has its own template, its own depth of analysis, its own idea of what is acceptable.',
      'Postmortems do not teach — findings sit in isolated documents that are never cross-referenced against past incidents or runbook knowledge.',
      'Teams fix the same bug twice — without a knowledge base connecting new incidents to old ones, the same root cause comes back months later.',
    ],
    postmortemAnswers: [
      'What happened? — a chronological timeline of events, from first alert to service restoration.',
      'Why did it happen? — the root cause: the underlying technical failure that triggered the incident.',
      'What factors contributed? — the secondary issues that made it worse or delayed recovery.',
      'How do we prevent it? — concrete, actionable steps to avoid recurrence.',
    ],
    audience:
      'Engineering and reliability teams running production systems who want consistent, blameless, actionable postmortems without the manual grind of writing them from scratch.',
    audiences: [
      {
        who: 'SREs and backend engineers on call',
        why: 'They live through the incident. After the fire is out, they upload the timeline and review a draft report in minutes instead of writing one from scratch.',
      },
      {
        who: 'Engineering managers',
        why: 'They need consistent, auditable postmortems to track reliability trends across teams.',
      },
      {
        who: 'CTOs and compliance officers',
        why: 'In regulated industries, documented incident response is a requirement. IncidentIQ keeps a durable record of every incident and every review decision.',
      },
    ],
    capabilities: [
      'structured postmortem drafting from raw incident data',
      'an ordered timeline with per-event confidence',
      'root-cause analysis grounded in a shared knowledge base',
      'preventive recommendations cited to known procedures',
      'mandatory human review before anything is finalized',
      'API-first design, usable from existing tooling',
    ],
    howItWorks: [
      'Submit raw incident data once: alerts, log snippets, engineer notes.',
      'A pipeline of specialized AI agents drafts the postmortem step by step.',
      'Each finding is held for human review — engineers can approve, correct, or loop a stage back for re-analysis.',
      'Only a recorded human approval finalizes the report.',
    ],
    technicalApproach: {
      text: 'IncidentIQ is an API-first system in which orchestration and persistence stay separated from the AI work. Each AI finding is produced as a draft and held for mandatory human review — no report path is finalized without recorded approval.',
      note: 'Detailed implementation and configuration are documented in the public repository and deployment notes. This page describes the product, not confidential architecture.',
    },
    status: 'In Development',
    statusNote:
      'An experimental frontend is publicly available at incidentiq.pages.dev while the product is refined. Only known, real information is shown here.',
    screenshots: [],
    liveUrl: 'https://incidentiq.pages.dev/',
    roadmap: [
      'API monetization: per-account keys and usage-based pricing',
      'SaaS multi-tenancy: organization isolation and authorization',
      'Enterprise features: role-based access, audit export',
      'Integrations: Slack, PagerDuty, GitHub/Jira issue linking, webhooks',
    ],
    futureDirection:
      'As the product matures, the roadmap focuses on making incident postmortems part of normal engineering workflow: surfacing them where teams already work, and making them reusable across incidents and organizations.',
  },
]

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug) ?? null