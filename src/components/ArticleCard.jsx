import { Link } from 'react-router-dom'

// Blog card — used on the Blog overview and for related articles.
// Renders cover image, category, title, excerpt, date, reading time, CTA.

function formatDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function ArticleCard({ article }) {
  const href = `/blog/${article.slug}`
  return (
    <article className="blog-card">
      {article.coverImage ? (
        <Link to={href} className="blog-card__media" tabIndex={-1} aria-hidden="true">
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
        <h3 className="blog-card__title">
          <Link to={href}>{article.title}</Link>
        </h3>
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
