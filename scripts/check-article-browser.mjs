import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { startPreview } from './preview.mjs'
import { getArticle } from '../src/data/articles.js'
import { inlineText, articleWordCount } from '../src/utils/articles.js'
import { SITE_URL } from '../src/config.js'

const article = getArticle('ai-cybersecurity-php2shell')
const route = `/blog/${article.slug}`
const server = await startPreview(0, {
  assistantOptions: { env: { ASSISTANT_ENABLED: 'false' } },
})
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
})
await mkdir('.qa', { recursive: true })
const errors = [],
  results = []
try {
  const raw = await fetch(base + route)
  assert.equal(raw.status, 200)
  const html = await raw.text()
  assert.ok(html.includes('A dangerous bug does not always arrive'))
  assert.ok(
    html.includes('It isn&#x27;t the finish line.') ||
      html.includes("It isn't the finish line."),
  )
  assert.ok(!html.includes('&lt;FIGURE:'))
  const sitemap = await (await fetch(base + '/sitemap.xml')).text()
  assert.ok(
    sitemap.includes(`<loc>${SITE_URL}${route}</loc>`) &&
      sitemap.includes(`<loc>${SITE_URL}/blog</loc>`),
  )
  assert.equal(
    (await fetch(base + '/blog/definitely-not-an-article')).status,
    404,
  )
  const expectedParagraphs = article.content
    .filter((block) => block.type === 'p')
    .map((block) => inlineText(block.text))
  const expectedLinks = article.content.flatMap((block) =>
    [block.text, block.caption]
      .filter(Array.isArray)
      .flatMap((runs) =>
        runs.filter((run) => run.type === 'link').map((run) => run.href),
      ),
  )
  for (const [width, height] of [
    [320, 800],
    [375, 812],
    [768, 1024],
    [1440, 900],
    [2560, 1440],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: 'reduce',
    })
    const page = await context.newPage()
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (/hydration|did not match|server rendered/i.test(message.text()))
        errors.push(message.text())
    })
    assert.equal((await page.goto(base + route)).status(), 200)
    await page.evaluate(() => document.fonts.ready)
    assert.equal(await page.title(), article.seoTitle)
    assert.equal(await page.locator('h1').count(), 1)
    assert.equal(await page.locator('h1').innerText(), article.title)
    assert.deepEqual(
      await page.locator('.article__body > p').allTextContents(),
      expectedParagraphs,
    )
    assert.deepEqual(
      await page.locator('.article__body > h2').allTextContents(),
      article.content
        .filter((block) => block.type === 'h2')
        .map((block) => inlineText(block.text)),
    )
    assert.deepEqual(
      await page
        .locator('.article__body a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
      expectedLinks,
    )
    assert.equal(await page.locator('figure.article-figure').count(), 2)
    assert.equal(await page.locator('.article-cta').count(), 0)
    assert.equal(
      await page.locator('.article__return a[href="/blog"]').count(),
      1,
    )
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute('href'),
      `${SITE_URL}${route}`,
    )
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute('content'),
      'index, follow',
    )
    assert.equal(
      await page.locator('meta[property="og:image"]').getAttribute('content'),
      `${SITE_URL}${article.socialImage}`,
    )
    assert.equal(
      await page.locator('meta[name="twitter:image"]').getAttribute('content'),
      `${SITE_URL}${article.socialImage}`,
    )
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents()
    const schema = schemas
      .map(JSON.parse)
      .find((item) => item['@type'] === 'BlogPosting')
    assert.equal(schema.author['@type'], 'Organization')
    assert.equal(schema.author.name, 'Kryzect')
    assert.equal(schema.author.url, SITE_URL)
    assert.equal(schema.datePublished, article.date)
    assert.equal(schema.dateModified, undefined)
    assert.equal(schema.wordCount, articleWordCount(article.content))
    for (const figure of article.content.filter(
      (block) => block.type === 'figure',
    )) {
      const image = page.locator(`img[src="${figure.image.src}"]`)
      assert.equal(await image.getAttribute('loading'), 'lazy')
      assert.equal(await image.getAttribute('alt'), figure.image.alt)
      assert.equal(await image.isVisible(), width >= 1200)
      assert.equal(
        await page
          .locator(
            `figure[aria-labelledby="${figure.id}-caption"] .article-figure__text`,
          )
          .isVisible(),
        width < 1200,
      )
      assert.equal(
        (await context.request.get(base + figure.image.src)).status(),
        200,
      )
    }
    assert.equal(
      await page.locator('.article__image').getAttribute('loading'),
      'eager',
    )
    assert.equal(
      await page.locator('.article__image').getAttribute('fetchpriority'),
      'high',
    )
    assert.ok(
      await page
        .locator('.article__image')
        .evaluate(
          (image) =>
            image.complete &&
            image.naturalWidth === 1600 &&
            image.naturalHeight === 900,
        ),
    )
    const firstCitation = page.locator('.article__body a').first()
    await firstCitation.focus()
    assert.ok(
      await firstCitation.evaluate(
        (element) => element === document.activeElement,
      ),
    )
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await new Promise(requestAnimationFrame)
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    await page.screenshot({ path: `.qa/article-top-${width}.png` })
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Horizontal overflow at ${width}`,
    )
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    assert.deepEqual(
      axe.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
      [],
    )
    await page.screenshot({ path: `.qa/article-${width}.png`, fullPage: true })
    await page
      .locator('figure.article-figure')
      .first()
      .screenshot({ path: `.qa/article-timeline-${width}.png` })
    if (width === 375) {
      await page.evaluate(
        () => (document.documentElement.style.fontSize = '200%'),
      )
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        'Article must reflow at 200% text size',
      )
    }
    results.push({
      width,
      height,
      axeViolations: 0,
      staticParagraphs: expectedParagraphs.length,
      figureMode: width < 1200 ? 'stacked text' : 'SVG',
    })
    await context.close()
  }
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  })
  const page = await noJS.newPage()
  await page.goto(base + route)
  assert.deepEqual(
    await page.locator('.article__body > p').allTextContents(),
    expectedParagraphs,
  )
  assert.ok(await page.locator('.article-figure__text').first().isVisible())
  assert.equal(
    await page.locator('.article-figure__image--diagram').first().isVisible(),
    false,
  )
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    'Static article styles must work without JavaScript',
  )
  await page.goto(base + '/blog')
  assert.equal(await page.locator('.blog-card').count(), 1)
  assert.equal(await page.locator('.blog-filters').count(), 0)
  assert.ok((await page.locator('header a[href="/blog"]').count()) >= 1)
  assert.equal(await page.locator('footer a[href="/blog"]').count(), 1)
  assert.equal(await page.locator('a[href="/work"]').count(), 0)
  await page.locator('.blog-card__title a').click()
  assert.equal(new URL(page.url()).pathname, route)
  await noJS.close()
  assert.deepEqual(errors, [])
  const frozen = await readFile('docs/editorial/php2shell/ARTICLE.md', 'utf8')
  assert.ok(frozen.includes('CVE-2026-115560'))
  await writeFile(
    '.qa/article-browser-check.json',
    JSON.stringify(
      {
        passed: true,
        results,
        errors,
        noJavaScript: true,
        wordCount: articleWordCount(article.content),
        readingTime: article.readingTime,
      },
      null,
      2,
    ),
  )
  console.log(
    `Passed article checks at ${results.length} widths: frozen copy, inline citations, figures, 200% text, metadata/schema, sitemap, no-JS navigation and zero axe violations. ${articleWordCount(article.content)} words; ${article.readingTime}.`,
  )
} finally {
  await browser.close()
  await new Promise((resolve) => server.close(resolve))
}
