import { formatDate } from '../utils/articles.js'
import { Link } from 'react-router-dom'

// Blog card — used on the Blog overview and for related articles.
// Renders cover image, category, title, excerpt, date, reading time, CTA.

function ArticleCard({ article, headingLevel = 3 }) {
  const href = `/blog/${article.slug}`
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="blog-card">
      {article.coverImage ? (
        <Link
          to={href}
          className="blog-card__media"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="blog-card__image"
            src={article.coverImage.src}
            srcSet={article.coverImage.srcSet}
            sizes={article.coverImage.sizes}
            alt={article.coverImage.alt ?? article.title}
            loading="lazy"
            decoding="async"
            width={article.coverImage.width}
            height={article.coverImage.height}
          />
        </Link>
      ) : null}
      <div className="blog-card__body">
        <span className="blog-card__category">{article.category}</span>
        <Heading className="blog-card__title">
          <Link to={href}>{article.title}</Link>
        </Heading>
        <p className="blog-card__excerpt">{article.excerpt}</p>
        <div className="blog-card__meta">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>
        <Link to={href} className="blog-card__cta">
          Read Article →
        </Link>
      </div>
    </article>
  )
}

export default ArticleCard
