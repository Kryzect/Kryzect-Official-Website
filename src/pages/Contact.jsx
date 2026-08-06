import Button from '../components/Button.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { CONTACT_EMAIL } from '../config.js'

import './company.css'
import './contact.css'

// Contact (Blueprint V2 §63–66). Form submission architecture in
// src/config.js + src/utils/contactForm.js (no secrets — see CONTEXT.md).
function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Tell us what you're trying to achieve. Start a project, book a call, or email Kryzect directly — you don't need a technical specification to begin."
        path="/contact"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Contact', to: '/contact' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero">
        <div className="page-container">
          <span className="page-hero__kicker">Contact</span>
          <h1 className="page-hero__title">Tell us what you&apos;re trying to achieve.</h1>
          <p className="page-hero__text">
            You don&apos;t need a technical specification to start. Tell us about the problem, idea,
            workflow, or outcome you&apos;re working toward.
          </p>
          <div className="page-hero__actions">
            <Button to="/contact#form">Start a Project</Button>
            <Button to="/book-a-call" variant="ghost">
              Book a Call
            </Button>
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="ghost">
              Email us
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="page-section" id="form" aria-labelledby="form-heading">
        <div className="page-container contact-layout">
          <div className="contact-intro">
            <div className="page-section__heading">
              <span className="page-section__kicker">Start a project</span>
              <h2 className="page-section__title" id="form-heading">
                Tell us what you need.
              </h2>
            </div>
            <p className="contact-intro__text">
              Share what you&apos;re working toward. We&apos;ll read it and come back with a
              thoughtful reply — no obligation, no pressure.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ============ CONTACT OPTIONS ============ */}
      <section className="page-section" aria-labelledby="options-heading">
        <div className="page-container">
          <div className="page-section__heading">
            <span className="page-section__kicker">Other ways to reach us</span>
            <h2 className="page-section__title" id="options-heading">
              Prefer to talk directly?
            </h2>
          </div>
          <div className="contact-options">
            <div className="contact-option">
              <h3 className="contact-option__title">Start a Project</h3>
              <p className="contact-option__text">Tell us what you&apos;re trying to build.</p>
              <Button to="/contact#form">Go to the form →</Button>
            </div>
            <div className="contact-option">
              <h3 className="contact-option__title">Book a Call</h3>
              <p className="contact-option__text">A free 30-minute discovery conversation.</p>
              <Button to="/book-a-call" variant="ghost">
                Book a Call →
              </Button>
            </div>
            <div className="contact-option">
              <h3 className="contact-option__title">Email</h3>
              <p className="contact-option__text">Prefer email? Write to us directly.</p>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="ghost">
                Email us →
              </Button>
            </div>
          </div>

          {/* Social below the primary conversion area */}
          <div className="contact-socials">
            <span className="contact-socials__label">Follow Kryzect</span>
            <SocialLinks row />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact