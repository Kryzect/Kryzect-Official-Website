import { Link, useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getIndustry } from '../data/industries.js'

import './company.css'
import './industries.css'

// Reusable industry detail renderer (/industries/:slug).
// Per Blueprint V2 §47, we do NOT fabricate industry expertise. A detail page
// shows the honest, neutral description of that category and is a placeholder
// for genuine, future industry content once real experience exists.

function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustry(slug)

  if (!industry) {
    return (
      <>
        <Seo
          title="Industry not found"
          description="This industry page could not be found."
          path="/industries"
          noindex
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Industry not found.</h1>
            <div className="page-hero__actions">
              <Link className="btn btn--primary" to="/industries">
                Back to Industries
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo
        title={`${industry.name} — Industries`}
        description={industry.description}
        path={`/industries/${industry.slug}`}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Industries', to: '/industries' },
          { label: industry.name, to: `/industries/${industry.slug}` },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Industry</span>
          <h1 className="page-hero__title">{industry.name}.</h1>
          <p className="page-hero__text">{industry.description}</p>
        </div>
      </section>

      {/* ============ HONEST NOTE ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="industry-note">
            <h2 className="industry-note__title">Work in this area.</h2>
            <p className="industry-note__text">
              This page is a placeholder for genuine {industry.name.toLowerCase()} work. It is only
              filled in when real project experience exists — we do not invent clients, case
              studies, or metrics.
            </p>
          </div>

          <div className="section-cta">
            <Button to="/contact">Discuss a Problem in This Area →</Button>
            <Button to="/work" variant="ghost">
              See Our Work
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndustryPage