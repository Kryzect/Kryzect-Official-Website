import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Breadcrumb nav with JSON-LD BreadcrumbList for SEO.
// `items` = [{ label, to }] in order; the last item is current page (no link).

function Breadcrumbs({ items }) {
  const scriptRef = useRef(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script')
      scriptRef.current.type = 'application/ld+json'
      document.head.appendChild(scriptRef.current)
    }
    scriptRef.current.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${window.location.origin}${item.to}`,
      })),
    })
  }, [items])

  useEffect(() => {
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
    }
  }, [])

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li className="breadcrumbs__item" key={`${item.to}-${index}`}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
