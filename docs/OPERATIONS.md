# Website operations

## Release checks

Use Node 24, `npm ci`, `npm run format:check`, `npm run check`, and `npm run test:browser`. Browser checks intercept contact submissions and must never deliver real enquiries. Review full-tree and production-only npm advisory results separately.

The build generates full HTML for known routes, a branded `404.html`, sitemap, and robots. Vercel serves clean static URLs without a catch-all SPA rewrite. Test client navigation and fresh page loads. Before publishing, check the preview deployment's raw metadata, deep links, 404 responses, headers, share image, enquiry path, and booking link. Local preview does not validate Vercel account settings. Keep a working deployment for rollback.

## Enquiry delivery

The Web3Forms key is intentionally public. Verify recipient, allowed domains, supported anti-spam settings, quota, and notifications in the provider account. Stronger abuse prevention must use a supported server-verified integration; browser validation is not security enforcement. Update the privacy notice when provider behavior changes.

Send one controlled enquiry yourself. Check inbox/spam, every field, reply-to, and provider status, then reply. Repeat after domain, mailbox, or provider changes. Do not forward message contents into analytics/logs. Treat a timeout as potentially delivered before resending. Monitor the inbox regularly; no fixed response promise is currently published.

## Booking account

Apply this description in Google Calendar appointment scheduling:

> A free 30-minute conversation about your goals, current workflow, and useful next steps. No technical brief is needed. Google Meet details are included after booking.

Use Muhammad Ali Aamir as the public name. Verify time zones, availability, buffers, notifications, and Google Meet in the account. Automated tests must not reserve appointments.

## Accounts, domain, and business facts

- Enable MFA for hosting, email, source hosting, calendar, and form-provider accounts. Review collaborators and recovery information.
- Verify rollback access and a proportionate uptime/inbox-monitoring process.
- Before adopting a domain/mailbox, verify ownership, TLS, redirects, canonicals, SPF, DKIM, DMARC, and recipient delivery. Keep existing enquiry paths until the migration is verified.
- Confirm correspondence retention and review policies when providers/processes change. Visitor analytics remain optional; update policies before introducing tracking.
- Review product naming and any necessary trademark clearance before a commercial product launch.

## Security headers

Framing, base-URL injection, and object embedding restrictions are enforced. The broader resource policy begins in `Content-Security-Policy-Report-Only`. Inspect console violations on a preview deployment before promotion to enforcement. No remote CSP reporting service is configured. Fonts and scripts are local; the form connects to Web3Forms. Booking is an external link.

Update dependencies deliberately and keep the lockfile. Never serve the development server as production. Private credentials must not enter client code or `VITE_*` settings.

## Cleanup

`.audit/` and `.qa/` are ignored local evidence directories. `.build/` is removed after the static render stage; `dist/` is regenerable. Keep reusable tests/development dependencies. Do not delete shared npm caches or system Chrome. Local browser evidence is not a public asset.
