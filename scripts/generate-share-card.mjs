import { chromium } from 'playwright'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { SITE_NAME } from '../src/config.js'

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const font = await readFile(
    'node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff2',
  )
  const image = await readFile('public/logo.png')
  const logo = `<img src="data:image/png;base64,${image.toString('base64')}" width="64" height="64" alt="">`
  const html = `<!doctype html><style>@font-face{font-family:Brand;src:url(data:font/woff2;base64,${font.toString('base64')})}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#0a1120;color:#f5f7ff;font-family:Brand,Arial;padding:70px 80px;position:relative}header{display:flex;align-items:center;gap:18px;font-size:32px}header img{width:64px;height:64px}h1{font-size:82px;line-height:1.04;letter-spacing:-3px;margin:65px 0 24px}p{font-size:27px;color:#a0aac0}footer{position:absolute;right:80px;bottom:65px;color:#8faeff;font-size:23px}</style><header>${logo}${SITE_NAME}</header><h1>Think First.<br>Build Better.</h1><p>Software engineering · AI · Automation</p><footer>Clarity Before Code.</footer>`
  await mkdir('.qa', { recursive: true })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/share-card.png' })
  await writeFile('.qa/share-card-source.html', html)
} finally {
  await browser.close()
}
