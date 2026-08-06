import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { INDUSTRIES } from '../data/industries.js'

import './company.css'
import './industries.css'

// Industries (Blueprint V2 §47). Overview of potential categories only.
// We do NOT claim specialization in an industry merely because it is listed.
// Strong industry claims are only made once genuine experience exists.

function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        description="The kinds of problems Kryzect works on across industries. Listing an industry is not a claim of specialization."
        path="/industries"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Industries', to: '/industries' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Industries</span>
          <h1 className="page-hero__title">The problems we work on.</h1>
          <p className="page-hero__text">
            Every industry is ultimately a set of problems solved by good
            engineering. Listing a category is not a promise of specialization —
            it is a statement of the kinds of work we take on.
          </p>
        </div>
      </section>

      {/* ============ INDUSTRY GRID ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="industry-grid">
            {INDUSTRIES.map((industry) => (
              <article className="industry-card" key={industry.slug}>
                <h2 className="industry-card__name">{industry.name}</h2>
                <p className="industry-card__text">{industry.description}</p>
              </article>
            ))}
          </div>

          <div className="industry-note">
            <h2 className="industry-note__title">A word on specialisation.</h2>
            <p className="industry-note__text">
              These categories describe where our skills can be applied — not a claim that we are
              specialists in each. We only describe strong industry expertise where genuine project
              experience exists to back it up.
            </p>
          </div>

          <div className="section-cta">
            <Button to="/contact">Tell Us About Your Problem →</Button>
            <Button to="/book-a-call" variant="ghost">
              Book a Call
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Industries