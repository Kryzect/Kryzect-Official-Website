<p align="center">
  <img src="https://raw.githubusercontent.com/Kryzect/Kryzect-Official-Website/main/public/logo.png" alt="Kryzect logo" width="120" />
</p>

<h1 align="center">Kryzect</h1>

<p align="center">
  <strong>Think First. Build Better.</strong>
</p>

<p align="center">
  The official website for Kryzect — software engineering, AI, and automation
  built around what your business actually needs.
</p>

<p align="center">
  <a href="https://kryzect.vercel.app/" target="_blank" rel="noreferrer">Live Site</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="#scripts">Scripts</a>
  ·
  <a href="#project-structure">Project Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Live-kryzect.vercel.app-8FAEFF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live site" />
  <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-7.18.2-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/npm-11-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/Lint-Oxlint-8FAEFF?style=for-the-badge&logo=oxc&logoColor=white" alt="Oxlint" />
  <img src="https://img.shields.io/badge/CSS-Design_Tokens-8892AC?style=for-the-badge&logo=css&logoColor=white" alt="Design tokens" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Accessibility-WCAG_AA-0AA112?style=for-the-badge" alt="WCAG AA" />
  <img src="https://img.shields.io/badge/SEO-Schema_%2B_OG-8FAEFF?style=for-the-badge" alt="SEO" />
  <img src="https://img.shields.io/badge/Performance-255_kB-8FAEFF?style=for-the-badge" alt="Performance" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deployed on Vercel" />
</p>

---

## About

Kryzect works across the full technology stack — web and mobile applications,
SaaS products, AI systems, automation, APIs, cloud infrastructure,
e-commerce, and custom software.

The core idea, repeated everywhere on the site:

> Kryzect isn't interested in writing code simply because someone asked for
> code. Kryzect wants to understand what the code is supposed to accomplish.
>
> **Understand → Define → Design → Engineer → Deliver → Improve**

No fabricated clients, metrics, or testimonials. The site only shows what is
real: one founder, one product in development, and honest empty states for
work and blog until genuine content exists.

## Tech Stack

| Layer         | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | [Vite](https://vite.dev) + [React 19](https://react.dev) (JSX) |
| Routing       | [React Router 7](https://reactrouter.com)          |
| Styling       | Plain CSS + CSS custom properties (design tokens)  |
| Linting       | [Oxlint](https://oxc.rs)                           |
| Contact form  | [Web3Forms](https://web3forms.com) (client-side)   |
| Booking       | Google Calendar (embedded scheduler)               |
| Hosting       | [Vercel](https://vercel.com) (SPA rewrites)        |

The visual system lives in `src/styles/tokens.css` — a dark brand palette
(`#0A1120` background, `#8FAEFF` accent), 8pt spacing, radius and shadow
tokens. Typography: Bricolage Grotesque, Public Sans, JetBrains Mono.

## Getting Started

Requirements: **Node.js 24** and **npm 11**.

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# lint
npm run lint

# production build
npm run build

# preview the production build
npm run preview
```

## Scripts

| Script    | Description                                        |
| --------- | -------------------------------------------------- |
| `dev`     | Start the Vite dev server with HMR                 |
| `build`   | Production build into `dist/`                      |
| `preview` | Serve the production build locally                 |
| `lint`    | Run Oxlint over `src/`                             |

## Project Structure

```
src/
├── assets/          # static imports
├── components/      # Logo, Layout, Header, Footer, Button, Seo, ...
├── pages/           # Home, About, Services, Products, Blog, Contact, ...
├── data/            # site-map registry, services, products, articles, ...
├── styles/          # globals.css, shell.css, tokens.css
├── App.jsx          # route table (React.lazy + Suspense code splitting)
└── main.jsx         # entry point
public/              # logo.png, robots.txt, sitemap.xml
scripts/             # generate-sitemap.mjs
vercel.json          # SPA rewrites + trailingSlash config
```

`src/data/site-map.js` is the single source of truth for what appears in the
header, footer, and sitemap — flip a flag there to change visibility.

## Deployment

The site is deployed to **Vercel** at
[`https://kryzect.vercel.app/`](https://kryzect.vercel.app/).

- `vercel.json` rewrites all routes to `index.html` for SPA support.
- The sitemap is generated from the site registry:

```bash
node scripts/generate-sitemap.mjs
```

## Accessibility

- Semantic landmarks, one `<h1>` per page, real heading hierarchy.
- Visible focus states, skip-to-content link, keyboard-trappable mobile menu.
- WCAG AA contrast throughout the palette.
- Full `prefers-reduced-motion` support — the intro animation is skipped
  entirely under reduced motion.

## Contact

Reach out through the [contact form](https://kryzect.vercel.app/contact) or
[book a call](https://kryzect.vercel.app/book-a-call) on the live site.

---

<p align="center">
  <sub>Kryzect · Think First. Build Better.</sub>
</p>
