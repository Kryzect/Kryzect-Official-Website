# Publishing website content

Identity and integrations live in `src/config.js`; publication/navigation policy in `src/data/site-map.js`; content in `src/data/`. HTML, canonicals, sitemap, and robots derive from these records. Never edit `dist/` by hand.

Work and Blog are empty by design. Navigation/previews become eligible when real entries are added. Industry details and Careers remain noindex until deliberately enabled. Drafts must not be placed in published arrays.

- Use unique lowercase hyphenated slugs, meaningful descriptions, and factual content.
- Articles require author, ISO date, category, reading time, supported content blocks, and public image paths with alt text and intrinsic dimensions. Article hero images load eagerly; cards load lazily.
- Projects require context, role, objective, approach, solution, challenges, and actual outcome. Supply genuine live/source/product links and optional screenshots/technologies. A product experiment is not client work.
- Publish only screenshots you may share; remove private data. Do not invent customers, metrics, quotes, qualifications, or team members.
- Keep available product capabilities separate from roadmap work. IncidentIQ remains a product experiment.

Run all checks after content additions. Review mobile layout, filters, links, dates, dimensions, raw metadata, indexability, sitemap, and social previews. Keep sales CTAs tied to content that exists. A small list does not need decorative filtering.
