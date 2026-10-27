# Assistant setup and operations

Implementation/source contract: [plan](ASSISTANT_IMPLEMENTATION_PLAN.md). The assistant runs through a server endpoint, not direct browser-to-model requests.

## Local development

1. `.env` is ignored. Add `GEMINI_API_KEY` and `OPENROUTER_API_KEY` there; never paste keys into source or chat messages. `.env.example` documents blank variable names and safe defaults.
2. Start `npm run dev`. Vite supplies the local `/api/assistant` handler. Restart the dev server after changing environment variables.
3. For production output locally, run `npm run build` and `npm run preview`. The custom loopback preview also supports the API and loads local `.env` configuration. `vite preview` alone does not replace this script.
4. The panel starts ready for immediate local answers. A no-store `GET /api/assistant?config=1` returns only a public readiness boolean and request ID, never credentials. With no model credentials, disabled AI, missing production limiter configuration, or a failed readiness check, messages are answered locally without a chat POST, labeled “Saved source answer.” Configured AI activates after the readiness check. Restart local servers after environment changes; redeploy on Vercel after changing its environment. `ASSISTANT_ENABLED=false` forces local-only operation even when keys are present.
5. With AI configured, exhausted providers, network failure, and timeout produce “Saved source answer · AI unavailable.” Both source paths use reviewed public site facts with simple topic matching and limited explicit follow-up context, not semantic AI. Unmatched questions receive an honest limitation and source/contact links. Stop, invalid requests, and quota responses keep their explicit states. No secrets are needed for source answers; they do not establish that live AI is enabled.

The default primary is `gemini-3.5-flash-lite`, documented by Google with a free tier. The fallback is a pinned OpenRouter `:free` model. Paid OpenRouter model IDs are rejected before requests, and provider input/output price caps are zero. Gemini accepts only reviewed free-tier-eligible model IDs; use an unbilled Google project to remain on the free tier because API requests cannot override billing settings. No automatic paid upgrade is attempted. Model availability and free quotas are not guaranteed; test the specific account and model before release.

`ASSISTANT_OPENROUTER_DATA_COLLECTION=deny` is the strict default. Some free routes reject it. Setting `allow` permits the selected provider's disclosed policies; do so deliberately after reviewing them and the visitor notice. The setting does not override account-level privacy restrictions. No arbitrary free-model router is used.

## Vercel production

Configure secrets in the project's Vercel environment settings, including the appropriate Preview/Production environments. Local `.env` is not uploaded by Git.

Required:

- At least one configured model key; configure both for primary/fallback operation.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from an Upstash Redis database. These are shared server-side abuse counters, not chat storage.
- Optional model overrides matching the tested account configuration.

Set provider account budget limits and alerts. Review Google paid/unpaid data terms and OpenRouter/provider training/retention settings before public use. The application requests OpenRouter providers that deny data collection, but does not promise provider-side zero retention.

The function is `api/assistant.js`, with a 40-second maximum in `vercel.json`. It accepts same-origin JSON POSTs. No new SPA rewrite is needed. Canonical, current Vercel deployment, and branch deployment origins are allowed; add an exact HTTPS custom origin through comma-separated `ASSISTANT_ALLOWED_ORIGINS` when needed. No browser provider keys, cross-origin API allowance, or external scripts are required.

