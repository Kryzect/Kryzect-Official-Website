import { useParams, Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import Button from '../components/Button.jsx'
import JsonLd from '../components/JsonLd.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import NotFound from './NotFound.jsx'
import { getProduct } from '../data/products.js'
import { SITE_URL } from '../data/site.js'
export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  return (
    <>
      <PageIntro
        path={`/products/${slug}`}
        label={product.name}
        title="Learn from the incident. Keep the human judgment."
        description={product.description}
      >
        <p className="status-label">{product.status} · Product experiment</p>
      </PageIntro>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.name,
          description: product.description,
          url: `${SITE_URL}/products/${slug}`,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          author: { '@type': 'Organization', name: 'Kryzect', url: SITE_URL },
        }}
      />
      <section className="page-section">
        <div className="page-container evidence-layout">
          <div>
            <SectionHeading title="A structured starting point for review." />
            <p className="page-hero__text">{product.problem}</p>
            <ul className="plain-list">
              {product.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="evidence-note">
            <h2>Explore the public experiment.</h2>
            <p>{product.statusNote}</p>
            <p>
              Use sample incident data. Do not submit production logs,
              credentials, personal information, or confidential records to the
              experiment.
            </p>
            {product.liveUrl && (
              <Button href={product.liveUrl} variant="ghost">
                Open Experiment ↗
              </Button>
            )}
            <p className="section-note">
              The experiment is separate from this agency website. Availability
              and behavior may change during development.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-container">
          <SectionHeading title="How the workflow fits together." />
          <ol className="process-list">
            {product.howItWorks.map((item, index) => (
              <li className="process-list__item" key={item}>
                <span className="process-list__number">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="section-note">{product.technicalApproach.text}</p>
        </div>
      </section>
      {product.screenshots.length > 0 && (
        <section className="page-section">
          <div className="page-container screenshot-grid">
            {product.screenshots.map((shot) => (
              <img
                key={shot.src}
                className="screenshot"
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      )}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading
            kicker="Planned development"
            title="Where the product goes next."
          />
          <p className="page-hero__text">
            The roadmap includes organization access, account-level API usage,
            and integrations with incident and issue-management tools. These are
            planned areas of work, not a claim that they are available today.
          </p>
          <div className="section-cta">
            <Link to="/contact">Discuss a related engineering project →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
