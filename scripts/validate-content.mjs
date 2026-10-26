import { SERVICES } from '../src/data/services-catalog.js'
import { PRODUCTS } from '../src/data/products.js'
import { PROJECTS } from '../src/data/projects.js'
import { ARTICLES } from '../src/data/articles.js'

export function validateRecords(records, kind) {
  const slugs = new Set()
  for (const record of records) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug) ||
      slugs.has(record.slug)
    )
      throw new Error(`${kind}: invalid or duplicate slug`)
    slugs.add(record.slug)
    for (const field of kind === 'article'
      ? ['title', 'excerpt', 'author', 'date', 'readingTime', 'category']
      : ['name', 'description']) {
      if (typeof record[field] !== 'string' || !record[field].trim())
        throw new Error(`${kind}/${record.slug}: missing ${field}`)
    }
    if (
      kind === 'article' &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(record.date) ||
        !Number.isFinite(Date.parse(record.date)) ||
        new Date(record.date).toISOString().slice(0, 10) !== record.date ||
        !Array.isArray(record.content))
    )
      throw new Error(`article/${record.slug}: invalid date/content`)
    for (const field of ['liveUrl', 'githubUrl', 'productUrl'])
      if (record[field] && !record[field].startsWith('https://'))
        throw new Error(`${kind}/${record.slug}: ${field} must be HTTPS`)
    for (const image of [
      record.coverImage,
      ...(record.screenshots ?? []),
    ].filter(Boolean)) {
      if (!image.src || !image.alt || !(image.width > 0) || !(image.height > 0))
        throw new Error(
          `${kind}/${record.slug}: image requires src, alt, width, and height`,
        )
      if (
        !(image.src.startsWith('/') && !image.src.startsWith('//')) &&
        !image.src.startsWith('https://')
      )
        throw new Error(
          `${kind}/${record.slug}: image must use a root-relative or HTTPS URL`,
        )
    }
    if (
      record.image &&
      (!record.alt || !(record.imageWidth > 0) || !(record.imageHeight > 0))
    )
      throw new Error(
        `${kind}/${record.slug}: project image requires alt text and intrinsic dimensions`,
      )
  }
}
export function validateContent() {
  validateRecords(
    SERVICES.map((service) => ({
      ...service,
      name: service.title,
      description: service.shortDescription,
    })),
    'service',
  )
  validateRecords(PRODUCTS, 'product')
  validateRecords(PROJECTS, 'project')
  validateRecords(ARTICLES, 'article')
}
