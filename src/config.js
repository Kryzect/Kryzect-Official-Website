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

// Hosted form endpoint. We use Web3Forms: you create a free access key at
// https://web3forms.com (verify CONTACT_EMAIL), then drop the key in below.
// The Contact form POSTs a JSON payload (incl. access_key) here; Web3Forms
// forwards an email to CONTACT_EMAIL and applies its own spam/bot + rate
// protection. Set your key to make the form actually send — until then the UI
// shows an honest "not configured" mailto fallback (never fakes a send).
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit'

// Web3Forms access key. SAFE to keep public in the client bundle by design.
// Leave EMPTY ('') until you create one at web3forms.com for ali.kryzect@gmail.com.
export const WEB3FORMS_ACCESS_KEY = 'ca422678-6d92-45ce-bad2-f938bfb2909b'

// Booking calendar (Google Calendar Appointment Schedule / Calendly / Cal.com...).
// This should be the public scheduling URL the visitor opens to book a call.
// In Google Calendar: Create > Appointment schedule > ... then Share > Copy link,
// and paste that booking URL here. Leave EMPTY ('') until a live link is ready —
// the Book a Call page shows an honest "not linked yet" fallback until then.
export const BOOKING_URL = 'https://calendar.app.google/4xWgTpxP8hecQAjBA'