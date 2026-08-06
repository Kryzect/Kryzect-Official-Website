import Button from '../components/Button.jsx'

import './company.css'

// Why Kryzect — positioning & philosophy page. Blueprint V2 §15.
// Uses the exact finalized copy where the Blueprint provides it; where the
// Blueprint only lists requirements, copy is written in Kryzect's voice without
// inventing unsupported claims.

// Doctrine sections (Blueprint §15 headings + required items).
const DOCTRINE = [
  {
    kicker: 'Doctrine 01',
    title: 'Clarity Before Code',
    body: 'The starting point is never the technology. It is the objective, the users, the workflow, and what success actually looks like.',
    items: [
      'business goals',
      'user goals',
      'workflow',
      'constraints',
      'existing systems',
      'technical requirements',
      'future requirements',
      'measurable outcomes',
    ],
  },
  {
    kicker: 'Doctrine 02',
    title: 'Technology Should Serve the Objective',
    body: 'Technology is a means, not an end. Every choice is evaluated against what it does for the objective — not what it sounds like on paper.',
    items: [
      'performance',
      'maintainability',
      'scalability',
      'cost',
      'security',
      'development speed',
      'ecosystem',
      'integration requirements',
    ],
  },
  {
    kicker: 'Doctrine 03',
    title: 'No Unnecessary Complexity',
    quote: 'If a simple solution solves the problem, it should not become a complicated system just because more technology can be added.',
  },
  {
    kicker: 'Doctrine 04',
    title: 'No Technology Theatre',
    body: 'We do not decorate projects with technology for its own sake. If it does not earn its place, it does not belong.',
    items: [
      'buzzword stuffing',
      'unnecessary AI',
      'unnecessary microservices',
      'unnecessary cloud complexity',
      'unnecessary features',
    ],
  },
  {
    kicker: 'Doctrine 05',
    title: 'Honest Communication',
    body: 'We say what we know, what we do not know, what is realistic, and what is not necessary — including the trade-offs.',
    items: [
      'what we know',
      "what we don't know",
      'what is realistic',
      "what isn't necessary",
      'trade-offs',
    ],
  },
  {
    kicker: 'Doctrine 06',
    title: 'Long-Term Thinking',
    body: 'Software is built to be owned, maintained, and extended. Shortcuts today become cost and risk tomorrow.',
    items: [
      'maintainability',
      'future development',
      'ownership',
      'documentation',
      'security',
      'scalability',
    ],
  },
]

// Who we are best for (Blueprint §15). Do not exclude small clients.
const AUDIENCE = [
  {
    title: 'Businesses',
    items: ['websites', 'dashboards', 'automation', 'e-commerce', 'internal systems', 'AI solutions'],
  },
  {
    title: 'Startups',
    items: ['MVPs', 'SaaS', 'mobile apps', 'APIs', 'product engineering'],
  },
  {
    title: 'Individuals / Creators',
    items: ['websites', 'portfolios', 'digital products', 'custom platforms'],
  },
  {
    title: 'Teams',
    items: ['automation', 'integrations', 'dashboards', 'internal tools'],
  },
]

const NOT_RIGHT_FOR = [
  'intentionally impossible timelines',
  'deceptive projects',
  'projects where quality and maintainability are explicitly irrelevant',
  'projects that fundamentally conflict with our standards',
]

function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      <span className="page-section__kicker">{kicker}</span>
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}

function WhyKryzect() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <h1 className="page-hero__title">Why Kryzect?</h1>
          <p className="page-hero__lead">
            Because building something is not the same as building the right thing.
          </p>
        </div>
      </section>

      {/* ============ DOCTRINE ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Our philosophy" title="What we believe." />
          <ol className="doctrine-list">
            {DOCTRINE.map((d) => (
              <li className="doctrine" key={d.title}>
                <span className="doctrine__kicker">{d.kicker}</span>
                <h3 className="doctrine__title">{d.title}</h3>
                {d.quote && <p className="doctrine__quote">{d.quote}</p>}
                {d.body && <p className="doctrine__text">{d.body}</p>}
                {d.items && (
                  <ul className="dot-list">
                    {d.items.map((item) => (
                      <li className="dot" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ WHO WE ARE BEST FOR ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Our fit" title="Who we are best for." />
          <ul className="audience-list">
            {AUDIENCE.map((group) => (
              <li className="audience-group" key={group.title}>
                <h3 className="audience-group__title">{group.title}</h3>
                <ul className="audience-group__items">
                  {group.items.map((item) => (
                    <li className="audience-group__item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ WHO WE MAY NOT BE RIGHT FOR ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Honesty" title="Who we may not be right for." />
          <div className="story">
            <p className="story__para">
              We take on work where we can genuinely help. There are some situations where we
              are honest that we are not the right fit:
            </p>
            <ul className="dot-list" style={{ marginTop: 'var(--space-6)' }}>
              {NOT_RIGHT_FOR.map((item) => (
                <li className="dot" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="story__para" style={{ marginTop: 'var(--space-6)' }}>
              This is about fit and honesty — not about excluding anyone. If we are not right
              for a project, we will say so.
            </p>
          </div>
          <div className="section-cta">
            <Button to="/contact" variant="ghost">
              Talk to Kryzect →
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyKryzect