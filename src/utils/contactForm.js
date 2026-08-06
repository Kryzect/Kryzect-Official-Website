// Kryzect — contact form submission abstraction.
//
// Flow (Blueprint V2 §65):
//   React Contact form → Web3Forms (https://api.web3forms.com/submit) → email
//
// Design rules:
//   - No credentials are stored or sent from the client. The Web3Forms access
//     key is public by design (safe to keep in the bundle); the provider owns
//     delivery + spam/bot protection + rate limiting.
//   - If FORM_ENDPOINT or WEB3FORMS_ACCESS_KEY is empty, the form does NOT
//     pretend to work: it returns { ok: false, notConfigured: true } so the UI
//     can show an honest message and offer a mailto fallback instead.
//
// `payload` is the validated form data (already trimmed). Client-side
// anti-spam (honeypot, validation) happens in the form component before this
// is ever called; the provider adds its own hosted spam/rate protection.
// Web3Forms responds { success: boolean, message: string } — success key is
// authoritative (a non-2xx may still be a structured "bot detected" reply).

import { FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY } from '../config.js'

export async function submitContactForm(payload) {
  if (!FORM_ENDPOINT || !WEB3FORMS_ACCESS_KEY) {
    return { ok: false, notConfigured: true }
  }

  const body = {
    ...payload,
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'New Kryzect website enquiry',
    from_name: 'Kryzect Website',
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => null)

    if (data && data.success) {
      return { ok: true, message: data.message }
    }

    if (!data) {
      return { ok: false, network: !response.ok, error: `Form endpoint responded ${response.status}.` }
    }

    return { ok: false, error: data.message || 'The submission was not accepted.' }
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
