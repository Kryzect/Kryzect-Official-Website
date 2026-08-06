import { useEffect } from 'react'

// Lightweight per-route head management (no external SEO lib).
// Sets <title>, meta description, canonical, and Open Graph/Twitter tags
// on every route change. Safe no-op during SSR (not used here).

const SITE_NAME = 'Kryzect'

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

function Seo({ title, description, path, type = 'website' }) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const url = `${window.location.origin}${path}`
    const fullTitle = `${title} — ${SITE_NAME}`

    document.title = fullTitle
    upsertMeta('meta', 'name', 'description', description)
    upsertMeta('meta', 'property', 'og:title', fullTitle)
    upsertMeta('meta', 'property', 'og:description', description)
    upsertMeta('meta', 'property', 'og:url', url)
    upsertMeta('meta', 'property', 'og:type', type)
    upsertMeta('meta', 'name', 'twitter:title', fullTitle)
    upsertMeta('meta', 'name', 'twitter:description', description)
    upsertLink('canonical', url)
  }, [title, description, path, type])

  return null
}

export default Seo
