import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { CONTACT_EMAIL } from '../config.js'
export default function Contact() {
  return (
    <>
      <PageIntro
        path="/contact"
        label="Contact"
        title="Tell us what you would like to achieve."
        description="Share the idea, workflow, or business problem. You do not need a technical specification to begin."
      >
        <div className="page-hero__actions">
          <a className="btn btn--primary" href="#form">
            Start a Project
          </a>
          <Link className="btn btn--ghost" to="/book-a-call">
            Book a Free Call
          </Link>
        </div>
      </PageIntro>
      <section
        id="form"
        tabIndex={-1}
        className="page-section"
        aria-labelledby="form-heading"
      >
        <div className="page-container contact-layout">
          <div className="contact-intro">
            <h2 id="form-heading">Start a conversation.</h2>
            <p className="contact-intro__text">
              We will review your enquiry and respond by email to clarify the
              scope and a useful next step.
            </p>
            <p className="contact-intro__text">
              Prefer email?{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p className="contact-intro__text">
              You can also{' '}
              <Link to="/book-a-call">
                book a free 30-minute discovery call
              </Link>
              .
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
