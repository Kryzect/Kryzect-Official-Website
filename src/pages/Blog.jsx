import { useState } from 'react'

import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles.js'

const MIN_ARTICLES_FOR_FILTERS = 3

function Blog() {
  const [active, setActive] = useState('All')
  const showFilters = ARTICLES.length >= MIN_ARTICLES_FOR_FILTERS
  const filtered =
    active === 'All'
      ? ARTICLES
      : ARTICLES.filter((article) => article.category === active)

  return (
    <>
      <Seo
        title="Blog"
        description="Practical writing about software engineering, AI, automation, products, data, and the decisions behind technology."
        path="/blog"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Blog</span>
          <h1 className="page-hero__title">Kryzect Blog</h1>
          <p className="page-hero__lead">Thinking about technology, openly.</p>
          <p className="page-hero__text">
            Practical writing about software engineering, AI, automation,
            products, data, and the decisions behind technology.
          </p>
        </div>
      </section>

      {/* ============ CATEGORIES (filters only once enough articles exist) ============ */}
      {showFilters && (
        <section className="page-section">
          <div className="page-container">
            <div
              className="blog-filters"
              role="group"
              aria-label="Filter articles by category"
            >
              <button
                type="button"
                aria-pressed={active === 'All'}
                className={`blog-filter${active === 'All' ? ' blog-filter--active' : ''}`}
                onClick={() => setActive('All')}
              >
                All
              </button>
              {ARTICLE_CATEGORIES.map((category) => (
                <button
                  type="button"
                  className={`blog-filter${active === category ? ' blog-filter--active' : ''}`}
                  key={category}
                  aria-pressed={active === category}
                  onClick={() => setActive(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ARTICLES ============ */}
      <section className="page-section">
        <div className="page-container">
          {filtered.length > 0 ? (
            <div className="blog-grid">
              {filtered.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <h2 className="blog-empty__title">Nothing published yet.</h2>
              <p className="blog-empty__text">
                New articles will appear here when published.
              </p>
              {!showFilters ? (
                <p className="blog-empty__topics">
                  Planned categories: {ARTICLE_CATEGORIES.join(' · ')}.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog
