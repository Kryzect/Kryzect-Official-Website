import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { startPreview } from './preview.mjs'
import {
  PUBLIC_ROUTES,
  INDEXABLE_ROUTES,
} from '../src/data/published-routes.js'
import { SITE_URL } from '../src/config.js'

await mkdir('.qa', { recursive: true })
const server = await startPreview(0)
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
})
const results = []
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  // Never permit automated checks to send real enquiries.
  await context.route('https://api.web3forms.com/submit', (route) =>
    route.abort('blockedbyclient'),
  )
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of PUBLIC_ROUTES) {
      const response = await page.goto(base + route)
      await page.locator('main h1').waitFor({ state: 'visible' })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(80)
      await page.evaluate(async () => {
        for (
          let y = 0;
          y < document.documentElement.scrollHeight;
          y += innerHeight
        ) {
          window.scrollTo(0, y)
          await new Promise((done) => requestAnimationFrame(done))
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
      assert.equal(response.status(), 200, route)
      assert.equal(await page.locator('h1').count(), 1, route)
      const canonical = await page
        .locator('link[rel=canonical]')
        .getAttribute('href')
      assert.equal(canonical, new URL(route, SITE_URL).href)
      assert.equal(await page.locator('meta[name=robots]').count(), 1)
      const indexable = INDEXABLE_ROUTES.includes(route)
      assert.equal(
        (
          await page.locator('meta[name=robots]').getAttribute('content')
        ).startsWith('noindex'),
        !indexable,
      )
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
      }))
      assert.ok(layout.scrollWidth <= width, `${route}: overflow at ${width}`)
      assert.equal(
        new Set(layout.ids).size,
        layout.ids.length,
        `${route}: duplicate IDs`,
      )
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
      results.push({
        route,
        width,
        height: layout.height,
        violations: axe.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      })
      console.log(
        `${width} ${route}: ${axe.violations.length} accessibility violations`,
      )
      assert.equal(
        axe.violations.length,
        0,
        `${route} ${width}: ${JSON.stringify(results.at(-1).violations)}`,
      )
      if (
        ['/', '/contact', '/services', '/products/ai-postmortem'].includes(
          route,
        )
      )
        await page.screenshot({
          path: `.qa/${width}-${route.replaceAll('/', '_')}.png`,
          fullPage: true,
        })
    }
  }
  for (const route of ['/missing', '/services/missing', '/missing.js'])
    assert.equal((await page.request.get(base + route)).status(), 404)
  const raw = await (
    await page.request.get(base + '/services/ai-solutions')
  ).text()
  assert.match(raw, /<h1/)
  assert.ok(!raw.includes('<div hidden'))
  assert.match(
    raw,
    /canonical" href="https:\/\/kryzect.vercel.app\/services\/ai-solutions/,
  )
  const noJS = await browser.newContext({ javaScriptEnabled: false })
  const plain = await noJS.newPage()
  await plain.goto(base + '/contact')
  assert.ok(await plain.locator('main h1').isVisible())
  assert.ok(
    await plain.getByRole('button', { name: 'Send Message' }).isDisabled(),
  )
  assert.equal(await plain.locator('form').getAttribute('method'), 'post')
  assert.ok(
    (await plain.locator('body').innerText()).includes('ali.kryzect@gmail.com'),
  )
  for (const route of PUBLIC_ROUTES) {
    await plain.goto(base + route)
    assert.ok(
      await plain.locator('main h1').isVisible(),
      `No-JavaScript content missing: ${route}`,
    )
  }
  await noJS.close()
  await page.goto(base + '/')
  assert.equal(await page.locator('a[href="/work"]').count(), 0)
  const snapshot = () =>
    page.evaluate(() => {
      const selectors = [
        '.home-journey li',
        '.home-journey h3',
        '.home-hero h1',
        '.capability',
      ]
      return selectors.map((selector) => {
        const css = getComputedStyle(document.querySelector(selector))
        return [
          selector,
          css.padding,
          css.fontSize,
          css.backgroundColor,
          css.display,
        ]
      })
    })
  const before = await snapshot()
  for (const target of ['/process', '/products/ai-postmortem', '/services']) {
    await page.locator(`main a[href="${target}"]`).first().click()
    await page.waitForURL(base + target)
    await page.locator('main .page-hero').waitFor()
    await page.getByRole('link', { name: 'Kryzect home' }).click()
    await page.waitForURL(base + '/')
    await page.locator('.home-hero').waitFor()
    assert.deepEqual(await snapshot(), before)
  }
  await page.setViewportSize({ width: 390, height: 568 })
  await page.getByRole('button', { name: 'Open menu' }).click()
  assert.ok(
    await page
      .locator('#site-mobile-menu')
      .evaluate((el) => el.getBoundingClientRect().bottom <= innerHeight + 1),
  )
  await page.locator('.site-mobile-menu__cta').scrollIntoViewIfNeeded()
  await page.keyboard.press('Escape')
  await page.waitForFunction(
    () =>
      document.activeElement === document.querySelector('.site-header__toggle'),
  )
  assert.equal(
    await page
      .getByRole('button', { name: 'Open menu' })
      .evaluate((el) => el === document.activeElement),
    true,
  )
  await page.goto(base + '/contact#form')
  await page.waitForFunction(() => {
    const target = document.querySelector('#form')
    if (!target) return false
    const top = target.getBoundingClientRect().top
    return top >= 60 && top < 200
  })
  assert.ok(
    await page
      .locator('#form')
      .evaluate(
        (el) =>
          el.getBoundingClientRect().top >= 60 &&
          el.getBoundingClientRect().top < 200,
      ),
  )
  await page.getByRole('button', { name: 'Send Message' }).click()
  // Validation focuses the first invalid field on the next animation frame.
  // A completed click does not guarantee that frame has run on a busy runner.
  await page.waitForFunction(
    () => document.activeElement === document.querySelector('#name'),
  )
  assert.equal(
    await page.locator('#name').evaluate((el) => el === document.activeElement),
    true,
  )
  await page.locator('#name').fill('Test Person')
  await page.locator('#email').fill('person@example.com')
  await page.locator('#goal').fill('Mocked enquiry only')
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: '{"success":false}',
    }),
  )
  await page.getByRole('button', { name: 'Send Message' }).click()
  await page
    .getByRole('status')
    .filter({ hasText: 'could not be confirmed' })
    .waitFor()
  assert.equal(await page.locator('#goal').inputValue(), 'Mocked enquiry only')
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"success":true}',
    }),
  )
  await page.getByRole('button', { name: 'Send Message' }).click()
  await page
    .getByRole('status')
    .filter({ hasText: 'accepted for delivery' })
    .waitFor()
  assert.equal(await page.locator('#goal').inputValue(), '')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(base + '/')
  assert.equal(
    await page
      .locator('.track-outer-base')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
    'none',
  )
  assert.equal(errors.length, 0, errors.join('\n'))
  await writeFile(
    '.qa/browser-check.json',
    JSON.stringify({ pages: results, errors }, null, 2),
  )
  console.log(
    `Passed ${results.length} route/viewport checks, raw HTML/status checks, and critical interactions.`,
  )
} finally {
  await writeFile('.qa/browser-progress.json', JSON.stringify(results, null, 2))
  await browser.close()
  await new Promise((done) => server.close(done))
}
