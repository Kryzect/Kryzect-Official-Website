import { SOURCE_KNOWLEDGE } from '../data/assistant-knowledge.js'
import {
  TECHNOLOGY_GUIDE,
  TECHNOLOGY_NAMES,
} from '../data/assistant-technologies.js'

const stop = new Set(
  'a an the is are was were be been being can could do does did how what which who whom when where why with for to of in on at by and or my your i we it its this that these those about help please need want you our us will would have has had any even work works working tell more also include included package there their them me some something really just get give make like know explain should possible use using from into as than then not yes no'.split(
    ' ',
  ),
)
const groups = [
  ['founder', 'owner', 'founders'],
  [
    'education',
    'qualification',
    'qualifications',
    'degree',
    'study',
    'studying',
    'university',
    'taleem',
  ],
  ['experience', 'experienced', 'background'],
  [
    'price',
    'pricing',
    'cost',
    'costs',
    'quote',
    'estimate',
    'fees',
    'fee',
    'kharcha',
  ],
  ['timeline', 'deadline', 'turnaround', 'fast', 'quickly', 'soon', 'ready'],
  ['booking', 'book', 'schedule', 'arrange', 'appointment', 'consultation'],
  ['contact', 'reach', 'email', 'rabta'],
  ['development', 'develop', 'build', 'create', 'developing'],
  ['automation', 'automate', 'automated', 'repetitive', 'retyping', 'manual'],
  ['integration', 'integrate', 'connect', 'connecting', 'sync', 'synchronize'],
  ['website', 'websites', 'site'],
  ['application', 'applications', 'app', 'apps'],
  ['mobile', 'iphone', 'android', 'ios'],
  ['ecommerce', 'store', 'shop', 'shopping', 'storefront'],
  ['analytics', 'analyse', 'analyze', 'analysis'],
  ['job', 'jobs', 'hiring', 'hire', 'vacancy', 'vacancies', 'employment'],
  ['internship', 'internships', 'intern'],
  ['team', 'staff', 'headcount', 'members'],
  ['maintenance', 'maintain', 'support', 'warranty'],
  ['deployment', 'deploy', 'hosting', 'host', 'server', 'infrastructure'],
  ['technology', 'technologies', 'stack', 'framework', 'frameworks'],
  ['existing', 'legacy', 'old', 'already', 'takeover'],
  ['change', 'changes', 'revision', 'revisions'],
  ['ownership', 'own', 'owns'],
  ['confidential', 'confidentiality', 'nda'],
  ['client', 'clients', 'customer', 'customers'],
  [
    'international',
    'internationally',
    'overseas',
    'abroad',
    'worldwide',
    'remote',
    'remotely',
  ],
  ['product', 'products', 'incidentiq', 'postmortem'],
  ['available', 'availability', 'live', 'released', 'release'],
  ['legitimate', 'legit', 'trust', 'trustworthy', 'scam'],
]
const aliases = new Map(
  groups.flatMap(([canonical, ...variants]) =>
    [canonical, ...variants].map((word) => [word, canonical]),
  ),
)
const romanPhrases = [
  [/\b(?:aap|ap)\b/g, 'you'],
  [/\b(?:kya|kia)\b/g, 'what'],
  [/\b(?:kaun|kon)\b/g, 'who'],
  [/\b(?:kaise|kesay|kese)\b/g, 'how'],
  [/\b(?:kitne|kitna|kitni)\b/g, 'how many'],
  [/\blog\b/g, 'members'],
  [/\bdin\b/g, 'days'],
  [/\bpais[ae]\b/g, 'cost'],
  [/\bkahan\b/g, 'where'],
  [
    /\b(?:hai|hain|ho|se|ki|ka|ke|mein|kar|karte|karun|hoga|lagenge|koi|ya)\b/g,
    ' ',
  ],
]
const urdu = [
  [/بانی|مالک/g, ' founder '],
  [/تعلیم|ڈگری|یونیورسٹی/g, ' education '],
  [/تجربہ/g, ' experience '],
  [/قیمت|فیس|خرچ|کتنے پیسے/g, ' price '],
  [/رابطہ|ای میل/g, ' contact '],
  [/نوکری|ملازمت|بھرتی/g, ' job '],
  [/انٹرن شپ/g, ' internship '],
  [/ٹیم|ارکان/g, ' team '],
  [/کہاں/g, ' location '],
  [/کتنے دن|کتنا وقت/g, ' timeline '],
  [/کال|میٹنگ/g, ' call '],
  [/بک|شیڈول/g, ' booking '],
  [/ویب سائٹ/g, ' website '],
  [/کیا ہے/g, ' what is '],
  [/کریزیکٹ|کرائزیکٹ/g, ' kryzect '],
]

