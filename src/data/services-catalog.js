// Kryzect — full service catalog (Blueprint V2 §17–29).
// Single source of truth for the Services overview page and every
// service detail page. Copy follows the Blueprint verbatim where provided;
// supporting prose is written in Kryzect's voice without inventing
// technology stacks, client examples, metrics, or outcomes.

// Content model per service:
//   slug, title, category, hero, shortDescription, fullDescription,
//   capabilities[], useCases[], technologies[] (optional), faqs[] (optional),
//   cta { label, to }, links[] (internal), note (optional), related[].

export const SERVICES = [
  {
    slug: 'web-software',
    title: 'Web & Software',
    category: 'Web & Software',
    hero: 'Web experiences and software built around your users and objectives.',
    shortDescription:
      'Websites, web applications, and software built around your users and objectives.',
    fullDescription: [
      'A website or web application should exist for a reason. We start with the objective, the users, and the workflow — then design and build the web experience around them.',
      'From focused business websites to complete web platforms, we build frontend systems, backend systems, portals, admin systems, and custom software that holds up.',
    ],
    capabilities: [
      'business websites',
      'landing pages',
      'web applications',
      'frontend systems',
      'backend systems',
      'portals',
      'admin systems',
      'custom software',
    ],
    useCases: [
      'company website',
      'customer portal',
      'internal tool',
      'operational platform',
      'marketplace',
      'web-based product',
    ],
    cta: { label: 'Start a Web Project →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['mobile-apps', 'saas', 'custom-software', 'api-backend'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    category: 'Mobile Apps',
    hero: 'Mobile products built for real users.',
    shortDescription:
      'iOS, Android, and cross-platform mobile products built around how real users actually work.',
    fullDescription: [
      'A mobile app lives on a person\u2019s phone — it has to earn its place there. We build mobile products around real users, real workflows, and real constraints.',
      'Authentication, APIs, notifications, payments, location, and backend integration are all part of taking an app from concept to something people use every day.',
    ],
    capabilities: [
      'iOS',
      'Android',
      'cross-platform',
      'authentication',
      'APIs',
      'notifications',
      'payments',
      'location',
      'dashboards',
      'backend integration',
    ],
    useCases: [
      'startup apps',
      'business apps',
      'customer apps',
      'internal workforce apps',
      'marketplaces',
    ],
    cta: { label: 'Discuss a Mobile App →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['web-software', 'api-backend', 'saas'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    category: 'AI Solutions',
    hero: 'AI that solves a problem\u2014not AI for the sake of AI.',
    shortDescription:
      'AI applications, assistants, agents, and integrations chosen because they solve a real problem — not because they are fashionable.',
    fullDescription: [
      'The question we ask first is not \u201cwhere can we add AI?\u201d but \u201cwhat problem are we solving?\u201d If AI genuinely serves the objective, we build it in. If it does not, we say so.',
      'AI applications, AI assistants, AI agents, AI integrations, document intelligence, classification, extraction, RAG where appropriate, workflow intelligence, and custom AI systems — each one grounded in real architecture decisions.',
    ],
    capabilities: [
      'AI applications',
      'AI assistants',
      'AI agents',
      'AI integrations',
      'document intelligence',
      'classification',
      'extraction',
      'RAG where appropriate',
      'workflow intelligence',
      'custom AI systems',
    ],
    useCases: [
      'document-heavy workflows',
      'classifying and routing incoming information',
      'extracting structured data from documents',
      'answering questions from your own knowledge',
      'workflow intelligence that surfaces what matters',
    ],
    note: {
      kicker: 'Architecture',
      title: 'Designed around real constraints.',
      body: 'Every AI system is shaped by data, security, cost, accuracy, latency, deployment requirements, and privacy. The architecture follows the objective — not the other way around.',
    },
    cta: { label: 'Explore an AI Solution →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['automation', 'data-analytics', 'api-backend'],
    faqs: [
      {
        question: 'Do we need AI?',
        answer:
          'Not necessarily. If a simple system solves the problem, that is what we recommend. AI is only introduced where it genuinely helps.',
      },
      {
        question: 'Can AI work with our existing systems?',
        answer:
          'Yes. AI integrations are a core part of what we build — adding intelligence to systems that already exist without replacing them.',
      },
    ],
  },
  {
    slug: 'automation',
    title: 'Automation',
    category: 'Automation',
    hero: 'Turn repetitive work into systems that run.',
    shortDescription:
      'Workflow, API, and process automation that turns repetitive work into systems that run on their own.',
    fullDescription: [
      'Most teams lose hours to the same repetitive tasks: moving data, generating reports, chasing approvals, sending notifications. We build systems that do that work automatically.',
      'Workflow automation, API automation, business process automation, AI-powered workflows, notifications, data movement, reporting automation, and integrations — connected to the tools you already use.',
    ],
    capabilities: [
      'workflow automation',
      'API automation',
      'business process automation',
      'AI-powered workflows',
      'notifications',
      'data movement',
      'reporting automation',
      'integrations',
    ],
    useCases: [
      'lead processing',
      'document workflows',
      'reporting',
      'repetitive admin work',
      'customer workflows',
    ],
    cta: { label: 'Automate a Workflow →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['ai-solutions', 'integrations', 'data-analytics'],
    faqs: [
      {
        question: 'Will automation replace our people?',
        answer:
          'No. It removes repetitive, error-prone work so people can focus on work that needs judgment. It is about removing busywork, not people.',
      },
    ],
  },
  {
    slug: 'saas',
    title: 'SaaS & Digital Products',
    category: 'SaaS & Digital Products',
    hero: 'From idea to usable digital product.',
    shortDescription:
      'SaaS products and digital products taken from idea to something people can actually use.',
    fullDescription: [
      'A product idea only becomes useful when it becomes something people can use. We take digital products from concept to usable MVP and beyond.',
      'SaaS MVPs, subscription systems, user management, dashboards, multi-tenant systems, API products, product architecture, and MVP development — built to be simple first, and to grow when the product earns it.',
    ],
    capabilities: [
      'SaaS MVPs',
      'subscription systems',
      'user management',
      'dashboards',
      'multi-tenant systems',
      'API products',
      'product architecture',
      'MVP development',
    ],
    useCases: [
      'a new SaaS MVP',
      'a subscription-based product',
      'an internal platform',
      'an API product',
      'a multi-tenant application',
    ],
    cta: { label: 'Build a Product →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['web-software', 'api-backend', 'cloud'],
    faqs: [
      {
        question: 'Do you only build MVPs?',
        answer:
          'No. We start with the MVP to validate the idea, then continue building the product as it grows.',
      },
      {
        question: 'What if we don\u2019t have a technical co-founder?',
        answer:
          'That is exactly what we help with. We translate the idea into a product plan and build it with you.',
      },
    ],
  },
  {
    slug: 'api-backend',
    title: 'API & Backend',
    category: 'API & Backend',
    hero: 'The systems that power your product.',
    shortDescription:
      'APIs and backend systems built to be reliable, secure, and understandable — explained in plain language.',
    fullDescription: [
      'Behind every useful product is a backend: systems that store data, enforce rules, and let different parts talk to each other. We build those systems to be reliable and secure.',
      'REST APIs, backend systems, authentication, authorization, databases, integrations, business logic, third-party APIs, and service architecture — described in terms of what they do for your business, not just how they are built.',
    ],
    capabilities: [
      'REST APIs',
      'backend systems',
      'authentication',
      'authorization',
      'databases',
      'integrations',
      'business logic',
      'third-party APIs',
      'service architecture',
    ],
    useCases: [
      'secure sign-in and permissions',
      'a reliable store for your data',
      'your product talking to other services',
      'business rules applied consistently',
      'a backend that scales as you grow',
    ],
    note: {
      kicker: 'Plain language',
      title: 'Outcomes, not jargon.',
      body: 'We explain backend work in terms of outcomes: what the system does, what it protects, and how it supports the product — not just the technology inside it.',
    },
    cta: { label: 'Start a Backend Project →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['web-software', 'saas', 'integrations'],
  },
  {
    slug: 'cloud',
    title: 'Cloud Solutions',
    category: 'Cloud Solutions',
    hero: 'Software that runs where it needs to.',
    shortDescription:
      'Deployment, hosting, and cloud infrastructure that keep your software running — without unnecessary complexity.',
    fullDescription: [
      'Software only helps when it is running. We handle deployment, cloud infrastructure, application hosting, serverless systems, backend infrastructure, monitoring, scaling, and integrations.',
      'We build cloud setups that match the project\u2019s real needs. We do not claim enterprise expertise beyond what we actually have — and we will say so honestly.',
    ],
    capabilities: [
      'deployment',
      'cloud infrastructure',
      'application hosting',
      'serverless systems',
      'backend infrastructure',
      'monitoring',
      'scaling',
      'integrations',
    ],
    useCases: [
      'deploying and hosting an application',
      'moving a system to the cloud',
      'running backend infrastructure',
      'monitoring uptime and performance',
      'scaling as usage grows',
    ],
    note: {
      kicker: 'Honest scope',
      title: 'Infrastructure for what you actually need.',
      body: 'We do not claim enterprise cloud expertise we do not have. We build infrastructure that is right for the project — and if something needs a capability beyond our experience, we say so.',
    },
    cta: { label: 'Plan a Cloud Project →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['api-backend', 'data-analytics', 'saas'],
  },
  {
    slug: 'data-analytics',
    title: 'Data & Analytics',
    category: 'Data & Analytics',
    hero: 'Turn raw data into decisions you can act on.',
    shortDescription:
      'Data processing, analytics, reporting, and pipelines that turn raw data into decisions you can act on.',
    fullDescription: [
      'Data only becomes valuable when it becomes decisions. We process, analyze, and report on data so the right people can act on it.',
      'Data processing, analytics, reporting, dashboards, data pipelines, business intelligence, custom analysis, and ML systems where relevant — built around the questions you actually need answered.',
    ],
    capabilities: [
      'data processing',
      'analytics',
      'reporting',
      'dashboards',
      'data pipelines',
      'business intelligence',
      'custom analysis',
      'ML systems where relevant',
    ],
    useCases: [
      'combining data from multiple sources',
      'reports that reach the right people',
      'a dashboard that answers questions at a glance',
      'custom analysis for a specific decision',
      'ML where the data genuinely supports it',
    ],
    cta: { label: 'Explore a Data Project →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['dashboards', 'cloud', 'ai-solutions'],
  },
  {
    slug: 'dashboards',
    title: 'Custom Dashboards',
    category: 'Custom Dashboards',
    hero: 'The right information, where your team needs it.',
    shortDescription:
      'Admin, analytics, and operational dashboards that put the right information where your team needs it.',
    fullDescription: [
      'A dashboard is only useful if the right people see the right information at the right time. We build dashboards around that, not around feature lists.',
      'Admin dashboards, analytics dashboards, operational dashboards, reporting portals, role-based access, charts, filters, exports, and API/database connections — connected to your real systems.',
    ],
    capabilities: [
      'admin dashboards',
      'analytics dashboards',
      'operational dashboards',
      'reporting portals',
      'role-based access',
      'charts',
      'filters',
      'exports',
      'API/database connections',
    ],
    useCases: [
      'an admin panel for your team',
      'an analytics view for leadership',
      'an operational dashboard for daily work',
      'a reporting portal for clients',
      'exports your team can actually use',
    ],
    cta: { label: 'Build a Dashboard →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['data-analytics', 'web-software', 'api-backend'],
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    category: 'E-commerce',
    hero: 'Online stores built to sell and to run smoothly.',
    shortDescription:
      'Online stores, custom storefronts, checkout, payments, orders, and inventory — built to sell and to run smoothly.',
    fullDescription: [
      'An online store has to sell and it has to run. We build e-commerce systems around your products, your customers, and your operations.',
      'Online stores, custom storefronts, product catalogs, checkout, payment integration, order management, inventory, admin dashboards, customer accounts, and integrations.',
    ],
    capabilities: [
      'online stores',
      'custom storefronts',
      'product catalogs',
      'checkout',
      'payment integration',
      'order management',
      'inventory',
      'admin dashboard',
      'customer accounts',
      'integrations',
    ],
    useCases: [
      'an online store for your products',
      'a custom storefront',
      'a checkout that handles payments',
      'an order and inventory system',
      'an admin dashboard to run it all',
    ],
    cta: { label: 'Start an E-commerce Project →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['web-software', 'integrations', 'api-backend'],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    category: 'Custom Software',
    hero: 'Software built around the way your organization actually works.',
    shortDescription:
      'Internal systems, business tools, and custom platforms built around the way your organization actually works.',
    fullDescription: [
      'Off-the-shelf software is built for someone else\u2019s workflow. Custom software is built around yours — which is why we start by understanding how your organization actually works before any development begins.',
      'Internal systems, business tools, portals, workflow systems, management systems, and custom platforms — designed around the people who will use them every day.',
    ],
    capabilities: [
      'internal systems',
      'business tools',
      'portals',
      'workflow systems',
      'management systems',
      'custom platforms',
    ],
    useCases: [
      'an internal system that replaces manual spreadsheets',
      'a tool that matches how your team works',
      'a portal for staff or customers',
      'a management system for a specific process',
      'a platform unique to your organization',
    ],
    note: {
      kicker: 'Workflow first',
      title: 'We understand how you work before we build.',
      body: 'The strongest emphasis in custom software is understanding the existing workflow. We map how work actually happens today, then build software that fits it — instead of forcing the work into a template.',
    },
    cta: { label: 'Discuss Custom Software →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['web-software', 'integrations', 'api-backend'],
    faqs: [
      {
        question: 'Why do you start by understanding our workflow?',
        answer:
          'Because custom software only helps if it fits how work actually happens. Understanding the existing workflow is the difference between software people use and software people work around.',
      },
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    category: 'Integrations',
    hero: 'Make the tools you already use work together.',
    shortDescription:
      'Integrations that connect your existing systems — without replacing the tools you already use.',
    fullDescription: [
      'Most businesses run on a patchwork of tools that do not talk to each other. Integration work connects those systems so data flows and work happens automatically.',
      'Third-party APIs, payment providers, CRM, databases, SaaS integrations, automation tools, internal systems, and webhooks — connecting existing systems without replacing them.',
    ],
    capabilities: [
      'third-party APIs',
      'payment providers',
      'CRM',
      'databases',
      'SaaS integrations',
      'automation tools',
      'internal systems',
      'webhooks',
    ],
    useCases: [
      'connecting your store to a payment provider',
      'syncing data between your CRM and other tools',
      'triggering actions with webhooks',
      'connecting internal systems to SaaS',
      'keeping databases in sync',
    ],
    note: {
      kicker: 'No replacement',
      title: 'Connect, don\u2019t replace.',
      body: 'Integration work connects existing systems without replacing them. You keep the tools you rely on; we make them work together.',
    },
    cta: { label: 'Plan an Integration →', to: '/contact' },
    links: [{ label: 'How We Work →', to: '/process' }],
    related: ['automation', 'api-backend', 'ecommerce'],
    faqs: [
      {
        question: 'Do we need to replace our current tools?',
        answer:
          'No. Integration work connects the systems you already have without replacing them.',
      },
    ],
  },
]

export function getService(slug) {
  return SERVICES.find((service) => service.slug === slug)
}
