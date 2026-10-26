# Kryzect

**Think First. Build Better.**

The website for Kryzect, a founder-led software engineering and AI company based in Lahore, Pakistan.

[Website](https://kryzect.vercel.app/) · [Contact](https://kryzect.vercel.app/contact)

## Development

Use Node.js 24. Install with `npm ci`, then `npm run dev`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Client build, static HTML, sitemap, and robots |
| `npm run preview` | Static production preview on 127.0.0.1:4173 |
| `npm run lint` | Oxlint, with warnings treated as failures |
| `npm test` | Form, metadata, and publication checks |
| `npm run test:browser` | Chromium, axe, layout, and intercepted enquiry checks |
| `npm run check` | Lint, unit checks, and production build |
| `npm run format:check` | Source formatting check |

For browser checks, run `npx playwright install chromium` once or set `CHROME_PATH` to an existing Chrome executable. CI installs Chromium. No extra browser download is needed when system Chrome is available.

## Architecture

React 19 and React Router provide components and client navigation. Vite builds the client and a temporary server bundle; React renders known routes to static HTML. There is no production rendering server. Vercel serves clean static URLs and a custom 404.

- `src/config.js`: public identity and integration settings.
- `src/data/`: content records and publication policy.
- `src/components/`: shell, forms, metadata, and shared presentation.
- `src/styles/`: tokens and one shared page cascade, loaded once.
- `scripts/`: build, generation, preview, and browser checks.
- `tests/`: form and publication regression checks.

Fonts are served locally from Fontsource packages under their bundled licenses. `public/share-card.png` is a generated brand asset. To regenerate it, select a browser as above and run `node scripts/generate-share-card.mjs`.

Contact uses Web3Forms. Its access key is public by design; private credentials never belong in the client. Booking opens Google Calendar appointment scheduling, rather than embedding a calendar. No visitor analytics are configured.

## Quality and operations

WCAG 2.2 AA is a working target, not an independent certification. Automated axe checks supplement keyboard and visual testing. Dated performance results belong in verification records, not permanent score badges.

See [operations](docs/OPERATIONS.md) and [publishing](docs/PUBLISHING.md).

Work and Blog remain unpublished until genuine content is ready. Account checks and live deployment verification are recorded separately from repository tests.