The UI states adult use (18+) and the server requires that acknowledgement, without collecting age or birth date. It is not age verification or a compliance certification. Google free-service terms also restrict regions. `server/assistant/eligibility.mjs` uses a conservative reviewed supported-country set with trusted Vercel geolocation; EEA/UK/Switzerland, unknown geolocation, and other unlisted countries bypass free Gemini. OpenRouter remains subject to its own provider terms. Review intended audience and regional eligibility before deployment. The normal website and human contact remain available. Source fallback is explicitly labeled, not silently represented as AI. References: [Google terms](https://ai.google.dev/gemini-api/terms), [available regions](https://ai.google.dev/gemini-api/docs/available-regions), [OpenRouter terms](https://openrouter.ai/terms).

**Shared limits are mandatory in production.** Missing/broken Redis causes an unavailable response before model generation. Local development can use expiring process memory; that mode is not offered as a production shortcut. Redis receives HMAC-derived, daily-pseudonymous IP/session counters, a global daily counter, and expiring provider circuit flags; no message text or raw IP is stored there.

Defaults: 10 requests/IP/minute, 30 requests/session/30-minute window, 300 requests globally/day. Valid requests can attempt at most one primary and one fallback model. The daily counter limits requests, not exact dollars; configure provider-side spend caps too. The global daily key uses UTC dates; fixed windows can permit bursts around boundaries. Session identifiers are not authentication, and resetting them does not evade the IP/global counters. IP limits may affect shared networks; tune after reviewing metadata.

Settings: `ASSISTANT_IP_MINUTE_LIMIT`, `ASSISTANT_SESSION_LIMIT`, `ASSISTANT_DAILY_LIMIT`, `ASSISTANT_ENABLED=false` to disable model service. Keep direct human links available during a disablement. `ASSISTANT_LOG_METADATA=true` enables sanitized request-ID/provider/disposition/latency/token/error-category logs, without prompts, keys, IPs, or chat transcripts.

## Knowledge updates

`server/assistant/knowledge.mjs` imports the approved service, engagement, company, founder, and product facts. The founder GitHub summary is a reviewed snapshot attributed only to the founder. Never use it to narrow Kryzect's technology offering or claim company experience. The company accepts discussion across all stacks; specific suitability and delivery commitments require discovery.

Update reviewed dates and sources when facts change. Product roadmap remains distinct from current design and availability. Do not ingest private documents or unreviewed GitHub changes. No IncidentIQ repository URL/README is currently approved, so the assistant must acknowledge that documentation gap rather than invent one.

The current whole-knowledge prompt fits a bounded character budget. It uses model semantic understanding, with no substring/keyword scope matcher. If the knowledge grows past the guard, curate it or implement evaluated semantic retrieval; do not remove the guard or silently discard facts.

The provider prompt includes all reviewed knowledge IDs and facts, including full service descriptions, capabilities, use cases, service-specific FAQs, considerations, the company FAQ, and published careers status. Repeated source metadata stays server-side for citation resolution. Answers target one to three sentences with a 768-token output budget; the UI receives at most two sources and one distinct action. Keeping complete facts can increase input tokens and live-provider latency; source-only replies remain local and immediate.

For a confident local match, the panel shows “Saved source · AI reply loading” after 1.8 seconds while Gemini/OpenRouter continue. This is temporary source information, not streamed or validated AI output. A successful model reply replaces it; an outage leaves a labeled saved-source answer. Stop and Clear remove the temporary preview, and previews are excluded from model history. Source matching ignores common conversational words, weights distinctive terms, and handles explicit booking, qualifications, client evidence, legitimacy, deployment, product stack, and data-platform intents. It remains simpler than semantic AI.

At desktop/tablet widths of 768px and above, the window is up to 512px wide and 768px tall within viewport bounds. The compact header/footer leave more room for conversation; input, Clear, and Send share one row. On phones the floating window uses at most 80% of the available height, capped at 608px, with 12px side/bottom spacing. A two-line input sits beside compact Clear/Send controls; contact/booking and the short disclaimer share a footer row. Touch users choose when to focus the input, so opening chat does not automatically summon the keyboard. When the available viewport is shorter than 480px, the panel uses the available height and scrolls as needed to keep controls reachable. Browser checks cover floating bounds, coarse-pointer focus, simulated visual-viewport keyboard resizing, desktop proportions, and source-only operation with no chat POST. Real-device keyboard behavior still warrants review. The readiness check does not test provider availability or Redis connectivity; failures during actual AI requests still fall back safely.

The desktop input shows two text lines (64px high). Footer contact/booking buttons and the short disclaimer share a bottom row to recover space. Secondary controls have visible borders/backgrounds and hover/pressed states. The dialog, conversation, and textarea scrollbars use dark tracks and blue thumbs, with native colors restored in forced-color mode. Browser checks include two-line visibility without scrolling and themed scrollbar styles.

## Tests and live evaluation

```bash
npm run check
npm run format:check
npm run test:assistant:browser
node scripts/check-secrets.mjs
```

Browser checks use mocked API replies and make no model calls. Unit tests exercise the real request handler with mocked provider/Redis responses, fallback, malformed requests/results, cancellation, quotas, and privacy boundaries. They cannot establish semantic model quality.

Explicit live evaluation uses free-provider quota:

```bash
npm run assistant:eval
npm run assistant:eval -- --provider=gemini
npm run assistant:eval -- --provider=openrouter
npm run assistant:eval -- --full
npm run assistant:eval -- --ids=automation-indirect,irrelevant-with-brand,follow-up
```

Default: eight synthetic prompts; full: the versioned suite in `tests/fixtures/assistant-evaluations.mjs`. Outputs are ignored under `.qa/assistant-live-evaluation.json`. Automatic checks cover disposition/reference expectations; manually review the saved replies for actual factual accuracy and appropriate technical advice. Do not publish test scores as a guarantee of perfect scope or accuracy. Ordinary CI never makes paid/live model calls.

## Release checklist

Verify a deployed preview's API (not just its static build), real keys/model access, Redis connection, allowed origins, production failure mode, provider budgets/privacy settings, and mobile keyboard behavior. Exercise primary-only and fallback-only operation with synthetic questions. Check indirect enquiries, unlisted technology, founder/company boundaries, IncidentIQ roadmap, unknown pricing, and unrelated/injection prompts. Confirm messages/keys do not appear in browser bundles or logs. Real device/screen-reader review supplements axe and Chromium.

Close/Stop cancels the client request; disconnect handling cancels upstream work where possible. Providers may still charge work already performed. A network timeout is not a promise of zero usage. Clear chat removes in-page conversation state and does not reset usage counters. Refreshing clears the conversation; no transcript is written to local storage or cookies.

## Implementation verification and remaining release requirements

Local verification passed formatting, lint, unit tests, production build, server-secret bundle isolation, 86 existing page/viewport browser checks, and eight assistant layouts through 3840px width with zero detected axe violations. Assistant checks also cover mocked-provider HTTP integration, safe rendering, focus, retry, cancellation, quota handling, lazy-load failure, and no-JavaScript behavior. Automated checks do not establish universal accessibility or perfect model behavior.

Live free-provider smoke testing produced correct responses for broad technology coverage, founder attribution, IncidentIQ development status, unknown pricing, injection refusal, and conversational follow-up. The eight-case run passed five automatic expectations; three requests failed because providers were unavailable. A targeted three-case rerun passed the follow-up case while two requests encountered provider failures. These are availability results, not a complete semantic evaluation or release guarantee. Ignored `.qa/assistant-live-evaluation.json` contains the latest run and is overwritten by subsequent evaluations.

The tested Gemini account produced valid replies but also transient 503s and timeouts. Tested OpenRouter free routes either rejected the strict data-collection filter or returned 429. The strict default remains in place; it was not silently relaxed. Shared Redis credentials were absent during local verification, so production enablement still requires the documented shared store and a deployed end-to-end check with the intended account, regions, and privacy settings.

After latency and question-understanding updates, 30 offline tests and eight assistant browser layouts passed, including temporary-source replacement and the owner's reported conversation regressions. A three-case live run passed booking and warehouse/Spark questions on Gemini in approximately 15.4 and 12.5 seconds; the client-evidence question timed out and OpenRouter rejected the route. The early saved answer reduces time to useful information for recognized questions; it does not establish that free-provider generation itself is consistently fast. The semantic policy now explicitly forbids unsupported legitimacy claims and evasive client-history answers. Those rules still require ongoing live factual evaluation.

No packages or browser installations were added for this feature. Temporary provider diagnostics live under ignored `.audit/assistant-*.mjs`; generated browser images and live evaluation output live under ignored `.qa/`. These can be removed after review. Keep the reusable `scripts/check-assistant-*.mjs`, `scripts/evaluate-assistant.mjs`, and versioned test fixtures. Existing historical audit files are separate from this feature.

## Expanded offline knowledge and language handling

`src/data/assistant-knowledge.js` defines reviewed, public answer records and imports the existing service/FAQ/product/industry/team content. Every service exposes an overview, full scope, capabilities, use cases, its FAQs, and architecture/access considerations when documented. Company records cover identity, founder role/study/experience boundaries, published roster, careers, contact/booking, international work, discovery, pricing/timelines, engagement process, MVPs, existing systems, changes, handover, maintenance, deployment, confidentiality, contract unknowns, client evidence, and product status/workflow/capabilities/stack/pricing boundaries. The careers snapshot currently states no open roles or internships; update it when the public page changes.

`src/data/assistant-technologies.js` adds general high-level explanations and broad technology recognition. These are not proof of Kryzect's past delivery experience, and unlisted technologies are not unsupported. The guide is finite; do not represent it as a complete technical encyclopedia or a substitute for semantic AI. Missing implementation/commercial facts stay unknown.

`src/utils/assistant-retrieval.js` performs local intent retrieval using normalized phrases, curated equivalent concepts, weighted example/topic overlap, conservative spelling correction (including adjacent transpositions), explicit concept relationships, confidence/margin checks, bounded user-only conversational context, and entity-specific facets. It distinguishes founder, product, call and service follow-ups, supports a small reviewed Urdu/Roman Urdu vocabulary, combines at most two supported questions, and offers clickable clarification questions for ambiguity. It does not download a model, call an embedding service, browse, execute instructions, learn unreviewed user claims, or promise unrestricted natural-language understanding. Answers remain reviewed templates and source extracts. Basic technology explanations are restricted to the question's actual known terms; unrelated coding/tutorial/personal requests are refused or clarified instead of forcing a service match.

The versioned offline suite covers 188 questions across curated examples, independent paraphrases, context/scope regressions, and every service's overview/scope/capabilities/use cases/FAQs. Unit checks verify source fidelity, missing facts, safe combinations, and clarification. Browser checks exercise a source-only conversation through founder study, automation features, product-stack unknowns, and clarification buttons without a chat POST. Temporary manual runners `.audit/source-eval.mjs` and `.audit/source-paraphrases.mjs` are disposable; keep the versioned fixtures and tests. These synthetic passing cases are evidence of regression coverage, not a universal accuracy guarantee.
