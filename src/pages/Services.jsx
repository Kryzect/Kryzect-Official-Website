import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import ProjectCta from '../components/ProjectCta.jsx'
import { SERVICES } from '../data/services-catalog.js'

export default function Services() {
  return (
    <>
      <PageIntro
        path="/services"
        label="Services"
        title="What does your business need to do next?"
        description="Choose a starting point below, or tell us about the goal. We can work with a new idea, an existing system, or a workflow that needs improving."
      />
      <section className="page-section">
        <div className="page-container">
          <div className="services-grid">
            {SERVICES.map((service) => (
              <article className="service-card" key={service.slug}>
                <h2 className="service-card__title">
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p className="service-card__explain">
                  {service.shortDescription}
                </p>
                <p className="service-card__examples">
                  {service.capabilities.slice(0, 3).join(' · ')}
                </p>
                <Link
                  className="service-card__cta"
                  to={`/services/${service.slug}`}
                >
                  Explore service →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProjectCta />
    </>
  )
}
