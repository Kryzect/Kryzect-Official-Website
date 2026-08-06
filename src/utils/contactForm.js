// Kryzect — contact form submission abstraction.
//
// Initial $0 flow (Blueprint V2 §65):
//   React Contact Form → Hosted form endpoint → Email notification → inbox
//
// Design rules:
//   - No credentials are stored or sent from the client. The hosted provider
//     (Formspree/Web3Forms/etc.) owns delivery + spam protection + rate limiting.
//   - If FORM_ENDPOINT is empty, the form does NOT pretend to work: it returns
//     { ok: false, notConfigured: true } so the UI can show an honest message
//     and offer a mailto fallback instead.
//
// `payload` is the validated form data (already trimmed). Client-side
// anti-spam (honeypot, validation) happens in the form component before this
// is ever called; the provider adds its own hosted spam/rate protection.

import { FORM_ENDPOINT, CONTACT_EMAIL } from '../config.js'

export async function submitContactForm(payload) {
  if (!FORM_ENDPOINT) {
    return { ok: false, notConfigured: true }
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return { ok: false, network: false, error: `Form endpoint responded ${response.status}.` }
    }

    return { ok: true }
  } catch {
    // Deliberately generic — never leak request internals into client logs.
    return { ok: false, network: true }
  }
}

export function buildMailto({ subject, body }) {
  const params = new URLSearchParams({ subject: subject ?? 'New Kryzect enquiry' })
  if (body) params.set('body', body)
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`
}
