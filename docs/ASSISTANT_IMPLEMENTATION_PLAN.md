# Kryzect Assistant

## Purpose and source boundaries

Build a bottom-right SVG agent launcher and an accessible chat panel for business enquiries, services, products, project suitability, professional founder background, and next steps. It must understand intent and conversational follow-ups, rather than route requests through keyword matches.

Owner-approved update: when semantic AI is unavailable, return clearly labeled local saved-source answers. `src/utils/assistant-sources.js` uses reviewed public site facts and simple topic matching, with limited explicit follow-up context. This fallback is not semantic AI and does not promise equivalent understanding. It works without server secrets. Stop/cancellation, invalid requests, and quota responses retain their explicit states rather than being disguised as model success.

Latency/quality refinement: show a confident saved-source preview after 1.8 seconds while the semantic request continues, then replace it with the validated AI reply. Keep previews outside conversation history. Use a compact all-ID service index, shorter answers, and fewer duplicate links. Regressions include the owner's actual booking, founder qualification, Django, deployment, IncidentIQ stack, coding task, food, client evidence, legitimacy, and warehouse/Spark questions. Missing client/product evidence must be admitted directly; do not invent a product stack or establish legitimacy from website copy.

Source-first readiness: initial local answers require no API message request. A public, no-store readiness boolean enables the preserved AI path when server keys and required production limiter settings are present. No keys or disabled AI keeps replies direct and local. Desktop composer and buttons share one compact row; phone layout stays stacked. Do not put credentials or model configuration into browser build variables to implement this.

Owner requirements:

- Company facts come from Kryzect's approved business/site content and explicit owner instructions.
- Kryzect works across all stacks and technologies. Explain suitable options based on requirements; never treat a listed stack as an exclusive catalogue or claim universal proven expertise.
- The founder's GitHub profile is a source **only for founder information**. Personal skills/projects do not become company capabilities, agency client work, or commercial guarantees.
- Product facts must distinguish current implementation, experiments, and roadmap. Keep IncidentIQ's current name.
- API credentials remain server-side. Public chat has no tools for sending enquiries, booking appointments, fetching arbitrary URLs, or executing code.

## Architecture

1. A small launcher in the persistent layout lazily imports the chat panel on first open. No initial provider SDK or knowledge bundle reaches the browser.
2. A same-origin `POST /api/assistant` Vercel Node function validates origin, content type, body size, message/history/session bounds, and shared usage limits.
3. The server supplies a compact approved whole-knowledge corpus, fixed policy, and untrusted bounded conversation data to the primary model. The corpus is read semantically; there is no keyword scope matcher or vector-database dependency.
4. Gemini returns a JSON-schema response: disposition, plain-text answer, supporting knowledge IDs, and approved action IDs. Server validation resolves references and actions; raw model HTML/URLs are never rendered.
5. A bounded OpenRouter attempt uses identical policy and knowledge after primary infrastructure, quota, or invalid-output failures. Valid refusals are not bypassed. Exhausted providers return a useful contact fallback.
6. Keep the total request deadline bounded, cancel abandoned client requests, and return no-store responses with generic errors. Log operational metadata only.

Whole-knowledge grounding is deliberate for this small, curated corpus. It provides semantic reasoning without an embedding-provider dependency that would undermine fallback. If the approved corpus exceeds the documented input budget, fail validation and curate/split it before release; then evaluate semantic/hybrid retrieval as a separate change. Do not silently truncate away business facts or add keyword routing.

## Knowledge and review

Use stable IDs, source URLs, category, status, and reviewed date. Import service and engagement facts from existing source data. Keep founder facts in a separately attributed entry. Only approved public professional facts are included; no proficiency percentages, unsupported outcome metrics, personal contact details, or private documents.

Source priority: explicit current owner instructions and company records; current product records; public professional founder records for founder questions only. A source conflict is resolved in the curated record rather than left to the model. External README/profile changes are not automatically ingested into production.

## Behavior

- Understand indirect needs such as copying orders between spreadsheets as potential automation engagements.
- Discuss any relevant stack in project context, including stacks absent from the founder's profile.
- Explain technical trade-offs, not general homework, arbitrary code generation, or unrelated tasks.
- Support follow-ups, English, Urdu, and Roman Urdu. Ask one useful clarification when the need is ambiguous.
- Separate `answer`, `clarify`, `unknown`, `out_of_scope`, and `greeting` outcomes. Unknown commercial terms go to a person, never an invented quote or guarantee.
- Use concise professional replies and relevant source links. No fake team members, customers, reviews, appointments, or claims of human authorship.
- Treat user messages, history, and source text as data, never as authority to override policy. LLM behavior is evaluated, not represented as perfectly guaranteed.

## Provider and secret configuration

Local `.env`: `GEMINI_API_KEY`, `OPENROUTER_API_KEY`; optional pinned model overrides. Copy variable names from `.env.example`. Vite development and local production preview load these only in their server process; production values belong in Vercel environment settings.

