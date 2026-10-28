import { isSafeArticleHref } from '../utils/articles.js'

export function InlineContent({ value }) {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return null
  return value.map((part, index) => {
    const key = `${part.type}-${index}`
    if (part.type === 'link' && isSafeArticleHref(part.href))
      return (
        <a href={part.href} key={key}>
          {part.text}
        </a>
      )
    if (part.type === 'strong') return <strong key={key}>{part.text}</strong>
    if (part.type === 'em') return <em key={key}>{part.text}</em>
    if (part.type === 'code') return <code key={key}>{part.text}</code>
    return <span key={key}>{part.text}</span>
  })
}

export default function ArticleContent({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="article-body__h2">
          <InlineContent value={block.text} />
        </h2>
      )
    case 'h3':
      return (
        <h3 className="article-body__h3">
          <InlineContent value={block.text} />
        </h3>
      )
    case 'list':
      return (
        <ul className="article-body__list">
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineContent value={item} />
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="article-body__quote">
          <InlineContent value={block.text} />
        </blockquote>
      )
    case 'hr':
      return <hr className="article-body__divider" />
    case 'figure':
      return (
        <figure
          className="article-figure"
          aria-labelledby={`${block.id}-caption`}
        >
          <img
            className={`article-figure__image${block.items?.length ? ' article-figure__image--diagram' : ''}`}
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            loading="lazy"
            decoding="async"
            aria-describedby={
              block.description ? `${block.id}-description` : undefined
            }
          />
          {block.description && (
            <p id={`${block.id}-description`} className="sr-only">
              {block.description}
            </p>
          )}
          {block.items?.length > 0 && (
            <ol className="article-figure__text">
              {block.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          )}
          <figcaption id={`${block.id}-caption`}>
            <InlineContent value={block.caption} />
          </figcaption>
        </figure>
      )
    case 'p':
    default:
      return (
        <p
          className={`article-body__p${block.variant === 'note' ? ' article-body__p--note' : ''}`}
        >
          <InlineContent value={block.text} />
        </p>
      )
  }
}
