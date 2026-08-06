import { Link } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { SERVICES } from '../data/services-catalog.js'

import './company.css'
import './services.css'

function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="From focused websites to complex software platforms, Kryzect builds digital solutions across web, mobile, AI, automation, SaaS, cloud, data, commerce, and custom software."
        path="/services"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Services</span>
          <h1 className="page-hero__title">Technology for the outcome you have in mind.</h1>
          <p className="page-hero__text">
            From focused websites to complex software platforms, Kryzect builds digital solutions
            across web, mobile, AI, automation, SaaS, cloud, data, commerce, and custom software.
          </p>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="page-section">
        <div className="page-container">
          <div className="services-grid">
            {SERVICES.map((service) => (
              <article className="service-card" key={service.slug}>
                <h2 className="service-card__title">
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p className="service-card__explain">{service.shortDescription}</p>
                <h3 className="service-card__label">What we build</h3>
                <ul className="service-card__list">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <h3 className="service-card__label">Example use cases</h3>
                <ul className="service-card__list">
                  {service.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
                <div className="service-card__cta">
                  <Button to={`/services/${service.slug}`} variant="ghost">
                    Explore {service.title} →
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <Button to="/contact">Tell Us What You Need →</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
