import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { startPreview } from './preview.mjs'

await mkdir('.qa', { recursive: true })
const providerCalls = []
const server = await startPreview(0, {
  assistantOptions: {
    env: { GEMINI_API_KEY: 'mock-browser-primary' },
    fetchImpl: async (_url, options) => {
      providerCalls.push(JSON.parse(options.body))
      return Response.json({
        candidates: [
          {
            finishReason: 'STOP',
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    disposition: 'answer',
                    answer:
                      'Kryzect can help explore an automation workflow. Which systems do you use?',
                    sourceIds: ['service-automation'],
                    actionIds: ['contact'],
                  }),
                },
              ],
            },
          },
        ],
      })
    },
  },
})
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
})
const results = [],
  errors = []
try {
  const context = await browser.newContext()
  const page = await context.newPage()
  page.on('pageerror', (error) => errors.push(error.message))
  let panelChunks = 0
  page.on('request', (request) => {
    if (/AssistantPanel-.*\.js/.test(request.url())) panelChunks++
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(base + '/services')
  await page.getByRole('button', { name: 'Open Kryzect Assistant' }).waitFor()
  assert.equal(panelChunks, 0, 'Chat code must load on demand')

  for (const [width, height] of [
    [1440, 900],
    [390, 844],
    [320, 568],
    [768, 900],
    [2560, 1440],
    [3440, 1440],
    [3840, 2160],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height })
    await page.goto(base + '/services')
    await page.getByRole('button', { name: 'Open Kryzect Assistant' }).click()
    const panel = page.locator('#kryzect-assistant')
    await page.locator('#assistant-message').waitFor()
    await page.evaluate(() => document.fonts.ready)
    const shape = await panel.evaluate((element) => {
      const rect = element.getBoundingClientRect(),
        input = element.querySelector('textarea').getBoundingClientRect()
      return {
        x: rect.x,
        y: rect.y,
        right: rect.right,
        bottom: rect.bottom,
        inputBottom: input.bottom,
        scrollWidth: document.documentElement.scrollWidth,
      }
    })
    assert.ok(
      shape.x >= 0 &&
        shape.y >= 0 &&
        shape.right <= width + 1 &&
        shape.bottom <= height + 1,
      `Panel out of viewport at ${width}x${height}`,
    )
    assert.ok(
      shape.inputBottom <= shape.bottom + 1,
      `Composer clipped at ${width}x${height}`,
    )
    assert.ok(shape.scrollWidth <= width)
    if (width >= 768 && height >= 768) {
      const compact = await page.evaluate(() => {
        const footer = document
          .querySelector('.assistant-footer')
          .getBoundingClientRect()
        const input = document
          .querySelector('#assistant-message')
          .getBoundingClientRect()
        const send = document
          .querySelector('.assistant-send')
          .getBoundingClientRect()
        const clear = document
          .querySelector('.assistant-clear')
          .getBoundingClientRect()
        const messages = document
          .querySelector('.assistant-messages')
          .getBoundingClientRect()
        return {
          footerHeight: footer.height,
          inputHeight: input.height,
          sameRow:
            send.left >= input.right &&
            Math.abs(
              send.top + send.height / 2 - (input.top + input.height / 2),
            ) < 2 &&
            Math.abs(
              clear.top + clear.height / 2 - (input.top + input.height / 2),
            ) < 2,
          conversationHeight: messages.height,
        }
      })
      assert.ok(
        compact.footerHeight < 165,
        'Desktop footer should stay compact',
      )
      assert.ok(
        compact.inputHeight >= 62 &&
          compact.inputHeight <= 66 &&
          compact.sameRow,
        'Desktop two-line input and both buttons should share one row',
      )
      assert.ok(
        compact.conversationHeight > compact.footerHeight * 2,
        'Conversation should occupy most of the window',
      )
      await page
        .locator('#assistant-message')
        .fill('A website for our business.\nWith customer bookings.')
      assert.ok(
        await page
          .locator('#assistant-message')
          .evaluate(
            (element) => element.scrollHeight <= element.clientHeight + 1,
          ),
        'Two reasonable lines should be visible without scrolling',
      )
      await page.locator('#assistant-message').fill('')
    }
    assert.notEqual(
      await page
        .locator('.assistant-messages')
        .evaluate((element) => getComputedStyle(element).scrollbarColor),
      'auto',
      'Chat scrollbars should use explicit theme colors',
    )
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    assert.equal(
      axe.violations.length,
      0,
      JSON.stringify(
        axe.violations.map((item) => ({
          id: item.id,
          targets: item.nodes.map((node) => node.target),
        })),
      ),
    )
    results.push({ width, height, violations: axe.violations.length, shape })
    if ([390, 1440].includes(width))
      await page.screenshot({ path: `.qa/assistant-${width}.png` })
    await page.keyboard.press('Escape')
    await page.waitForFunction(
      () =>
        document.activeElement?.getAttribute('aria-label') ===
        'Open Kryzect Assistant',
    )
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base + '/services')
  await page.getByRole('button', { name: 'Open Kryzect Assistant' }).click()
  const composer = page.locator('#assistant-message')
  await page.getByText('18+ by sending.', { exact: false }).waitFor()
  await composer.fill('We copy orders between spreadsheets. Can you help?')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page
    .getByText(
      'Kryzect can help explore an automation workflow. Which systems do you use?',
      { exact: true },
    )
    .waitFor()
  assert.equal(providerCalls.length, 1)
  assert.ok(
    await page
      .locator('.assistant-sources a[href="/services/automation"]')
      .isVisible(),
  )
  assert.ok(
    await page.locator('.assistant-actions a[href="/contact"]').isVisible(),
  )
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Open Kryzect Assistant' }).click()
  assert.equal(
    await page.locator('.assistant-message').count(),
    2,
    'Close/reopen preserves dialogue',
  )
  const close = page.getByRole('button', { name: 'Close assistant' })
  await close.focus()
  await page.keyboard.press('Shift+Tab')
  assert.ok(
    await page
      .locator('#kryzect-assistant')
      .evaluate((element) => element.contains(document.activeElement)),
  )
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()
  assert.equal(await page.locator('.assistant-message').count(), 0)

  let failures = 0
  let releaseReply
  const replyGate = new Promise((resolve) => {
    releaseReply = resolve
  })
  await page.route('**/api/assistant', async (route) => {
    await replyGate
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        answer: 'Choose a time on the booking page.',
        sources: [{ label: 'Book a free call', href: '/book-a-call' }],
        actions: [],
      }),
    })
  })
  const previewStarted = Date.now()
  await composer.fill('How can I book a call?')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page
    .getByText('Saved source · AI reply loading', { exact: true })
    .waitFor()
  assert.ok(
    Date.now() - previewStarted < 5000,
    'Useful saved information should appear before a slow provider finishes',
  )
  assert.ok(
    (await page.locator('.assistant-message--assistant').innerText()).includes(
      'Google Calendar',
    ),
  )
  assert.ok(await page.locator('.assistant-pending').isVisible())
  releaseReply()
  await page
    .getByText('Choose a time on the booking page.', { exact: true })
    .waitFor()
  assert.equal(
    await page.locator('.assistant-message--assistant').count(),
    1,
    'AI reply replaces the temporary source preview',
  )
  await page.unroute('**/api/assistant')
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()

  await page.route('**/api/assistant', async (route) => {
    failures++
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: '{"error":"unavailable"}',
    })
  })
  const hostile = '<img src=x onerror=alert(1)> Please discuss my project.'
  await composer.fill(hostile)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.getByRole('button', { name: 'Retry message' }).waitFor()
  assert.equal(await page.locator('.assistant-message--user').count(), 1)
  assert.equal(await page.locator('.assistant-message img').count(), 0)
  assert.ok(
    (await page.locator('.assistant-message--user').innerText()).includes(
      hostile,
    ),
  )
  await page.getByRole('button', { name: 'Retry message' }).click()
  await page.waitForFunction(
    () => !document.querySelector('.assistant-pending'),
  )
  assert.equal(failures, 2)
  assert.equal(
    await page.locator('.assistant-message--user').count(),
    1,
    'Retry must not duplicate the user message',
  )
  await page.unroute('**/api/assistant')
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()

  await page.route('**/api/assistant', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }),
  )
  await composer.fill('Who is the founder?')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page
    .getByText('Saved source answer · AI unavailable', { exact: true })
    .waitFor()
  assert.ok(
    (await page.locator('.assistant-message--assistant').innerText()).includes(
      'Muhammad Ali Aamir',
    ),
  )
  await page.unroute('**/api/assistant')
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()

  await page.route('**/api/assistant', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    await route.fulfill({ status: 503, body: '{}' }).catch(() => {})
  })
  await composer.fill('A request to cancel')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.getByRole('button', { name: 'Stop reply' }).click()
  await page
    .getByText('Reply stopped. Your message is kept here so you can retry.')
    .waitFor()
  await page.unroute('**/api/assistant')
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()

  await page.route('**/api/assistant', (route) =>
    route.fulfill({
      status: 429,
      headers: { 'Retry-After': '2' },
      contentType: 'application/json',
      body: '{}',
    }),
  )
  await composer.fill('Test quota handling')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.getByRole('button', { name: 'Retry message' }).waitFor()
  assert.ok(
    await page.getByRole('button', { name: 'Retry message' }).isDisabled(),
  )
  await page.getByRole('button', { name: 'Clear chat', exact: true }).click()
  await composer.fill('Clearing must not reset my quota')
  assert.ok(
    await page
      .getByRole('button', { name: 'Send message', exact: true })
      .isDisabled(),
  )
  await page.waitForFunction(
    () => !document.querySelector('.assistant-send').disabled,
  )
  await page.unroute('**/api/assistant')

  const sourcePage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  })
  let sourcePosts = 0
  await sourcePage.route('**/api/assistant**', async (route) => {
    if (route.request().method() === 'POST') sourcePosts++
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ aiEnabled: false }),
    })
  })
  await sourcePage.goto(base + '/services')
  await sourcePage
    .getByRole('button', { name: 'Open Kryzect Assistant' })
    .click()
  await sourcePage.locator('#assistant-message').fill('How can I book a call?')
  await sourcePage
    .getByRole('button', { name: 'Send message', exact: true })
    .click()
  await sourcePage.getByText('Saved source answer', { exact: true }).waitFor()
  assert.ok(
    (
      await sourcePage.locator('.assistant-message--assistant').innerText()
    ).includes('Google Calendar'),
  )
  assert.equal(
    sourcePosts,
    0,
    'Source-only mode must answer without sending chat messages to the server',
  )
  assert.equal(await sourcePage.locator('.assistant-pending').count(), 0)
  await sourcePage.close()

  const noJS = await browser.newPage({ javaScriptEnabled: false })
  await noJS.goto(base + '/services')
  assert.ok(await noJS.locator('main h1').isVisible())
  assert.equal(
    await noJS
      .getByRole('button', { name: 'Open Kryzect Assistant' })
      .isVisible(),
    false,
  )
  const broken = await browser.newPage({
    viewport: { width: 390, height: 844 },
  })
  await broken.route('**/assets/AssistantPanel-*.js', (route) => route.abort())
  await broken.goto(base + '/services')
  await broken.getByRole('button', { name: 'Open Kryzect Assistant' }).click()
  await broken
    .getByText('The chat could not load. You can still reach us directly.')
    .waitFor()
  assert.ok(
    await broken.locator('.assistant-loading a[href="/contact"]').isVisible(),
  )
  await broken.keyboard.press('Escape')
  assert.ok(await broken.locator('main h1').isVisible())
  assert.deepEqual(errors, [])
  await writeFile(
    '.qa/assistant-browser-check.json',
    JSON.stringify(
      {
        kind: 'mocked provider/browser regression; not a live semantic evaluation',
        layouts: results,
        lazyLoading: true,
        requestRetryStopQuota: true,
        noJS: true,
        failedChunkRecovery: true,
        errors,
      },
      null,
      2,
    ),
  )
  console.log(
    `Passed ${results.length} assistant layouts with zero axe violations; lazy loading, real handler/mocked provider, focus, history, safe text, retry, cancellation, quota, no-JS and failed-chunk recovery. No real model calls.`,
  )
} finally {
  await browser.close()
  await new Promise((done) => server.close(done))
}