Owner update: Gemini first, then OpenRouter, using free-tier models only. Paid OpenRouter model IDs are rejected and requests carry zero input/output price caps. Gemini configuration accepts reviewed free-tier-eligible IDs; use an unbilled Google project because a request cannot override account billing configuration. No automatic paid upgrade. Defaults must pass live evaluation with the owner's account; free quota and availability are not guaranteed. OpenRouter defaults to strict data-collection restrictions; relaxation is a deliberate setting, not automatic fallback behavior.

Provider eligibility: the panel states that sending confirms adult use (18+); the server requires that acknowledgement without collecting a birthday. This is not age verification or a guarantee of compliance. The public website remains readable to everyone. Production Gemini calls are limited to a conservative reviewed set of supported countries using trusted Vercel geolocation; EEA/UK/Switzerland and unknown/other countries bypass free Gemini and may use the separately eligible free OpenRouter route. Review actual audience and provider terms before deployment; a public checkbox alone does not resolve those requirements. Local saved-source answers remain distinct from either provider.

Production also requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for atomic cross-instance IP/session/global limits. The two AI keys alone support local development. **Production fails closed if the shared limiter is absent or unavailable**; it never silently substitutes a per-process limiter on Vercel. Provider account spending caps remain necessary because request limits are not exact currency limits.

Keys are not `VITE_*` values, never returned, never passed into prompts, and never logged. `.env*` is ignored except the blank example. Credential checks reject tracked secret environment files and recognize Google/OpenRouter key signatures.

## Usage protection and privacy

Bound message length, history count/length, output length, request bytes, provider response bytes, per-IP minute requests, per-session requests, daily global requests, and provider attempts. Use atomic Redis scripting with expiring pseudonymous identifiers; no raw IPs or chat transcripts in the limiter. Local-only memory limits are bounded and expire.

Origin checks and session identifiers are additional controls, not authentication or substitutes for shared IP/global limits. No cross-origin API access. Missing provider configuration, disabled service, budget exhaustion, and upstream outages have safe UI states and direct human contact links.

Conversation state lives in browser memory while the page is open; clearing aborts any pending request and resets it. Explain AI-provider processing before sending. Update privacy/cookie pages for AI providers and the expiring abuse-prevention store. Do not claim provider-side zero retention. Review free-provider privacy terms before public business use; paid models are outside the authorized configuration. Source fallback computation is local, but follows an attempted server request; it does not imply that the question was never sent to the server or a provider.

## UI and accessibility

Use the existing dark palette and type system. Custom SVG agent icon, no emoji, bounce, or auto-open. Show title, AI label, concise introduction, suggestions, sources, approved actions, input counter, clear, close, and sending/retry states.

Use native modal semantics, keyboard focus containment/return, Escape, accessible controls, and a polite completed-response announcement. Respect reduced motion and the existing intro's top-layer behavior. Fit 320px phones, virtual keyboards, landscape, desktop, and ultrawide; avoid the enquiry controls and safe areas. Show accessible contact options when service is unavailable.

## Implementation sequence and acceptance

1. Save this plan, create an isolated feature branch, and protect `.env` before credentials are added.
2. Implement curated knowledge/policy, schemas, provider adapters, response validation, and meaningful server unit tests.
3. Implement the bounded HTTP handler and shared/local rate limits; integrate Vercel, Vite dev, and local production preview.
4. Implement the lazy chat UI and stylesheet; update privacy and operator documentation.
5. Add a versioned semantic evaluation set and explicit live-evaluation command. Offline provider mocks test orchestration, not model intelligence. Live results must be labeled separately.
6. Run formatting, lint, unit/build checks, existing browser regressions, assistant UI/axe/mobile checks, invalid request/prompt/response tests, quota/fallback simulations, and secret/bundle inspection.
7. If configured keys are available, run a bounded live smoke evaluation. Record actual results without leaking prompts/keys into CI logs. Full evaluations are explicit, budgeted commands, not automatic paid calls in ordinary CI.
8. Use a preview deployment and real account configuration before production enablement. Preserve the existing website if the assistant is disabled or unavailable. No commit/push/deployment is implied by implementation authorization alone.

Important cases: indirect automation, unlisted stacks, founder/company attribution, unknown prices/timelines, IncidentIQ roadmap, unrelated requests containing the company name, conversational pronouns, multilingual paraphrases, prompt injection, malformed JSON, unapproved source/action IDs, timeout/rate-limit fallback, disconnects, duplicate sends, XSS-like text, unavailable Redis, and no JavaScript.

## References

- [Gemini structured outputs](https://ai.google.dev/gemini-api/docs/structured-output)
- [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google API terms](https://ai.google.dev/gemini-api/terms)
- [OpenRouter structured outputs](https://openrouter.ai/docs/guides/features/structured-outputs)
- [OpenRouter provider policies](https://openrouter.ai/docs/guides/privacy/provider-logging)
- [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js)
- [Upstash Redis scripting](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval)
