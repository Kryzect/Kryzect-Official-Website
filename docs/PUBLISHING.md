# Publishing website content

Identity and integrations live in `src/config.js`; publication/navigation policy in `src/data/site-map.js`; content in `src/data/`. HTML, canonicals, sitemap, and robots derive from these records. Never edit `dist/` by hand.

Work stays hidden until real projects exist. Blog navigation and indexing derive from the approved entries in `ARTICLES`; the first PHP2Shell article is integrated for local review. Industry details and Careers remain noindex until deliberately enabled. Drafts must not be placed in published arrays on a deployed release.

- Use unique lowercase hyphenated slugs, meaningful descriptions, and factual content.
- Articles require author, ISO date, category, reading time, supported content blocks, and public image paths with alt text and intrinsic dimensions. Article hero images load eagerly; cards load lazily.
- Projects require context, role, objective, approach, solution, challenges, and actual outcome. Supply genuine live/source/product links and optional screenshots/technologies. A product experiment is not client work.
- Publish only screenshots you may share; remove private data. Do not invent customers, metrics, quotes, qualifications, or team members.
- Keep available product capabilities separate from roadmap work. IncidentIQ remains a product experiment.

Run all checks after content additions. Review mobile layout, filters, links, dates, dimensions, raw metadata, indexability, sitemap, and social previews. Keep sales CTAs tied to content that exists. A small list does not need decorative filtering.

## Editorial article blocks

The existing article content model supports plain strings and typed inline arrays for paragraph, heading, list and quote text. Inline runs are `text`, `link`, `strong`, `em`, or `code`, each with `text`; links also require a safe HTTPS, root-relative, or fragment `href`. Raw HTML is never accepted or injected. Validation fails unsupported blocks and unsafe links before the build. Existing string blocks still render normally.

Use `figure` blocks with a unique `id`, an `image` containing `src`, `alt`, `width`, and `height`, and a visible `caption`. Optional `description` and labeled `items` supply accessible, readable alternatives for wide diagrams. Images with labeled alternatives display as stacked text below 1200px rather than shrinking diagram labels. Images reserve intrinsic space and supporting figures load lazily. Copy approved public assets into `public/images/articles/`; don't edit `dist`.

Set `authorType: 'Organization'` and a canonical `authorUrl` for a genuine organization byline. Blog posts use `BlogPosting` JSON-LD; `updated`/`dateModified` appear only for an actual later substantive revision. `seoTitle` overrides the document title while keeping the approved headline visible. `socialImage` can use the matching JPEG for social compatibility while the page uses WebP. Reading time is calculated at 220 words/minute from rendered prose, headings, list text and figure captions, excluding link URLs, image alt text and repeated diagram alternatives.

For a serious editorial feature, use `editorial: true` and `showCta: false` to replace the generic sales CTA with a quiet Blog link. Source archive and publication review notes for PHP2Shell live under `docs/editorial/php2shell/`; the approved Markdown remains intact as a transcription-test fixture. Run `npm run test:article:browser` after building. Keep actual publication date, research cutoff and later source checks distinct. If the review candidate is released after its configured date, update the publication date before deployment and recheck current source advisories. No automatic date changes on every build.
