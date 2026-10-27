// General technical context, not proof of Kryzect project history. No version,
// price, certification, availability or universal-expertise promises.
export const TECHNOLOGY_GUIDE = [
  [
    'Django',
    ['django'],
    'A Python web framework for building server-side applications, data models, and APIs.',
    'web-software',
  ],
  [
    'React',
    ['react', 'reactjs'],
    'A JavaScript library for building interfaces from reusable components.',
    'web-software',
  ],
  [
    'Next.js',
    ['nextjs', 'next js'],
    'A React framework that supports application routing and server/client rendering patterns.',
    'web-software',
  ],
  [
    'Vue',
    ['vue', 'vuejs'],
    'A JavaScript framework for building component-based user interfaces.',
    'web-software',
  ],
  [
    'Angular',
    ['angular'],
    'A web application framework built around components, templates, and application services.',
    'web-software',
  ],
  [
    'Python',
    ['python'],
    'A general-purpose programming language used in backend development, automation, data work, and AI.',
    'custom-software',
  ],
  [
    'Node.js',
    ['nodejs', 'node js'],
    'A JavaScript runtime commonly used for server-side applications and APIs.',
    'api-backend',
  ],
  [
    '.NET',
    ['dotnet', 'net framework'],
    'A development platform used to build applications and services, commonly with C#.',
    'api-backend',
  ],
  [
    'Laravel',
    ['laravel'],
    'A PHP framework for building web applications and backend services.',
    'web-software',
  ],
  [
    'n8n',
    ['n8n'],
    'A workflow automation platform that connects applications, APIs, triggers, and processing steps.',
    'automation',
  ],
  [
    'Zapier',
    ['zapier'],
    'An automation platform for connecting applications through event-triggered workflows.',
    'automation',
  ],
  [
    'Flutter',
    ['flutter'],
    'A framework for building applications from a shared Dart codebase, including mobile interfaces.',
    'mobile-apps',
  ],
  [
    'React Native',
    ['react native'],
    'A framework for building native mobile interfaces using React concepts and JavaScript.',
    'mobile-apps',
  ],
  [
    'SQL',
    ['sql'],
    'A language for querying and managing data in relational databases.',
    'data-analytics',
  ],
  [
    'PostgreSQL',
    ['postgresql', 'postgres'],
    'An open-source relational database used for structured application data and queries.',
    'api-backend',
  ],
  [
    'Docker',
    ['docker'],
    'A toolset for packaging applications and their dependencies into containers.',
    'cloud',
  ],
  [
    'Kubernetes',
    ['kubernetes', 'k8s'],
    'A platform for orchestrating containerized applications across computing resources.',
    'cloud',
  ],
  [
    'Apache Spark',
    ['apache spark', 'spark'],
    'An engine for distributed data processing and analytics.',
    'data-analytics',
  ],
  [
    'ETL',
    ['etl'],
    'Extract, transform, load: a pattern for moving and reshaping data between sources and a destination.',
    'data-analytics',
  ],
  [
    'Data warehouse',
    ['data warehouse', 'warehouse'],
    'A data store designed to support consolidated reporting and analytical queries.',
    'data-analytics',
  ],
  [
    'RAG',
    ['rag', 'retrieval augmented generation'],
    'A pattern that retrieves relevant information to ground a language model’s response; retrieval does not guarantee accuracy.',
    'ai-solutions',
  ],
  [
    'WordPress',
    ['wordpress'],
    'A content management system used to publish websites and manage content.',
    'web-software',
  ],
  [
    'Shopify',
    ['shopify'],
    'An ecommerce platform for storefronts, products, checkout, and order management.',
    'ecommerce',
  ],
  [
    'API',
    ['api', 'rest api'],
    'An interface through which software systems exchange requests and data under defined rules.',
    'api-backend',
  ],
].map(([name, aliases, description, service]) => ({
  name,
  aliases,
  description,
  service,
}))

export const TECHNOLOGY_NAMES =
  'elixir phoenix erlang haskell scala kafka cobol fortran matlab julia ruby rails php java spring go golang rust swift kotlin typescript javascript csharp cpp aws azure gcp cloudflare firebase supabase appwrite redis mongodb mysql mariadb oracle sap odoo powerbi tableau bigquery snowflake databricks airflow dbt fastapi flask express nestjs svelte astro nuxt bun deno webflow bubble make salesforce hubspot zapier'.split(
    ' ',
  )
