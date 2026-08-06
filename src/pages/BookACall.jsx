import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { BOOKING_URL, CONTACT_EMAIL } from '../config.js'

import './company.css'
import './contact.css'

// Book a Call (Blueprint V2 §67–68). Booking integrates a Google Calendar
// Appointment Schedule + Google Meet. Until BOOKING_URL is supplied in
// src/config.js, an honest "not configured" fallback is shown (never a fake link).
function BookACall() {
  return (
    <>
      <Seo
        title="Book a Call"
        description="Book a free 30-minute discovery conversation with Kryzect to understand your objective, current situation, and a useful next step."
        path="/book-a-call"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Book a Call', to: '/book-a-call' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Book a Call</span>
          <h1 className="page-hero__title">Let&apos;s talk about what you&apos;re building.</h1>
          <p className="page-hero__text">
            A 30-minute discovery conversation to understand your objective, current situation, and
            what a useful next step could look like.
          </p>
          <div className="page-hero__actions">
            {BOOKING_URL ? (
              <Button href={BOOKING_URL}>Book Your Call →</Button>
            ) : (
              <Button href={`mailto:${CONTACT_EMAIL}`}>Email to Schedule →</Button>
            )}
            <Button to="/contact" variant="ghost">
              Start a Project Instead
            </Button>
          </div>
        </div>
      </section>

      {/* ============ WHAT THE CALL IS FOR ============ */}
      <section className="page-section" aria-labelledby="for-heading">
        <div className="page-container">
          <div className="page-section__heading">
            <span className="page-section__kicker">On the call</span>
            <h2 className="page-section__title" id="for-heading">
              What the call is for.
            </h2>
          </div>
          <ul className="dot-list">
            <li className="dot">understanding the objective</li>
            <li className="dot">discussing the current situation</li>
            <li className="dot">identifying the problem</li>
            <li className="dot">discussing possible approaches</li>
            <li className="dot">determining whether Kryzect is a fit</li>
          </ul>
        </div>
      </section>

      {/* ============ WHAT IT IS NOT ============ */}
      <section className="page-section" aria-labelledby="not-heading">
        <div className="page-container">
          <div className="page-section__heading">
            <span className="page-section__kicker">No pressure</span>
            <h2 className="page-section__title" id="not-heading">
              What it is not.
            </h2>
          </div>
          <ul className="dot-list">
            <li className="dot">a forced sales call</li>
            <li className="dot">a requirement to have a technical specification</li>
            <li className="dot">a commitment to hire Kryzect</li>
          </ul>
        </div>
      </section>

      {/* ============ BOOKING DETAILS ============ */}
      <section className="page-section page-section--final" aria-labelledby="booking-heading">
        <div className="page-container">
          <div className="page-section__heading">
            <span className="page-section__kicker">Booking</span>
            <h2 className="page-section__title" id="booking-heading">
              Book your discovery call.
            </h2>
          </div>
          <div className="booking-card">
            <h3 className="booking-card__title">30-minute Kryzect Discovery Call</h3>
            <p className="booking-card__text">
              A 30-minute conversation to understand what you&apos;re trying to achieve, what
              you&apos;re currently dealing with, and whether Kryzect is the right fit.
            </p>
            {BOOKING_URL ? (
              <div className="booking-cta">
                <Button href={BOOKING_URL}>Book Your Call →</Button>
              </div>
            ) : (
              <div className="booking-cta">
                <p className="contact-status__note">
                  Scheduling isn&apos;t linked up yet, so no booking link is shown here (we don&apos;t
                  fake one). To get on our calendar in the meantime, email us and we&apos;ll find a
                  time.
                </p>
                <Button href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL} →</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default BookACall