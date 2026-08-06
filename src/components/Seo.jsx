import { useEffect } from 'react'

import { SITE_NAME, SITE_URL, LOGO_URL, isIndexable } from '../data/site.js'

// Lightweight per-route head management (no external SEO lib).
// Sets <title>, meta description, canonical, robots, and Open Graph/Twitter
// tags on every route change. Safe no-op during SSR (not used here).
// `path` is the app route (e.g. "/blog/my-slug") — used for canonical + og:url.
// `image` optional — overrides the default logo for og:image / twitter:image
//   (relative paths are resolved against SITE_URL, absolute kept as-is).
// `noindex` optional — force noindex (defaults to isIndexable(path)).

function upsertMeta(selector, attribute, key, content) {
  let el = document.head.querySelector(`${selector}[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function resolveUrl(url) {
  // Local/relative URLs get the deployed origin; data: and absolute are kept.
  if (url.startsWith('http')) return url
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

function Seo({ title, description, path, type = 'website', image, noindex }) {
  const hidden = noindex ?? !isIndexable(path)

  useEffect(() => {
    if (typeof document === 'undefined') return

    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    const fullTitle = `${title} — ${SITE_NAME}`
    const ogImage = resolveUrl(image || LOGO_URL)

    document.title = fullTitle
    upsertMeta('meta', 'name', 'description', description)
    upsertMeta('meta', 'name', 'robots', hidden ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('meta', 'property', 'og:title', fullTitle)
    upsertMeta('meta', 'property', 'og:description', description)
    upsertMeta('meta', 'property', 'og:url', url)
    upsertMeta('meta', 'property', 'og:type', type)
    upsertMeta('meta', 'property', 'og:site_name', SITE_NAME)
    upsertMeta('meta', 'property', 'og:locale', 'en_US')
    upsertMeta('meta', 'property', 'og:image', ogImage)
    upsertMeta('meta', 'name', 'twitter:title', fullTitle)
    upsertMeta('meta', 'name', 'twitter:description', description)
    upsertMeta('meta', 'name', 'twitter:card', 'summary')
    upsertMeta('meta', 'name', 'twitter:image', ogImage)
    upsertLink('canonical', url)
  }, [title, description, path, type, image, hidden])

  return null
}

export default Seo