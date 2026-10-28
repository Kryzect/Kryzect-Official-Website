import { SERVICES } from '../src/data/services-catalog.js'
import { PRODUCTS } from '../src/data/products.js'
import { PROJECTS } from '../src/data/projects.js'
import { ARTICLES, CONTENT_BLOCK_TYPES } from '../src/data/articles.js'
import { inlineText, isSafeArticleHref } from '../src/utils/articles.js'

function validateInline(value) {
  if (typeof value === 'string') return
  if (!Array.isArray(value) || !value.length)
    throw new Error(
      'Article inline content must be text or a nonempty inline array',
    )
  for (const part of value) {
    if (
      !part ||
      !['text', 'link', 'strong', 'em', 'code'].includes(part.type) ||
      typeof part.text !== 'string' ||
      (part.type === 'link' && !isSafeArticleHref(part.href))
    )
      throw new Error('Invalid or unsafe article inline content')
  }
}

function validateImage(image) {
  if (
    !image ||
    !image.alt?.trim() ||
    !(image.width > 0) ||
    !(image.height > 0) ||
    !isSafeArticleHref(image.src) ||
    image.src.startsWith('#')
  )
    throw new Error(
      'Article figure requires a safe image, alt text and intrinsic dimensions',
    )
}

export function validateArticleBlocks(blocks) {
  const figureIds = new Set()
  for (const block of blocks) {
    if (!block || !CONTENT_BLOCK_TYPES.includes(block.type))
      throw new Error('Unsupported article content block')
    if (block.type === 'hr') continue
    if (block.type === 'figure') {
      if (!/^[a-z][a-z0-9-]*$/.test(block.id) || figureIds.has(block.id))
        throw new Error('Article figures need unique valid IDs')
      figureIds.add(block.id)
      validateImage(block.image)
      validateInline(block.caption)
      if (!inlineText(block.caption).trim())
        throw new Error('Article figure needs a caption')
      if (
        block.description !== undefined &&
        typeof block.description !== 'string'
      )
        throw new Error('Invalid figure description')
      if (
        block.items !== undefined &&
        (!Array.isArray(block.items) ||
          block.items.some(
            (item) =>
              !item ||
              typeof item.label !== 'string' ||
              typeof item.text !== 'string' ||
              !item.label.trim() ||
              !item.text.trim(),
          ))
      )
        throw new Error('Invalid figure text alternative')
    } else if (block.type === 'list') {
      if (!Array.isArray(block.items) || !block.items.length)
        throw new Error('Article list needs items')
      block.items.forEach(validateInline)
    } else {
      validateInline(block.text)
      if (!inlineText(block.text).trim())
        throw new Error('Article text cannot be empty')
    }
  }
}

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
    if (kind === 'article') {
      validateArticleBlocks(record.content)
      if (
        record.authorType &&
        !['Person', 'Organization'].includes(record.authorType)
      )
        throw new Error('Invalid article author type')
      if (record.authorUrl && !isSafeArticleHref(record.authorUrl))
        throw new Error('Invalid article author URL')
      if (
        record.updated &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(record.updated) ||
          new Date(record.updated).toISOString().slice(0, 10) !==
            record.updated ||
          record.updated <= record.date)
      )
        throw new Error('Article updated date must be a real later revision')
    }
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
