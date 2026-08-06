import { useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getProduct } from '../data/products.js'

import './company.css'
import './products.css'

function SectionHeading({ kicker, title }) {
  return (
    <div className="page-section__heading">
      <span className="page-section__kicker">{kicker}</span>
      <h2 className="page-section__title">{title}</h2>
    </div>
  )
}

function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)

  if (!product) {
    return (
      <>
        <Seo
          title="Product not found"
          description="This product page could not be found. Explore all Kryzect products."
          path="/products"
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Product not found.</h1>
            <div className="page-hero__actions">
              <Button to="/products">Back to Products</Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        path={`/products/${product.slug}`}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.name, to: `/products/${product.slug}` },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Product · {product.status}</span>
          <h1 className="page-hero__title">{product.name}</h1>
          <p className="page-hero__text">{product.tagline}</p>
          <div className="page-hero__actions">
            {product.liveUrl ? (
              <Button href={product.liveUrl} variant="ghost">
                Visit Live Experiment →
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* ============ WHAT IT DOES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Overview" title="What it does." />
          <div className="story">
            <p className="story__para">{product.description}</p>
          </div>
        </div>
      </section>

      {/* ============ THE PROBLEM ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Why it exists" title="The problem." />
          <div className="story">
            <p className="story__para">{product.problem}</p>
          </div>
          {product.painPoints?.length > 0 ? (
            <ul className="dot-list">
              {product.painPoints.map((point) => (
                <li className="dot" key={point}>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* ============ WHAT A POSTMORTEM IS ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Basics" title="What a postmortem is." />
          <div className="story">
            <p className="story__para">
              A postmortem is a structured document produced after a production incident. A good
              one is blameless — it focuses on systems and processes, not people — and it answers
              four questions:
            </p>
          </div>
          {product.postmortemAnswers?.length > 0 ? (
            <ul className="dot-list">
              {product.postmortemAnswers.map((answer) => (
                <li className="dot" key={answer}>
                  {answer}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Audience" title="Who it is for." />
          <div className="story">
            <p className="story__para">{product.audience}</p>
          </div>
          {product.audiences?.length > 0 ? (
            <div className="audience-grid">
              {product.audiences.map((audience) => (
                <div className="audience-card" key={audience.who}>
                  <h3 className="audience-card__who">{audience.who}</h3>
                  <p className="audience-card__why">{audience.why}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Under the hood" title="How it works." />
          <ol className="process-list">
            {product.howItWorks.map((step, index) => (
              <li className="process-list__item" key={step}>
                <span className="process-list__number">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ KEY CAPABILITIES ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Capabilities" title="Key capabilities." />
          {product.capabilities.length > 0 ? (
            <ul className="dot-list">
              {product.capabilities.map((capability) => (
                <li className="dot" key={capability}>
                  {capability}
                </li>
              ))}
            </ul>
          ) : (
            <p className="home-page__empty">Capabilities are being documented as they are built.</p>
          )}
        </div>
      </section>

      {/* ============ TECHNICAL APPROACH ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Approach" title="Technical approach." />
          <div className="service-note">
            <p className="service-note__body">{product.technicalApproach.text}</p>
            <p className="service-note__body service-note__body--muted">{product.technicalApproach.note}</p>
          </div>
        </div>
      </section>

      {/* ============ SCREENSHOTS ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Visuals" title="Screenshots." />
          {product.screenshots.length > 0 ? (
            <div className="screenshot-grid">
              {product.screenshots.map((screenshot) => (
                <img
                  className="screenshot"
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt ?? `${product.name} screenshot`}
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <p className="home-page__empty">
              Screenshots are being prepared and will appear here when real ones are available.
            </p>
          )}
        </div>
      </section>

      {/* ============ CURRENT STATUS ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Status" title="Current status." />
          <div className="product-status">
            <span className="product-status__badge">{product.status}</span>
            <p className="product-status__text">{product.statusNote}</p>
          </div>
        </div>
      </section>

      {/* ============ ROADMAP ============ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeading kicker="Ahead" title="Roadmap." />
          {product.roadmap.length > 0 ? (
            <ul className="dot-list">
              {product.roadmap.map((item) => (
                <li className="dot" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="home-page__empty">The roadmap is being shaped as the product develops.</p>
          )}
        </div>
      </section>

      {/* ============ FUTURE DIRECTION ============ */}
      <section className="page-section page-section--final">
        <div className="page-container">
          <SectionHeading kicker="Where this is going" title="Future direction." />
          <div className="story">
            <p className="story__para">{product.futureDirection}</p>
          </div>
          <div className="section-cta">
            {product.liveUrl ? (
              <Button href={product.liveUrl} variant="ghost">
                Visit Live Experiment →
              </Button>
            ) : null}
            <Button to="/blog">Read Our AI Writing →</Button>
            <Button to="/book-a-call" variant="ghost">
              Book a Call →
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage