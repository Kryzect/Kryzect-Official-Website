import JsonLd from '../components/JsonLd.jsx'
import { formatDate, articleWordCount } from '../utils/articles.js'
import { useParams } from 'react-router-dom'

import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import ArticleContent from '../components/ArticleContent.jsx'
import { Link } from 'react-router-dom'
import { getArticle, getRelatedArticles } from '../data/articles.js'
import { SITE_URL } from '../data/site.js'

// Renders one content block into semantic markup (see data/articles.js).
function ArticleSchema({ article }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage
          ? new URL(article.coverImage.src, SITE_URL).href
          : undefined,
        datePublished: article.date,
        dateModified: article.updated,
        author: {
          '@type': article.authorType || 'Person',
          name: article.author,
          url: article.authorUrl,
        },
        publisher: { '@type': 'Organization', name: 'Kryzect', url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
        wordCount: articleWordCount(article.content),
        articleSection: article.category,
      }}
    />
  )
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
        seoTitle={article.seoTitle}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        image={article.socialImage || article.coverImage?.src}
        imageAlt={article.coverImage?.alt}
        imageWidth={article.coverImage?.width}
        imageHeight={article.coverImage?.height}
        publishedTime={article.date}
        modifiedTime={article.updated}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          {
            label: article.breadcrumbLabel || article.title,
            to: `/blog/${article.slug}`,
          },
        ]}
      />
      <ArticleSchema article={article} />

      {/* ============ ARTICLE ============ */}
      <article
        className={`article${article.editorial ? ' article--editorial' : ''}`}
      >
        <header className="article__header">
          <div className="page-container">
            <span className="article__category">{article.category}</span>
            <h1 className="article__title">{article.title}</h1>
            {article.subtitle ? (
              <p className="article__subtitle">{article.subtitle}</p>
            ) : null}
            <div className="article__meta">
              <span className="article__author">By {article.author}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>

        {article.coverImage ? (
          <figure className="article__media page-container">
            <img
              className="article__image"
              src={article.coverImage.src}
              srcSet={article.coverImage.srcSet}
              sizes={article.coverImage.sizes}
              alt={article.coverImage.alt ?? article.title}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={article.coverImage.width}
              height={article.coverImage.height}
            />
          </figure>
        ) : null}

        <div className="article__body">
          {article.content.map((block, index) => (
            <ArticleContent block={block} key={`${block.type}-${index}`} />
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
      {article.showCta === false ? (
        <div className="article__return">
          <Link to="/blog">← Back to the blog</Link>
        </div>
      ) : (
        <section className="page-section page-section--final">
          <div className="page-container">
            <div className="article-cta">
              <h2 className="article-cta__title">
                Need help applying this to your business?
              </h2>
              <div className="section-cta">
                <Button to="/contact">Talk to Kryzect →</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ArticlePage
