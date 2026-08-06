// Kryzect — runtime configuration point.
// This is the SINGLE place to wire up external integrations that require a
// live provider/account. Nothing here is secret. We intentionally do NOT put
// credentials or SMTP/Gmail passwords anywhere in the client bundle (see
// CONTEXT.md "Contact architecture" note). All values are safe to commit.
//
// Settings still left empty mean "not configured yet" — the UI renders an
// honest fallback instead of pretending submissions/bookings work.

// Email address that receives contact-form notifications and is shown on the
// site. This is a public address by design (it is already in the footer).
export const CONTACT_EMAIL = 'ali.kryzect@gmail.com'

// Hosted form endpoint (e.g. Formspree, Web3Forms, Basin, Getform...).
// The Contact form POSTs a JSON payload here; the provider then forwards an
// email notification to CONTACT_EMAIL and applies its own spam protection + rate limiting.
// Leave EMPTY ('') until a provider is configured. See CONTEXT.md for steps.
export const FORM_ENDPOINT = ''

// Booking calendar (Google Calendar Appointment Schedule / Calendly / Cal.com...).
// This should be the public scheduling URL the visitor opens to book a call.
// Leave EMPTY ('') until a live booking link is available.
export const BOOKING_URL = ''