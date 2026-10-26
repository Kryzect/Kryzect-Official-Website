import { SERVICES } from '../../src/data/services-catalog.js'
import { ENGAGEMENTS } from '../../src/data/engagements.js'
import { TEAM_MEMBERS } from '../../src/data/team.js'
import { PRODUCTS } from '../../src/data/products.js'
import { CONTACT_EMAIL, BOOKING_URL } from '../../src/config.js'

const reviewed = '2026-10-26'
const founder = TEAM_MEMBERS[0]
const product = PRODUCTS[0]

// Approved snapshot. Founder sources must never supply company-scope claims.
export const KNOWLEDGE = [
  {
    id: 'company',
    category: 'company',
    label: 'About Kryzect',
    url: '/about',
    reviewed,
    facts: {
      name: 'Kryzect',
      positioning: 'Think First. Build Better. Clarity before code.',
      location: 'Lahore, Pakistan; working remotely.',
      model:
        'Founder-led software engineering, AI, automation, own products, and separately agreed ongoing support.',
      evidenceLimits:
        'No verified client names, counts, client case studies, company registration details, or independent legitimacy assessment are approved in this snapshot. Missing evidence does not prove either the existence or absence of clients. State the information gap directly when asked; do not substitute marketing statements or assert legitimacy.',
      approach:
        'Understand business goals and existing workflows, define scope, design and build, test, deploy, and hand over.',
      technologyPolicy:
        'Owner-approved: Kryzect works across all stacks and technologies. Requirements, existing systems, constraints, maintainability, and delivery scope determine the choice. Examples in the website or founder profile are not an exclusive list. Welcome any relevant technology enquiry. Do not claim proven delivery history, certifications, specialist expertise, or guaranteed availability for every technology.',
    },
  },
  {
    id: 'services-overview',
    category: 'company',
    label: 'Kryzect services',
    url: '/services',
    reviewed,
    facts: {
      services: SERVICES.map((service) => service.title),
      technologyExamples:
        'Frontend frameworks, server-rendered applications, backend languages/frameworks, mobile/native/cross-platform, databases, cloud/serverless/containers, enterprise systems, AI/ML/LLMs/RAG, integrations, low-code tools, and legacy-system modernization. Examples include React/Next.js/Vue/Angular, Python/Django/FastAPI, Node.js, PHP/Laravel, Java/Spring, C#/.NET, Go, Rust, Swift/Kotlin, Flutter/React Native, SQL/NoSQL, AWS/Azure/GCP/Cloudflare. These are illustrative options, not promises of past projects or a restriction on other stacks.',
      scoping:
        'Discuss suitability and high-level trade-offs in a potential Kryzect project. Scope and delivery commitments are confirmed during discovery.',
    },
  },
  ...SERVICES.map((service) => ({
    id: `service-${service.slug}`,
    category: 'company',
    label: service.title,
    url: `/services/${service.slug}`,
    reviewed,
    facts: {
      description: service.shortDescription,
      details: service.fullDescription,
      capabilities: service.capabilities,
      useCases: service.useCases,
    },
  })),
  {
    id: 'engagements',
    category: 'company',
    label: 'Ways to work with Kryzect',
    url: '/process',
    reviewed,
    facts: {
      paths: ENGAGEMENTS,
      investment:
        'Pricing, estimates, timeline, maintenance, hosting, third-party accounts, and ongoing support are agreed for the actual scope. No published fixed price, guaranteed delivery date, response SLA, refund promise, or universal free build.',
      support:
        'Maintenance and continued development can be discussed and agreed separately.',
    },
  },
  {
    id: 'founder',
    category: 'founder-only',
    label: 'Muhammad Ali Aamir',
    url: '/team',
    reviewed,
    facts: {
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      portfolio: founder.links.find((link) => link.icon === 'portfolio')?.href,
      boundary:
        'These are personal professional facts. Do not turn personal experience, projects, or skills into agency client work or limits on Kryzect technology scope.',
    },
  },
  {
    id: 'founder-profile',
    category: 'founder-only',
    label: 'Founder GitHub profile',
    url: 'https://github.com/aliamirchoudhary',
    reviewed,
    facts: {
      name: 'Muhammad Ali Aamir',
      education: 'BS Data Science student at FAST-NUCES Lahore.',
      publicSkills: [
        'Python',
        'C++',
        'JavaScript',
        'SQL',
        'full-stack development',
        'machine learning',
        'generative AI',
        'agentic workflows',
        'RAG',
      ],
      boundary:
        'Approved public professional summary only. The GitHub profile is not a company policy, service catalogue, client-work record, verified proficiency score, or source of pricing/delivery claims. Do not invent years of experience, clients, qualifications, or employment details absent from this snapshot.',
    },
  },
  {
    id: 'incidentiq',
    category: 'product',
    label: 'IncidentIQ',
    url: '/products/ai-postmortem',
    reviewed,
    facts: {
      name: product.name,
      status: product.status,
      purpose: product.description,
      problem: product.problem,
      approach: product.technicalApproach,
      documentedDesign: product.capabilities,
      workflow: product.howItWorks,
      demo: product.liveUrl,
      availability: product.statusNote,
      roadmapNotAvailablePromises: product.roadmap,
      boundary:
        'This is Kryzect’s own in-development product experiment, not a customer testimonial or mature production service. The website documents its intended/design capabilities; do not assert production readiness, completed roadmap integrations, compliance certification, pricing, tenancy guarantees, or independent verification. No product repository README is approved in this snapshot; do not invent a repository or implementation stack.',
    },
  },
  {
    id: 'contact',
    category: 'company',
    label: 'Contact Kryzect',
    url: '/contact',
    reviewed,
    facts: {
      email: CONTACT_EMAIL,
      booking: BOOKING_URL,
      call: 'Free 30-minute discovery conversation. No technical brief required. Booking opens Google Calendar appointment scheduling; no booking is made by this assistant.',
      nextStep:
        'Describe your goal, current workflow, constraints, and any preferred stack. Use the contact form or book a call to discuss actual scope.',
    },
  },
]

export const ACTIONS = Object.freeze({
  contact: { label: 'Start a project', href: '/contact' },
  book: { label: 'Book a free call', href: '/book-a-call' },
  services: { label: 'Explore services', href: '/services' },
  product: { label: 'Explore IncidentIQ', href: '/products/ai-postmortem' },
  founder: { label: 'Meet the founder', href: '/team' },
})

export const KNOWLEDGE_TEXT = JSON.stringify(KNOWLEDGE)

// Keep the full reviewed record for validation/review. The model receives the
// same IDs and a concise service index, without repeated page prose/metadata.
export const MODEL_KNOWLEDGE_TEXT = JSON.stringify(
  KNOWLEDGE.map(({ id, category, facts }) => ({
    id,
    category,
    facts: id.startsWith('service-')
      ? { description: facts.description, capabilities: facts.capabilities }
      : facts,
  })),
)
if (KNOWLEDGE_TEXT.length > 44000)
  throw new Error(
    'Assistant knowledge exceeds the reviewed whole-context budget. Curate or introduce evaluated semantic retrieval before publishing.',
  )
