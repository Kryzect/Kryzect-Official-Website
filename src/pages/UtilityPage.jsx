import { Link } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getUtilityPage } from '../data/utility-pages.js'
import { CONTACT_EMAIL } from '../config.js'

import './company.css'
import './utility.css'

// Reusable renderer for the short legal/utility pages (Terms, Privacy,
// Cookies, Security, Accessibility). Content lives in data/utility-pages.js —
// this component only turns that data into markup. The contact email always
// comes from src/config.js (CONTACT_EMAIL), the single source of truth.

function UtilityPage({ slug }) {
  const page = getUtilityPage(slug)

  if (!page) {
    return (
      <>
        <Seo
          title="Page not found"
          description="This page could not be found."
          path="/"
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Page not found.</h1>
            <p className="page-hero__text">
              The page you are looking for does not exist.
            </p>
            <div className="page-hero__actions">
              <Link className="btn btn--primary" to="/">
                Back to Home
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
        title={page.label}
        description={page.heroText}
        path={`/${page.slug}`}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: page.label, to: `/${page.slug}` },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">{page.kicker}</span>
          <h1 className="page-hero__title">{page.label}</h1>
          <p className="page-hero__text">{page.heroText}</p>
          <p className="utility__updated">
            Last updated: {page.lastUpdated}
          </p>
        </div>
      </section>

      {/* ============ SECTIONS ============ */}
      <section className="page-section">
        <div className="page-container">
          {page.sections.map((section) => (
            <div className="utility-section" key={section.heading}>
              <h2 className="utility-section__heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="utility-section__para" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="utility-section__list">
                  {section.list.map((item) => (
                    <li className="utility-section__list-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.contact && (
                <div className="utility-section__cta">
                  <Button href={`mailto:${CONTACT_EMAIL}`}>Contact Kryzect</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default UtilityPage
