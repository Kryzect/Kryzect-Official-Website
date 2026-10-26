import { SERVICES } from '../data/services-catalog.js'
import { TEAM_MEMBERS } from '../data/team.js'

// Public, reviewed site facts only. This is deliberately separate from the
// semantic server policy and never claims that local matching is AI reasoning.
const records = [
  {
    id: 'data-platform',
    terms: ['spark', 'warehouse', 'warehousing', 'etl', 'lakehouse'],
    answer:
      'Kryzect can discuss data-warehouse and Apache Spark projects under its broad technology offering. Data sources, volume, batch versus real-time processing, cloud environment, and reporting needs would guide the design. This is an invitation to scope the work, not a claim of verified past Spark projects.',
    label: 'Data and analytics',
    href: '/services/data-analytics',
  },
  {
    id: 'booking',
    terms: ['book call', 'booking', 'schedule meeting', 'discovery call'],
    answer:
      'Use “Book a free call” to open Kryzect’s booking page, then choose an available time in Google Calendar. The discovery call is free and lasts 30 minutes; no technical brief is required. This assistant cannot reserve a time for you.',
    label: 'Book a free call',
    href: '/book-a-call',
  },
  {
    id: 'qualifications',
    terms: [
      'qualifications',
      'qualification',
      'education',
      'degree',
      'studying',
      'university',
      'certifications',
    ],
    answer:
      'Muhammad Ali Aamir is currently studying BS Data Science at FAST-NUCES Lahore. The approved profile lists Python, C++, JavaScript, SQL, full-stack development, machine learning, generative AI, agentic workflows, and RAG. It does not confirm a completed degree, certifications, or a specific number of years of experience.',
    label: 'Founder profile',
    href: '/team',
  },
  {
    id: 'client-proof',
    terms: [
      'clients',
      'customers',
      'testimonials',
      'portfolio',
      'case studies',
      'client work',
    ],
    answer:
      'I do not have verified client names, client counts, or published client case studies in the approved information. That does not establish whether Kryzect has or has not had clients. Ask the founder for relevant work examples or references before deciding on an engagement.',
    label: 'Contact the founder',
    href: '/contact',
  },
  {
    id: 'verification',
    terms: [
      'real',
      'legitimate',
      'legit',
      'registered',
      'registration',
      'trust',
      'scam',
    ],
    answer:
      'The website identifies Kryzect as a founder-led agency in Lahore, Pakistan, led by Muhammad Ali Aamir. I cannot independently verify company registration, trading history, or trustworthiness from these sources. You can review the founder’s profile, arrange a call, and request relevant evidence and written terms.',
    label: 'About Kryzect',
    href: '/about',
  },
  {
    id: 'deployment',
    terms: ['deployment', 'deploy', 'hosting', 'infrastructure'],
    answer:
      'Deployment and infrastructure setup can be included when agreed in the project scope. Hosting, third-party accounts, ongoing costs, maintenance, and support are clarified during discovery; they are not automatically included in every package.',
    label: 'Cloud and deployment',
    href: '/services/cloud',
  },
  {
    id: 'product-stack',
    terms: ['implementation stack'],
    answer:
      'The approved IncidentIQ information describes an API-first design with AI drafting and mandatory human review, but does not confirm its implementation languages, frameworks, or database. I cannot give a verified stack from the current sources. IncidentIQ is still in development.',
    label: 'IncidentIQ',
    href: '/products/ai-postmortem',
  },
  {
    id: 'founder',
    terms: ['founder', 'ali', 'aamir', 'owner', 'team', 'education', 'github'],
    answer: `${TEAM_MEMBERS[0].name} is Kryzect’s ${TEAM_MEMBERS[0].role}. ${TEAM_MEMBERS[0].bio}`,
    label: 'Founder and team',
    href: '/team',
  },
  {
    id: 'product',
    terms: ['incidentiq', 'product', 'postmortem', 'incident'],
    answer:
      'IncidentIQ is Kryzect’s AI postmortem product in development. Planned capabilities are a roadmap, not a promise of current availability. See the product page for the reviewed description.',
    label: 'IncidentIQ',
    href: '/products/ai-postmortem',
  },
  {
    id: 'technology',
    terms: [
      'stack',
      'technology',
      'technologies',
      'react',
      'python',
      'java',
      'rust',
      'golang',
      'dotnet',
      'azure',
      'framework',
      'language',
      'django',
      'spark',
      'warehouse',
      'warehousing',
    ],
    answer:
      'Kryzect considers projects across all stacks and technologies. The choice depends on your requirements, existing systems, budget, maintainability, and agreed scope. Examples on the website and the founder’s personal skills are not an exclusive technology list. Specific expertise and delivery commitments need discovery.',
    label: 'Services and technology',
    href: '/services',
  },
  {
    id: 'commercial',
    terms: [
      'price',
      'pricing',
      'cost',
      'quote',
      'budget',
      'timeline',
      'deadline',
      'guarantee',
      'refund',
    ],
    answer:
      'Pricing, delivery dates, support, and commercial terms need an agreed project scope. Saved sources cannot provide a binding quote or guarantee. Contact Kryzect with your goals, existing systems, budget, and target date.',
    label: 'Discuss a project',
    href: '/contact',
  },
  {
    id: 'company',
    terms: [
      'kryzect',
      'agency',
      'company',
      'service',
      'business',
      'location',
      'lahore',
      'pakistan',
      'contact',
      'booking',
      'call',
    ],
    answer:
      'Kryzect is a founder-led software engineering, AI, and automation company based in Lahore, Pakistan, working remotely. Services include web and mobile applications, SaaS, backend APIs, cloud, data analytics, dashboards, ecommerce, custom software, automation, and integrations. Work starts with understanding your business and agreeing the scope.',
    label: 'About Kryzect',
    href: '/about',
  },
  ...SERVICES.map((service) => ({
    id: service.slug,
    terms: [service.title, ...service.capabilities, ...service.useCases],
    answer: `${service.title}: ${service.shortDescription} ${service.fullDescription[0]}`,
    label: service.title,
    href: `/services/${service.slug}`,
  })),
]

