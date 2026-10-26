import { Link } from 'react-router-dom'
import { SITE_URL } from '../config.js'
import JsonLd from './JsonLd.jsx'
export default function Breadcrumbs({ items }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: new URL(item.to, SITE_URL).href,
          })),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          {items.map((item, index) => (
            <li className="breadcrumbs__item" key={item.to}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
