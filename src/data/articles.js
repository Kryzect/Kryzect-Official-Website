// Kryzect — articles content model (Blueprint V2 §69–70).
// No fabricated articles: ARTICLES stays empty until real posts are written.
// Adding an article = append one object to ARTICLES. No page changes needed.

// Article data model:
//   slug            — unique URL slug (/blog/:slug)
//   title           — display + <title>
//   subtitle        — one-line kicker under the title
//   excerpt         — card copy + meta description
//   category        — one of ARTICLE_CATEGORIES
//   author          — author name
//   date            — ISO yyyy-mm-dd (display + datePublished)
//   readingTime     — display string, e.g. "6 min read"
//   coverImage      — { src, alt, srcSet?, sizes?, width?, height? } (hero + card)
//   content         — ordered blocks, see CONTENT_BLOCK_TYPES
//   relatedArticles — [slug, ...] resolved at render time; unknown slugs skipped
//
// Content block types (renderer in pages/ArticlePage.jsx):
//   { type: 'p',      text }               paragraph
//   { type: 'h2',     text }               section heading (h2)
//   { type: 'h3',     text }               sub-heading (h3)
//   { type: 'list',   items: [text] }      unordered list
//   { type: 'quote',  text }               blockquote
//
// Research inputs for future articles (do NOT scrape or fabricate now):
//   AnswerThePublic, Google autocomplete, Reddit, LinkedIn discussions,
//   client questions, common engineering problems, AI questions,
//   business workflow problems.

export const ARTICLE_CATEGORIES = [
  'Engineering',
  'AI',
  'Automation',
  'SaaS',
  'Data',
  'Cloud',
  'Product',
  'Business Technology',
  'Kryzect',
]

export const ARTICLES = []

export function getArticle(slug) {
  return ARTICLES.find((article) => article.slug === slug) ?? null
}

export function getRelatedArticles(article) {
  return (article.relatedArticles ?? [])
    .map((slug) => getArticle(slug))
    .filter(Boolean)
}
