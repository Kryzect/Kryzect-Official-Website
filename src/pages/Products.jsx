import { Link } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { PRODUCTS } from '../data/products.js'

function Products() {
  return (
    <>
      <Seo
        title="Products"
        description="Products built from problems worth solving. Explore IncidentIQ — AI-powered incident postmortem automation."
        path="/products"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Products</span>
          <h1 className="page-hero__title">
            Products built from problems worth solving.
          </h1>
          <p className="page-hero__text">
            Kryzect does not only build for others. We also explore problems
            worth solving ourselves and turn those ideas into products.
          </p>
        </div>
      </section>

      {/* ============ PRODUCT LIST ============ */}
      <section className="page-section">
        <div className="page-container">
          {PRODUCTS.length > 0 ? (
            <div className="product-grid">
              {PRODUCTS.map((product) => (
                <article className="product-card" key={product.slug}>
                  <div className="product-card__top">
                    <h2 className="product-card__name">
                      <Link to={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h2>
                    <span className="product-card__status">
                      {product.status}
                    </span>
                  </div>
                  <p className="product-card__tagline">{product.tagline}</p>
                  <h3 className="product-card__label">Problem</h3>
                  <p className="product-card__text">{product.problem}</p>
                  <div className="product-card__cta">
                    <Button to={`/products/${product.slug}`} variant="ghost">
                      Explore Product →
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="home-page__empty">
              Products are being built and will appear here as they move into
              development.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Products