function words(text) {
  return (
    String(text)
      .toLowerCase()
      .replace(/\.net\b/g, ' dotnet ')
      .match(/[\p{L}\p{N}]+/gu) || []
  )
}

const ignored = new Set(
  'a an the is are can could do does how what which with for to of in on and or my your i we it this that about help please build need want project you our us will would have has any even work works working tell more also include included package there their them'.split(
    ' ',
  ),
)
function tokens(text) {
  return new Set(
    words(text).filter((word) => word.length > 2 && !ignored.has(word)),
  )
}

const recordTokens = records.map((record) => ({
  record,
  terms: tokens(record.terms.join(' ')),
}))
const frequency = new Map()
for (const { terms } of recordTokens)
  for (const word of terms) frequency.set(word, (frequency.get(word) || 0) + 1)

export function sourceAnswer(question, history = []) {
  let query = tokens(question)
  // Only carry context for an explicit short follow-up; never search arbitrary
  // assistant text or treat quoted instructions as executable policy.
  if (
    /^(and |what about |how about |tell me more|more details|explain more)/i.test(
      question.trim(),
    )
  ) {
    const previous = [...history].reverse().find((item) => item.role === 'user')
    query = tokens(`${previous?.content || ''} ${question}`)
  }
  const previous =
    [...history].reverse().find((item) => item.role === 'user')?.content || ''
  const productContext =
    /incidentiq|postmortem/i.test(question) ||
    (/\b(its|it|that|stack|framework|database)\b/i.test(question) &&
      /incidentiq|postmortem/i.test(previous))
  const forced =
    productContext &&
    /\b(stack|framework|language|database|built|technology|technologies)\b/i.test(
      question,
    )
      ? 'product-stack'
      : /\b(book|booking|schedule|arrange)\b.*\b(call|meeting|appointment)\b|\bbooking\b/i.test(
            question,
          )
        ? 'booking'
        : /\b(qualification|qualifications|education|degree|certifications|university)\b/i.test(
              question,
            ) && /founder|ali|aamir|owner/i.test(question + previous)
          ? 'qualifications'
          : /\b(clients|customers|testimonials?|case stud(?:y|ies))\b/i.test(
                question,
              )
            ? 'client-proof'
            : /\b(legit|legitimate|registered|registration|scam|trustworthy)\b/i.test(
                  question,
                ) ||
                (/\breal\b/i.test(question) &&
                  /\b(kryzect|agency|company|you)\b/i.test(question) &&
                  !/\breal[ -]time\b/i.test(question))
              ? 'verification'
              : /\b(deploy|deployment|hosting|infrastructure)\b/i.test(question)
                ? 'deployment'
                : /\b(spark|warehouse|warehousing)\b/i.test(question)
                  ? 'data-platform'
                  : null
  const genericTask =
    /\b(reverse|sort)\b.*\b(array|list|string)\b|\b(write|solve|calculate|translate)\b|\bfavou?rite\b/i.test(
      question,
    ) && !/\b(project|application|kryzect|founder|incidentiq)\b/i.test(question)
  const ranked = recordTokens
    .map(({ record, terms }, order) => ({
      record,
      order,
      score: [...terms].reduce(
        (score, word) =>
          score + (query.has(word) ? 1 / Math.sqrt(frequency.get(word)) : 0),
        0,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
  const selected = genericTask
    ? null
    : forced
      ? records.find((record) => record.id === forced)
      : ranked[0]?.score >= 0.9
        ? ranked[0].record
        : null
  return {
    role: 'assistant',
    mode: 'source',
    matched: Boolean(selected) || genericTask,
    content: genericTask
      ? 'I can help with Kryzect’s services, products, founder, and project enquiries. General coding tasks and unrelated personal questions are outside that scope.'
      : selected
        ? selected.answer
        : 'I could not confidently match that question to saved Kryzect information. I can show verified information about services, IncidentIQ, the founder, or contacting Kryzect. For a specific answer, please contact the team.',
    sources: selected
      ? [{ label: selected.label, href: selected.href }]
      : [{ label: 'Kryzect services', href: '/services' }],
    actions: genericTask
      ? []
      : [
          {
            label:
              selected?.id === 'booking'
                ? 'Book a free call'
                : 'Contact Kryzect',
            href: selected?.id === 'booking' ? '/book-a-call' : '/contact',
          },
        ],
  }
}