export function normalizeQuestion(value) {
  let text = String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\.net\b/g, ' dotnet ')
    .replace(/c\+\+/g, ' cpp ')
    .replace(/c#/g, ' csharp ')
    .replace(/n8n/g, ' n8n ')
    .replace(/['’]s\b/g, '')
    .replace(/['’]/g, '')
    .replace(
      /\b(?:dont|doesnt|isnt|arent|cant)\b/g,
      (word) => `${word.slice(0, -2)} not`,
    )
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'your')
    .replace(/\br\b/g, 'are')
  for (const [pattern, replacement] of [...urdu, ...romanPhrases])
    text = text.replace(pattern, replacement)
  return text
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

const terms = (text) => [
  ...new Set(
    normalizeQuestion(text)
      .split(' ')
      .filter((word) => word.length > 1 && !stop.has(word))
      .map((word) => aliases.get(word) || word),
  ),
]
const compiled = SOURCE_KNOWLEDGE.map((record) => ({
  record,
  examples: record.examples.map(terms),
  terms: terms(record.terms.join(' ')),
}))
const vocabulary = new Set(
  compiled.flatMap((entry) => [...entry.terms, ...entry.examples.flat()]),
)
const documentFrequency = new Map()
for (const entry of compiled) {
  for (const word of new Set([...entry.terms, ...entry.examples.flat()]))
    documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1)
}
const weight = (word) =>
  1 + Math.log(1 + compiled.length / (1 + (documentFrequency.get(word) || 0)))

// Correct only one unambiguous, close spelling. No substring match and no
// fuzzy matching for short words, names, numbers or arbitrary user input.
function oneEdit(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0,
    j = 0,
    edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++edits > 1) return false
    if (a.length === b.length && a[i] === b[j + 1] && a[i + 1] === b[j]) {
      i += 2
      j += 2
      continue
    }
    if (a.length === b.length) {
      i++
      j++
    } else if (a.length > b.length) i++
    else j++
  }
  return edits + Number(i < a.length || j < b.length) <= 1
}
function corrected(query) {
  return query.map((word) => {
    if (vocabulary.has(word) || word.length < 5 || /\d/.test(word)) return word
    const candidates = [...vocabulary].filter(
      (known) => known[0] === word[0] && oneEdit(word, known),
    )
    return candidates.length === 1 ? candidates[0] : word
  })
}
function similarity(query, example) {
  const overlap = query.filter((word) => example.includes(word))
  if (!overlap.length) return 0
  const intersection = overlap.reduce((sum, word) => sum + weight(word), 0)
  const queryWeight = query.reduce((sum, word) => sum + weight(word), 0)
  const exampleWeight = example.reduce((sum, word) => sum + weight(word), 0)
  return (
    (intersection / queryWeight) * 0.65 + (intersection / exampleWeight) * 0.35
  )
}

function entity(text) {
  if (/\b(founder|founded|owner|ali|aamir|muhammad)\b/.test(text))
    return 'founder'
  if (/\b(incidentiq|postmortem)\b/.test(text)) return 'product'
  if (/\b(call|booking|meeting|consultation)\b/.test(text)) return 'call'
  return null
}

function serviceTopic(text) {
  const query = terms(text)
  if (!query.length) return null
  const matches = compiled
    .filter(({ record }) => record.domain === 'service')
    .map(({ record, examples, terms: keywords }) => ({
      record,
      score: Math.max(
        similarity(query, keywords),
        ...examples.map((example) => similarity(query, example)),
      ),
    }))
    .sort((a, b) => b.score - a.score)
  return matches[0]?.score >= 0.55 &&
    matches[0].score - (matches[1]?.score || 0) > 0.035
    ? matches[0].record.id
    : null
}

const byId = new Map(SOURCE_KNOWLEDGE.map((record) => [record.id, record]))
function response(record, extras = {}) {
  return {
    role: 'assistant',
    mode: 'source',
    matched: true,
    intent: record.id,
    disposition: 'answer',
    content: record.answer,
    sources: [{ label: record.label, href: record.href }],
    actions: [
      {
        label:
          record.href === '/book-a-call'
            ? 'Book a free call'
            : 'Contact Kryzect',
        href: record.href === '/book-a-call' ? '/book-a-call' : '/contact',
      },
    ],
    ...extras,
  }
}
const refusal = () => ({
  role: 'assistant',
  mode: 'source',
  matched: true,
  intent: 'out-of-scope',
  disposition: 'out_of_scope',
  content:
    'I can help with Kryzect’s services, products, founder, and project enquiries. General coding tasks and unrelated personal questions are outside that scope. If you want us to build something, tell me the business goal.',
  sources: [],
  actions: [],
})
const clarify = (candidates = []) => ({
  role: 'assistant',
  mode: 'source',
  matched: false,
  intent: 'clarify',
  disposition: 'clarify',
  content:
    'I could not confidently match that question to saved Kryzect information. Are you asking about a service, the founder, IncidentIQ, or starting a project?',
  sources: [],
  actions: [],
  suggestions: candidates.length
    ? candidates.slice(0, 3).map((record) => record.examples[0])
    : [
        'What services does Kryzect provide?',
        'Who is the founder?',
        'How can I book a call?',
      ],
})

function answerSingle(question, history = []) {
  const text = normalizeQuestion(String(question).slice(0, 1600))
  const recent = history
    .filter((item) => item.role === 'user')
    .slice(-4)
    .map((item) => normalizeQuestion(item.content))
  const directEntity = entity(text)
  const followUp =
    /\b(he|his|him|its|it|that|they|their|them|sign off|human review|approval)\b|^(and |what about |how about |tell me more|more details|explain more|how much|how long|what is included)/.test(
      text,
    )
  const context =
    directEntity ||
    (followUp ? [...recent].reverse().map(entity).find(Boolean) : null)
  const has = (pattern) => pattern.test(text)
  if (/^(who are you|what do you do|what is this|kryzect)$/.test(text))
    return response(byId.get('company'))
  if (
    has(
      /\b(ignore|override|bypass)\b.*\b(instructions|policy|rules|scope)\b|\b(system prompt|api key|secret key|hidden instructions)\b/,
    )
  )
    return refusal()
  if (
    has(
      /\b(reverse|sort)\b.*\b(array|list|string)\b|\b(dynamic programming|ronaldo|capital of|weather|favourite food|favorite food|recipe|horoscope)\b|\b(write|compose|tell)\b.*\b(poem|sonnet|essay|joke)\b/,
    ) ||
    (has(/\b(write|generate|solve|translate|calculate)\b/) &&
      has(/\b(code|function|homework|equation|integral|poem|sentence)\b/) &&
      !has(/\b(business|project|application|system|workflow)\b/))
  )
    return refusal()
  if (
    /^(hi|hello|hey|salam|salaam|assalam o alaikum|thanks|thank you|thankyou)$/.test(
      text,
    )
  )
    return response(
      {
        id: 'greeting',
        answer:
          'Hello! I can help with Kryzect’s services, founder, IncidentIQ, or planning a project. What would you like to know?',
        href: '/services',
        label: 'Kryzect services',
      },
      { disposition: 'greeting' },
    )

  // Entity-specific facets outrank broad service vocabulary. Only explicit
  // follow-ups inherit an entity; an unrelated new question resets scope.
  if (context === 'founder') {
    if (
      has(
        /\b(qualification|qualifications|education|degree|university|studying|study|certification|certifications|taleem)\b/,
      )
    )
      return response(byId.get('qualifications'))
    if (
      has(
        /\b(experience|experienced|background|years|employers|professionally)\b/,
      )
    )
      return response(byId.get('experience'))
    if (has(/\b(skills|languages|good at|specialise|specialize)\b/))
      return response(byId.get('experience'))
    if (
      has(
        /\b(age|how old|birthday|married|family|salary|religion|phone|address)\b/,
      )
    )
      return response(
        {
          id: 'founder-unknown',
          answer:
            'That personal detail is not confirmed in the approved professional information. I can explain the founder’s public role, current study, and listed skills.',
          href: '/team',
          label: 'Founder and team',
        },
        { disposition: 'unknown' },
      )
  }
  if (context === 'product') {
    if (
      has(
        /\b(stack|framework|database|language|built|technology|technologies|implementation)\b/,
      )
    )
      return response(byId.get('product-stack'), { disposition: 'unknown' })
    if (has(/\b(price|pricing|cost|free|subscription|buy)\b/))
      return response(byId.get('product-pricing'), { disposition: 'unknown' })
    if (
      has(
        /\b(available|availability|live|production|released|ready|roadmap|slack|pagerduty|jira|integrations)\b/,
      )
    )
      return response(byId.get('product-status'))
    if (has(/\b(features|capabilities|human approval|human review|sign off)\b/))
      return response(byId.get('product-capabilities'))
    if (
      has(/\b(workflow|steps|pipeline|upload|logs)\b|^how .*\b(work|works)\b/)
    )
      return response(byId.get('product-workflow'))
  }
  if (
    context === 'call' &&
    has(/\b(free|price|cost|fees|charge|long|duration|prepare|bring)\b/)
  )
    return response(byId.get('call-details'))
  if (
    has(
      /\b(hiring|job|jobs|vacancy|vacancies|internship|internships|intern|interns|career|careers|employment)\b|\bjoin your team\b|\blooking for\b.*\bposition\b/,
    )
  )
    return response(byId.get('careers'))
  if (
    has(/\b(how many|how big|team size|headcount|one person|staffing)\b/) &&
    has(/\b(team|member|members|staff|developers|people|person|log)\b/)
  )
    return response(byId.get('team-size'))
  if (
    has(/\b(one|single|larger|big|small)\b.*\b(developer|crew|team)\b/) &&
    !has(/\b(project|application|website)\b/)
  )
    return response(byId.get('team-size'))
  if (
    has(
      /\b(booking|book|schedule|arrange)\b.*\b(call|meeting|appointment|consultation)\b|\b(speak|talk|chat)\b.*\b(someone|person|founder|idea|project)\b/,
    )
  )
    return response(byId.get('booking'))
  if (
    has(/\b(call|meeting|consultation)\b/) &&
    has(/\b(free|cost|price|fees|long|duration|prepare|bring)\b/)
  )
    return response(byId.get('call-details'))
  if (
    has(
      /\b(clients|customers|testimonials|portfolio|references|case studies)\b/,
    ) &&
    has(
      /\b(have|had|any|your|past|previous|many|worked|show|see|names|list|who|examples)\b/,
    )
  )
    return response(byId.get('client-proof'), { disposition: 'unknown' })
  if (
    has(/\b(legit|legitimate|registered|registration|scam|trustworthy)\b/) ||
    (has(/\breal\b/) &&
      has(/\b(kryzect|company|agency|you)\b/) &&
      !has(/\breal time\b/))
  )
    return response(byId.get('verification'), { disposition: 'unknown' })
  if (has(/\b(spark|warehouse|warehousing|etl|lakehouse)\b/))
    return response(byId.get('data-platform'))
  if (
    has(/\b(deploy|deployment|hosting|infrastructure)\b/) &&
    !has(/\b(cloud solutions|explain cloud)\b/)
  )
    return response(byId.get('deployment'))

  const technologyMatches = TECHNOLOGY_GUIDE.filter((item) =>
    item.aliases.some((alias) => new RegExp(`\\b${alias}\\b`).test(text)),
  )
  const asksServiceDetails = has(
    /\b(included|include|scope|capabilities|features|use cases|examples|deliverables|approach)\b/,
  )
  const definitionVocabulary = new Set([
    ...technologyMatches.flatMap((item) => item.aliases.flatMap(terms)),
    'difference',
    'between',
    'compare',
    'versus',
    'vs',
    'tool',
    'platform',
    'technology',
    'language',
    'mean',
    'used',
    'business',
    'project',
  ])
  const isBasicDefinition = terms(text).every((word) =>
    definitionVocabulary.has(word),
  )
  if (
    !context &&
    !asksServiceDetails &&
    technologyMatches.length &&
    isBasicDefinition &&
    has(/^(what is|what are|explain|define)|\b(difference|compare|versus|vs)\b/)
  ) {
    const selected = technologyMatches.slice(0, 2)
    return response({
      id: 'technology-explanation',
      answer: `General technical context: ${selected.map((item) => `${item.name}: ${item.description}`).join(' ')} For a Kryzect project, suitability depends on your goals, existing systems, maintainability, and agreed scope.`,
      href: `/services/${selected[0].service}`,
      label: 'Related Kryzect service',
    })
  }
  if (
    !context &&
    !asksServiceDetails &&
    (technologyMatches.length ||
      TECHNOLOGY_NAMES.some((word) =>
        new RegExp(`\\b${word}\\b`).test(text),
      )) &&
    has(
      /\b(work|support|use|using|build|develop|handle|familiar|choose|stack|technology|technologies|framework)\b/,
    )
  )
    return response(byId.get('technology'))

  // Compositional intent cues describe relationships between concepts, rather
  // than treating any shared technical word as evidence of agency relevance.
  const conceptIntents = [
    [
      'automation',
      /\b(copy|copies|copying|copied|retyping|paste|pasting|repetitive)\b.*\b(data|order|orders|tool|tools|sheet|sheets|spreadsheet|spreadsheets|system|systems)\b/,
    ],
    [
      'ecommerce',
      /\b(website|site|shop|store|customer|customers)\b.*\b(pay|payment|payments|checkout|purchase)\b/,
    ],
    [
      'ai-solutions',
      /\b(chatbot|assistant|bot|ai)\b.*\b(pdf|pdfs|document|documents|knowledge|invoice|invoices)\b/,
    ],
    [
      'integrations',
      /\b(order|orders|data|information)\b.*\b(crm|inventory|accounting)\b.*\b(automatically|appear|sync|move|transfer)\b|\b(order|orders)\b.*\b(appear|sync|move|transfer)\b.*\b(crm|inventory|accounting)\b/,
    ],
    [
      'dashboards',
      /\b(metrics|numbers|kpis|stats|statistics)\b.*\b(screen|place|view|dashboard)\b/,
    ],
    [
      'data-analytics',
      /\b(report|reporting|reports|analytics)\b.*\b(excel|files|scattered|spreadsheet|spreadsheets)\b/,
    ],
    [
      'existing-system',
      /\b(someone else|another developer|previous developer)\b.*\b(built|made|developed)\b.*\b(site|website|app|system)\b/,
    ],
    [
      'maintenance',
      /\b(after|once)\b.*\b(launch|launches|launched|live|handover|delivery)\b.*\b(fix|problems|support|bugs|help|stick around)\b/,
    ],
    [
      'ownership',
      /\b(github|git|repository|repo|source code)\b.*\b(finished|handover|access|receive|own)\b/,
    ],
    [
      'deployment',
      /\b(pay|cost|extra|charge)\b.*\b(server|servers|hosting|infrastructure)\b/,
    ],
    [
      'booking',
      /\b(talk|speak|meet|chat)\b.*\b(face to face|before deciding|discuss my|discuss a|about my)\b/,
    ],
    ['founder', /\bwho\b.*\b(runs|started|founded|leads|behind)\b/],
    ['small-projects', /\bsmall\b.*\b(engagement|business|project|budget)\b/],
    [
      'changes',
      /\b(request|add|change|additional|more)\b.*\b(functionality|features|requirements)\b.*\b(during|halfway|later|midway)\b/,
    ],
  ]
  for (const [id, pattern] of conceptIntents)
    if (has(pattern)) return response(byId.get(id))

  const facet = has(/\b(capabilities|features|functions)\b/)
    ? 'capabilities'
    : has(/\b(use cases|examples)\b/)
      ? 'examples'
      : has(/\b(included|include|scope|approach|deliverables)\b/)
        ? 'scope'
        : null
  const facetOnly = terms(text).every((word) =>
    [
      'capabilities',
      'features',
      'functions',
      'examples',
      'use',
      'cases',
      'case',
      'scope',
      'approach',
      'deliverables',
    ].includes(word),
  )
  const service =
    (!facetOnly && serviceTopic(text)) ||
    (followUp || facetOnly
      ? [...recent].reverse().map(serviceTopic).find(Boolean)
      : null)
  if (service && facet && !context)
    return response(byId.get(`${service}:${facet}`))
  if (service && facet && context !== 'product' && context !== 'founder')
    return response(byId.get(`${service}:${facet}`))

  let query = corrected(terms(text))
  if (has(/^(tell me more|more details|explain more)$/) && recent.length)
    query = corrected(terms(recent.at(-1)))
  if (!query.length) return clarify()
  const ranked = compiled
    .filter(
      ({ record, examples }) =>
        (record.domain !== 'product' ||
          context === 'product' ||
          has(/\b(product|products)\b/)) &&
        (record.domain !== 'service-detail' ||
          facet ||
          examples.some((example) => similarity(query, example) > 0.88)),
    )
    .map(({ record, examples, terms: keywords }) => {
      const exampleScore = Math.max(
        ...examples.map((example) => similarity(query, example)),
      )
      const topicScore = similarity(query, keywords)
      const score =
        Math.max(exampleScore, topicScore * 0.88) +
        (context && record.domain === context ? 0.06 : 0)
      return { record, score }
    })
    .sort((a, b) => b.score - a.score)
  const first = ranked[0],
    second = ranked[1]
  if (
    first.score < 0.49 ||
    (first.score < 0.77 && second?.score > first.score - 0.035)
  )
    return clarify(
      ranked.filter((entry) => entry.score > 0.35).map((entry) => entry.record),
    )
  return response(first.record)
}

export function sourceAnswer(question, history = []) {
  const message = String(question || '').slice(0, 1600)
  const boundedHistory = Array.isArray(history)
    ? history
        .filter(
          (item) =>
            item && item.role === 'user' && typeof item.content === 'string',
        )
        .slice(-4)
    : []
  const parts = message
    .split(/[?;]+|\band also\b/i)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
  if (parts.length < 2) return answerSingle(message, boundedHistory)
  const replies = parts.map((part) => answerSingle(part, boundedHistory))
  const relevant = replies.filter(
    (reply) => reply.matched && reply.disposition !== 'out_of_scope',
  )
  if (!relevant.length)
    return replies.every((reply) => reply.disposition === 'out_of_scope')
      ? refusal()
      : clarify()
  if (relevant.length === 1 || relevant[0].intent === relevant[1].intent)
    return relevant[0]
  return {
    ...relevant[0],
    intent: 'combined',
    content: relevant
      .map((reply) => reply.content)
      .join('\n\n')
      .slice(0, 2200),
    sources: [
      ...new Map(
        relevant
          .flatMap((reply) => reply.sources)
          .map((source) => [source.href, source]),
      ).values(),
    ].slice(0, 2),
    actions: relevant[0].actions.slice(0, 1),
  }
}
