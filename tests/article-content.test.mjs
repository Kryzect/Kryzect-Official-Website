import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { ARTICLES } from '../src/data/articles.js'
import {
  inlineText,
  articleWordCount,
  articleReadingTime,
  isSafeArticleHref,
} from '../src/utils/articles.js'
import { validateArticleBlocks } from '../scripts/validate-content.mjs'

const article = ARTICLES.find(
  (entry) => entry.slug === 'ai-cybersecurity-php2shell',
)
const stripInline = (text) =>
  text
    .replace(/\[([^\]]+)\]\(https:\/\/[^\s)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')

test('PHP2Shell transfer preserves frozen paragraphs, headings, citations and figure positions', async () => {
  const source = (await readFile('docs/editorial/php2shell/ARTICLE.md', 'utf8'))
    .trim()
    .split(/\n\s*\n/)
  assert.equal(source[0], `# ${article.title}`)
  assert.equal(source[1], `*${article.subtitle}*`)
  assert.equal(source.length - 2, article.content.length)
  source.slice(2).forEach((text, index) => {
    const block = article.content[index]
    if (text.startsWith('<FIGURE: ')) {
      assert.equal(block.type, 'figure')
      assert.ok(
        block.image.src.endsWith(
          text.includes('four-clocks')
            ? 'four-clocks.svg'
            : 'php2shell-timeline.svg',
        ),
      )
    } else if (text === '---') assert.equal(block.type, 'hr')
    else {
      assert.equal(block.type, text.startsWith('## ') ? 'h2' : 'p')
      assert.equal(
        inlineText(block.text),
        stripInline(text.replace(/^## /, '')),
      )
      const sourceLinks = [
        ...text.matchAll(/\[[^\]]+\]\((https:\/\/[^\s)]+)\)/g),
      ].map((match) => match[1])
      assert.deepEqual(
        Array.isArray(block.text)
          ? block.text
              .filter((part) => part.type === 'link')
              .map((part) => part.href)
          : [],
        sourceLinks,
      )
    }
  })
  assert.equal(article.content.filter((block) => block.type === 'h2').length, 6)
  assert.equal(
    article.content.filter((block) => block.type === 'figure').length,
    2,
  )
  assert.equal(article.author, 'Kryzect')
  assert.equal(article.authorType, 'Organization')
  assert.equal(article.updated, undefined)
  assert.equal(article.showCta, false)
  assert.equal(article.readingTime, articleReadingTime(article.content))
  assert.ok(articleWordCount(article.content) > 1900)
})

test('inline runs count visible words without URLs or object labels', () => {
  const blocks = [
    {
      type: 'p',
      text: [
        { type: 'text', text: 'One ' },
        {
          type: 'link',
          text: 'two three',
          href: 'https://example.com/extra-words',
        },
        { type: 'strong', text: ' four' },
      ],
    },
    { type: 'list', items: ['five', [{ type: 'em', text: 'six seven' }]] },
    {
      type: 'figure',
      caption: 'eight nine',
      items: [{ label: 'Repeated', text: 'Not counted twice' }],
    },
  ]
  assert.equal(articleWordCount(blocks), 9)
  assert.equal(articleReadingTime(blocks), '1 min read')
})

test('article content rejects executable links, unsafe images, duplicate figure IDs and raw HTML blocks', () => {
  for (const href of [
    'javascript:alert(1)',
    'data:text/html,bad',
    '//evil.example',
    '/\\evil.example',
    'https://name:password@example.com',
    'https://example.com\n',
    'mailto:person@example.com',
    'https://',
  ])
    assert.equal(isSafeArticleHref(href), false, href)
  for (const href of [
    'https://www.php.net/archive/2026.php',
    '/blog',
    '#references',
  ])
    assert.equal(isSafeArticleHref(href), true)
  assert.throws(() =>
    validateArticleBlocks([
      {
        type: 'p',
        text: [{ type: 'link', text: 'unsafe', href: 'javascript:alert(1)' }],
      },
    ]),
  )
  assert.throws(() =>
    validateArticleBlocks([
      { type: 'html', text: '<script>alert(1)</script>' },
    ]),
  )
  assert.throws(() =>
    validateArticleBlocks([
      {
        type: 'figure',
        id: 'bad',
        image: { src: '/image.svg' },
        caption: 'Missing metadata',
      },
    ]),
  )
  const figure = article.content.find((block) => block.type === 'figure')
  assert.throws(() => validateArticleBlocks([figure, figure]))
  assert.doesNotThrow(() =>
    validateArticleBlocks([
      { type: 'p', text: 'Existing plain text' },
      { type: 'h2', text: 'Heading' },
      { type: 'list', items: ['Item'] },
      { type: 'quote', text: 'Quote' },
    ]),
  )
})
