import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  PUBLIC_ROUTES,
  INDEXABLE_ROUTES,
} from '../src/data/published-routes.js'
import { isIndexable } from '../src/data/site-map.js'
import { formatDate, articleWordCount } from '../src/utils/articles.js'
import { validateRecords } from '../scripts/validate-content.mjs'

test('publication rejects unsafe slugs and incomplete images before build', () => {
  assert.throws(() =>
    validateRecords(
      [{ slug: '../bad', name: 'Name', description: 'Text' }],
      'product',
    ),
  )
  assert.throws(() =>
    validateRecords(
      [
        {
          slug: 'example',
          name: 'Name',
          description: 'Text',
          screenshots: [{ src: '/image.png' }],
        },
      ],
      'product',
    ),
  )
  assert.doesNotThrow(() =>
    validateRecords(
      [
        {
          slug: 'example',
          name: 'Name',
          description: 'Text',
          screenshots: [
            {
              src: '/image.png',
              alt: 'An actual product screen',
              width: 800,
              height: 600,
            },
          ],
        },
      ],
      'product',
    ),
  )
})
test('unknown paths and unfinished sections cannot be indexed', () => {
  for (const route of [
    '/unknown',
    '/services/unknown',
    '/products/missing',
    '/blog',
    '/work',
    '/industries/healthcare',
  ])
    assert.equal(isIndexable(route), false)
  assert.equal(isIndexable('/services/ai-solutions'), true)
  assert.equal(new Set(PUBLIC_ROUTES).size, PUBLIC_ROUTES.length)
  assert.ok(INDEXABLE_ROUTES.every((route) => PUBLIC_ROUTES.includes(route)))
})
test('article metadata is stable across time zones and includes lists', () => {
  assert.equal(formatDate('2026-10-26'), 'October 26, 2026')
  assert.equal(
    articleWordCount([{ text: 'One two' }, { items: ['three four', 'five'] }]),
    5,
  )
})
test('Vercel serves generated pages instead of a catch-all SPA rewrite', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'))
  assert.equal(config.cleanUrls, true)
  assert.equal(config.rewrites, undefined)
  const headers = config.headers[0].headers
  assert.ok(
    headers.some(
      (h) => h.key === 'X-Content-Type-Options' && h.value === 'nosniff',
    ),
  )
  assert.ok(
    headers.some((h) => h.key === 'Content-Security-Policy-Report-Only'),
  )
  assert.ok(
    !headers
      .find((h) => h.key === 'Content-Security-Policy-Report-Only')
      .value.includes('upgrade-insecure-requests'),
  )
})
