import { Link, useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getService } from '../data/services-catalog.js'

import './company.css'
import './services.css'

function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      <span className="page-section__kicker">{kicker}</span>
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}

function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) {
    return (
      <>
        <Seo
          title="Service not found"
          description="This service page could not be found. Explore all Kryzect services."
          path="/services"
          noindex
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Service not found.</h1>
            <div className="hero__actions">
              <Button to="/services">Back to Services</Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter(Boolean)

  return (
    <>
      <Seo
        title={`${service.title} Services`}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
        type="website"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title, to: `/services/${service.slug}` },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">{service.category}</span>
          <h1 className="page-hero__title">{service.hero}</h1>
          <p className="page-hero__text">{service.shortDescription}</p>
          <div className="page-hero__actions">
            <Button to={service.cta.to}>{service.cta.label}</Button>
            {service.links.map((link) => (
              <Button key={link.label} to={link.to} variant="ghost">
                {link.label}
              </Button>
            ))}
            <Button to="/work" variant="ghost">
              See Our Work →
            </Button>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Overview" title="What this service involves." />
          <div className="story">
            {service.fullDescription.map((paragraph) => (
              <p className="story__para" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Capabilities" title="What we build." />
          <ul className="item-list item-list--dense">
            {service.capabilities.map((capability) => (
              <li className="item-card" key={capability}>
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Use cases" title="Where it applies." />
          <ul className="item-list item-list--dense">
            {service.useCases.map((useCase) => (
              <li className="item-card" key={useCase}>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ NOTE (optional, e.g. architecture / honesty) ============ */}
      {service.note && (
        <section className="page-section">
          <div className="page-container">
            <div className="service-note">
              <span className="service-note__kicker">{service.note.kicker}</span>
              <h3 className="service-note__title">{service.note.title}</h3>
              <p className="service-note__body">{service.note.body}</p>
            </div>
          </div>
        </section>
      )}

      {/* ============ FAQS (optional) ============ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="page-section">
          <div className="page-container">
            <SectionHeading kicker="FAQ" title="Common questions." />
            <div className="faq-list">
              {service.faqs.map((faq) => (
                <details className="faq" key={faq.question}>
                  <summary className="faq__question">{faq.question}</summary>
                  <p className="faq__answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ RELATED SERVICES ============ */}
      {related.length > 0 && (
        <section className="page-section">
          <div className="page-container">
            <SectionHeading kicker="Related" title="Explore related services." />
            <ul className="related-grid">
              {related.map((item) => (
                <li className="related-card" key={item.slug}>
                  <Link className="related-card__link" to={`/services/${item.slug}`}>
                    <span className="related-card__title">{item.title}</span>
                    <span className="related-card__desc">{item.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ============ FINAL CTA ============ */}
      <section className="page-section page-section--final">
        <div className="page-container">
          <div className="final-cta">
            <h2 className="final-cta__title">Have a problem in mind?</h2>
            <p className="final-cta__text">
              Start with the outcome. We&apos;ll work out the technology together.
            </p>
            <div className="final-cta__actions">
              <Button to="/contact">Start a Project</Button>
              <Button to="/book-a-call" variant="ghost">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicePage
