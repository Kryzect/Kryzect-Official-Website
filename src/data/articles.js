// Kryzect — articles content model (Blueprint V2 §69–70).
// Only approved, genuine articles belong in the published collection.
// Adding an article = append one object to ARTICLES. No page changes needed.

// Article data model:
//   slug            — unique URL slug (/blog/:slug)
//   title           — display headline (seoTitle can override the document title)
//   subtitle        — one-line kicker under the title
//   excerpt         — card copy + meta description
//   category        — one of ARTICLE_CATEGORIES
//   author          — author name
//   authorType      — Person (default) or Organization; authorUrl is optional
//   date            — ISO yyyy-mm-dd (display + datePublished)
//   readingTime     — display string, e.g. "6 min read"
//   coverImage      — { src, alt, srcSet?, sizes?, width?, height? } (hero + card)
//   content         — ordered blocks, see CONTENT_BLOCK_TYPES
//   relatedArticles — [slug, ...] resolved at render time; unknown slugs skipped
//   editorial       — restrained editorial layout; showCta: false removes sales CTA
//
// Content block types (renderer in pages/ArticlePage.jsx):
//   { type: 'p',      text }               paragraph
//   { type: 'h2',     text }               section heading (h2)
//   { type: 'h3',     text }               sub-heading (h3)
//   { type: 'list',   items: [text] }      unordered list
//   { type: 'quote',  text }               blockquote
//   { type: 'hr' }                        editorial divider
//   { type: 'figure', id, image, caption, description?, items? }
// Text/caption/list items accept strings or arrays of safe inline runs:
// { type: 'text'|'em'|'strong'|'code', text }, { type: 'link', text, href }.
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

import { PHP2SHELL_ARTICLE } from './articles/php2shell.js'
import { articleReadingTime } from '../utils/articles.js'

export const ARTICLES = [
  {
    ...PHP2SHELL_ARTICLE,
    readingTime: articleReadingTime(PHP2SHELL_ARTICLE.content),
  },
]

export const CONTENT_BLOCK_TYPES = [
  'p',
  'h2',
  'h3',
  'list',
  'quote',
  'figure',
  'hr',
]

export function getArticle(slug) {
  return ARTICLES.find((article) => article.slug === slug) ?? null
}

export function getRelatedArticles(article) {
  return (article.relatedArticles ?? [])
    .map((slug) => getArticle(slug))
    .filter(Boolean)
}
