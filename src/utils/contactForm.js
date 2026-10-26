import {
  FORM_ENDPOINT,
  WEB3FORMS_ACCESS_KEY,
  CONTACT_EMAIL,
} from '../config.js'

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  goal: 5000,
  company: 160,
  service: 100,
  timeline: 160,
  currentSystem: 500,
  details: 5000,
}
export function validateContact(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name.'
  if (!data.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email address.'
  if (!data.goal.trim())
    errors.goal = 'Please describe what you would like to achieve.'
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if ((data[field] ?? '').length > limit)
      errors[field] = `Please use ${limit} characters or fewer.`
  }
  return errors
}
export async function submitContactForm(
  payload,
  { timeoutMs = 15000, fetcher = fetch } = {},
) {
  if (!FORM_ENDPOINT || !WEB3FORMS_ACCESS_KEY)
    return {
      ok: false,
      error: 'Online delivery is unavailable. Please email us directly.',
    }
  if (Object.keys(validateContact(payload)).length)
    return { ok: false, error: 'Please review the form and try again.' }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  const body = Object.fromEntries(
    Object.keys(FIELD_LIMITS).map((field) => [field, payload[field] ?? '']),
  )
  try {
    const response = await fetcher(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...body,
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New Kryzect website enquiry',
        from_name: 'Kryzect Website',
      }),
    })
    const data = await response.json().catch(() => null)
    if (response.ok && data?.success === true) return { ok: true }
    if (response.status === 429)
      return {
        ok: false,
        error:
          'Too many attempts. Please wait before trying again, or email us directly.',
      }
    return {
      ok: false,
      error:
        'Your message could not be confirmed. Please try again, or email us directly.',
    }
  } catch {
    return {
      ok: false,
      error: controller.signal.aborted
        ? 'Delivery could not be confirmed in time. Please check before resending, or email us directly.'
        : 'We could not reach the delivery service. Please check your connection or email us directly.',
    }
  } finally {
    clearTimeout(timer)
  }
}
export function buildMailto({ subject = 'New Kryzect enquiry', body } = {}) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
}
