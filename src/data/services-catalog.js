// Service scopes and examples. Commercial terms are agreed per engagement.
export const SERVICES = [
  {
    slug: 'web-software',
    title: 'Web & Software',
    category: 'Web & Software',
    hero: 'Websites and applications that support your next step.',
    shortDescription:
      'Business websites, customer portals, and web applications designed around your users and workflows.',
    fullDescription: [
      'A website may need to generate enquiries, explain a service, sell a product, or give customers access to a system. We agree that purpose and the audience before mapping the pages and features.',
      'The scope can cover interface design, frontend and backend development, content structure, integrations, deployment, and handover. Existing brand assets, content responsibilities, and ongoing updates are clarified during discovery.',
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
    cta: {
      label: 'Start a Web Project →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['mobile-apps', 'saas', 'custom-software', 'api-backend'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    category: 'Mobile Apps',
    hero: 'A mobile experience suited to your users.',
    shortDescription:
      'iOS, Android, and cross-platform applications with the backend connections they need.',
    fullDescription: [
      'We plan the core user journeys, device requirements, connectivity, and account experience before choosing the development approach. The right platform depends on your audience, budget, and product requirements.',
      'A mobile engagement can include the application, backend APIs, notifications, payments, testing, and release preparation. Store accounts, review requirements, and maintenance responsibilities are defined in the scope.',
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
    cta: {
      label: 'Discuss a Mobile App →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['web-software', 'api-backend', 'saas'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    category: 'AI Solutions',
    hero: 'Make AI useful in your workflow.',
    shortDescription:
      'AI assistants, document processing, and intelligent workflows with clear review and data boundaries.',
    fullDescription: [
      'We assess the task, available data, accuracy requirements, and cost of an incorrect result. That helps establish whether AI is appropriate and where a person should stay involved.',
      'The scope can include a prototype, evaluation examples, integrations, and a production workflow. Data access, privacy, model-provider costs, latency, and review controls are considered before deployment.',
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
    cta: {
      label: 'Explore an AI Solution →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
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
    hero: 'Connect the steps that slow your team down.',
    shortDescription:
      'Workflow automation that moves information, triggers actions, and reduces repetitive handoffs.',
    fullDescription: [
      'We map the current process, its exceptions, and the systems involved. The first useful automation is often a specific handoff: routing an enquiry, moving approved data, or preparing a recurring report.',
      'The design covers triggers, permissions, failure handling, and the points that still need human judgment. Your team should know what ran, what needs attention, and how to operate the workflow.',
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
    cta: {
      label: 'Automate a Workflow →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['ai-solutions', 'integrations', 'data-analytics'],
    faqs: [
      {
        question: 'Will automation replace our people?',
        answer:
          'Automation changes tasks and responsibilities. We map the workflow with you and agree where automation helps, where review is needed, and how your team will operate the result.',
      },
    ],
  },
  {
    slug: 'saas',
    title: 'SaaS & Digital Products',
    category: 'SaaS & Digital Products',
    hero: 'Give your product idea a workable first scope.',
    shortDescription:
      'SaaS and digital products, from a focused MVP to continued product development.',
    fullDescription: [
      'We help identify the first useful version: who it serves, the problem it addresses, and the core journey it needs to support. Features are prioritized around the product goals and delivery constraints.',
      'A product engagement can include account access, subscriptions, data models, application development, and deployment. Tenant boundaries, billing-provider requirements, and future development are planned for the agreed scope.',
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
    cta: {
      label: 'Build a Product →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['web-software', 'api-backend', 'cloud'],
    faqs: [
      {
        question: 'Do you only build MVPs?',
        answer:
          'No. We start with the MVP to validate the idea, then continue building the product as it grows.',
      },
      {
        question: 'What if we don’t have a technical co-founder?',
        answer:
          'That is exactly what we help with. We translate the idea into a product plan and build it with you.',
      },
    ],
  },
  {
    slug: 'api-backend',
    title: 'API & Backend',
    category: 'API & Backend',
    hero: 'A dependable foundation for your application.',
    shortDescription:
      'APIs, data storage, and business logic that connect the parts of your software.',
    fullDescription: [
      'Backend systems control how data is stored, who can access it, and how business rules are applied. We define these responsibilities alongside the application and the tools it must connect to.',
      'The agreed scope may include API design, authentication, database work, integrations, and deployment. Documentation and handover explain how the system is configured and used.',
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
      kicker: 'Data and access',
      title: 'Agree the boundaries early.',
      body: 'User roles, sensitive data, external dependencies, and expected usage shape the API and storage design. These requirements are clarified before implementation.',
    },
    cta: {
      label: 'Start a Backend Project →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['web-software', 'saas', 'integrations'],
  },
  {
    slug: 'cloud',
    title: 'Cloud Solutions',
    category: 'Cloud Solutions',
    hero: 'Get your application deployed and ready to operate.',
    shortDescription:
      'Hosting, deployment, monitoring, and infrastructure matched to the application and its operating needs.',
    fullDescription: [
      'We review the application, expected usage, budget, and deployment requirements to recommend a suitable hosting setup. Existing environments and account ownership are part of that review.',
      'The scope can include deployment automation, configuration, monitoring, and operational documentation. Ongoing infrastructure management and specialist security requirements are agreed separately.',
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
      kicker: 'Operating requirements',
      title: 'Make ownership and support clear.',
      body: 'The delivery plan identifies account ownership, access, backups where required, monitoring, and who responds when the application needs attention.',
    },
    cta: {
      label: 'Plan a Cloud Project →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['api-backend', 'data-analytics', 'saas'],
  },
  {
    slug: 'data-analytics',
    title: 'Data & Analytics',
    category: 'Data & Analytics',
    hero: 'Make your data useful for the decisions ahead.',
    shortDescription:
      'Data processing, reporting, and analysis built around the questions your business needs answered.',
    fullDescription: [
      'We start with the decision, the available sources, and the quality of the underlying data. That establishes what can be answered reliably and what needs further collection or cleanup.',
      'Work may include data preparation, pipelines, analysis, reports, or business intelligence. Access permissions, refresh frequency, definitions, and handover are agreed so the result remains understandable.',
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
    cta: {
      label: 'Explore a Data Project →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['dashboards', 'cloud', 'ai-solutions'],
  },
  {
    slug: 'dashboards',
    title: 'Custom Dashboards',
    category: 'Custom Dashboards',
    hero: 'Give your team a clear view of the work.',
    shortDescription:
      'Operational, administrative, and reporting dashboards connected to your existing data.',
    fullDescription: [
      'We define who needs the dashboard, which questions it should answer, and what actions follow. The design prioritizes the information each role needs rather than adding charts for their own sake.',
      'The scope can include source connections, access roles, filters, exports, and reporting views. Metric definitions and refresh behavior are documented as part of the delivery.',
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
    cta: {
      label: 'Build a Dashboard →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['data-analytics', 'web-software', 'api-backend'],
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    category: 'E-commerce',
    hero: 'An online store that fits your products and operations.',
    shortDescription:
      'Storefronts, checkout, catalogues, and the connections needed to manage orders.',
    fullDescription: [
      'We review the products, customers, fulfilment process, and existing tools before planning the store. The approach can use an established commerce platform or custom development where the requirements call for it.',
      'The scope may include catalogue structure, storefront development, payments, order management, and integrations. Payment-provider availability, content, tax/shipping configuration, and ongoing store responsibilities need to be agreed.',
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
    cta: {
      label: 'Start an E-commerce Project →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
    related: ['web-software', 'integrations', 'api-backend'],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    category: 'Custom Software',
    hero: 'Software for the workflow your team needs.',
    shortDescription:
      'Internal tools, portals, and business systems designed for your specific operating requirements.',
    fullDescription: [
      'When existing tools cannot support a workflow, we map how the work happens and identify the gaps. Users, exceptions, approvals, and current systems help define a useful scope.',
      'The result may be a focused internal tool or a wider platform. Data migration, access control, integrations, acceptance criteria, and the transition from existing processes are considered in the plan.',
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
    cta: {
      label: 'Discuss Custom Software →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
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
    hero: 'Help your existing systems work together.',
    shortDescription:
      'API and system integrations that reduce manual re-entry and disconnected information.',
    fullDescription: [
      'We review the systems, available APIs, permissions, and the information that needs to move between them. The integration is designed around ownership, timing, and the source of truth for each record.',
      'Work can include API connections, webhooks, synchronization, and automated actions. Rate limits, errors, retries, and monitoring are part of a maintainable integration plan.',
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
      title: 'Connect, don’t replace.',
      body: 'Integration work connects existing systems without replacing them. You keep the tools you rely on; we make them work together.',
    },
    cta: {
      label: 'Plan an Integration →',
      to: '/contact',
    },
    links: [
      {
        label: 'How We Work →',
        to: '/process',
      },
    ],
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
export const getService = (slug) =>
  SERVICES.find((service) => service.slug === slug) ?? null
