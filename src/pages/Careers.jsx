import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { CONTACT_EMAIL } from '../config.js'
import { CAREERS_SECTIONS } from '../data/careers.js'

import './company.css'
import './careers.css'

// Careers (Blueprint V2 §48). Architecture for the page, which may be hidden
// from launch navigation. Content is honest: no invented roles, no large team.
function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Working at Kryzect. A small, independent agency — thinking first, building better."
        path="/careers"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Careers', to: '/careers' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Careers</span>
          <h1 className="page-hero__title">Build with purpose, grow deliberately.</h1>
          <p className="page-hero__text">
            Kryzect is a small, independent agency. This page will grow as the team does — honestly,
            and only for real opportunities.
          </p>
        </div>
      </section>

      {/* ============ SECTIONS ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="careers-list">
            {CAREERS_SECTIONS.map((section) => (
              <div className="careers-section" key={section.kicker}>
                <span className="careers-section__kicker">{section.kicker}</span>
                <h2 className="careers-section__title">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p className="careers-section__text" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Button href={`mailto:${CONTACT_EMAIL}`}>Get in Touch</Button>
            <Button to="/contact" variant="ghost">
              General Enquiries
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Careers