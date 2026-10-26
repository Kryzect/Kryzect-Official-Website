import { SITE_PAGES, isIndexable } from './site-map.js'
import { SERVICES } from './services-catalog.js'
import { PRODUCTS } from './products.js'
import { PROJECTS } from './projects.js'
import { ARTICLES } from './articles.js'
import { INDUSTRIES } from './industries.js'
export const PUBLIC_ROUTES = [
  ...new Set([
    ...SITE_PAGES.map((page) => page.slug),
    ...SERVICES.map((item) => `/services/${item.slug}`),
    ...PRODUCTS.map((item) => `/products/${item.slug}`),
    ...PROJECTS.map((item) => `/work/${item.slug}`),
    ...ARTICLES.map((item) => `/blog/${item.slug}`),
    ...INDUSTRIES.map((item) => `/industries/${item.slug}`),
  ]),
]
export const INDEXABLE_ROUTES = PUBLIC_ROUTES.filter(isIndexable)
