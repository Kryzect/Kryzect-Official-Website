import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { getArticle, getRelatedArticles } from '../data/articles.js'
import { SITE_URL } from '../data/site.js'

import './company.css'
import './blog.css'

function formatDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Renders one content block into semantic markup (see data/articles.js).
function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="article-body__h2">{block.text}</h2>
    case 'h3':
      return <h3 className="article-body__h3">{block.text}</h3>
    case 'list':
      return (
        <ul className="article-body__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'quote':
      return <blockquote className="article-body__quote">{block.text}</blockquote>
    case 'p':
    default:
      return <p className="article-body__p">{block.text}</p>
  }
}

// JSON-LD Article structured data, injected once per article render.
function ArticleSchema({ article }) {
  const scriptRef = useRef(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script')
      scriptRef.current.type = 'application/ld+json'
      document.head.appendChild(scriptRef.current)
    }
    const wordCount = article.content.reduce(
      (sum, block) => sum + (block.text ? block.text.split(/\s+/).length : 0),
      0,
    )
    scriptRef.current.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.coverImage ? `${SITE_URL}${article.coverImage.src}` : undefined,
      datePublished: article.date,
      dateModified: article.date,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@type': 'Organization', name: 'Kryzect', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
      wordCount,
      articleSection: article.category,
    })
  }, [article])

  useEffect(() => {
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
    }
  }, [])

  return null
}

function ArticlePage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) {
    return (
      <>
        <Seo
          title="Article not found"
          description="This article could not be found. Explore more Kryzect articles."
          path="/blog"
          noindex
        />
        <section className="page-hero">
          <div className="page-container">
            <h1 className="page-hero__title">Article not found.</h1>
            <div className="page-hero__actions">
              <Button to="/blog">Back to Blog</Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const related = getRelatedArticles(article)

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        image={article.coverImage ? article.coverImage.src : undefined}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: article.title, to: `/blog/${article.slug}` },
        ]}
      />
      <ArticleSchema article={article} />

      {/* ============ ARTICLE ============ */}
      <article className="article">
        <header className="article__header">
          <div className="page-container">
            <span className="article__category">{article.category}</span>
            <h1 className="article__title">{article.title}</h1>
            {article.subtitle ? <p className="article__subtitle">{article.subtitle}</p> : null}
            <div className="article__meta">
              <span className="article__author">By {article.author}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>

        {article.coverImage ? (
          <div className="article__media page-container">
            <img
              className="article__image"
              src={article.coverImage.src}
              srcSet={article.coverImage.srcSet}
              sizes={article.coverImage.sizes}
              alt={article.coverImage.alt ?? article.title}
              loading="lazy"
              decoding="async"
              width={article.coverImage.width}
              height={article.coverImage.height}
            />
          </div>
        ) : null}

        <div className="article__body">
          {article.content.map((block, index) => (
            <ContentBlock block={block} key={`${block.type}-${index}`} />
          ))}
        </div>
      </article>

      {/* ============ RELATED ARTICLES ============ */}
      {related.length > 0 ? (
        <section className="page-section" aria-labelledby="related-heading">
          <div className="page-container">
            <div className="page-section__heading">
              <span className="page-section__kicker">Keep reading</span>
              <h2 className="page-section__title" id="related-heading">
                Related articles.
              </h2>
            </div>
            <div className="blog-grid">
              {related.map((item) => (
                <ArticleCard article={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ CTA ============ */}
      <section className="page-section page-section--final">
        <div className="page-container">
          <div className="article-cta">
            <h2 className="article-cta__title">Need help applying this to your business?</h2>
            <div className="section-cta">
              <Button to="/contact">Talk to Kryzect →</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArticlePage
