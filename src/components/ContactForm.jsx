import { useRef, useState } from 'react'

import { SERVICE_OPTIONS } from '../data/contact.js'
import { submitContactForm, buildMailto } from '../utils/contactForm.js'

// Kryzect contact form. Notes:
//   - Accessible: real <label>, aria-invalid/aria-describedby, fieldset-free
//     single-column layout, clear error text, keyboard-friendly.
//   - Anti-spam: hidden honeypot (silently ignored if filled) + required
//     validation. Hosted provider adds server-side spam/rate protection; see
//     contactForm.js — no secrets, no credentials client-side.
//   - If FORM_ENDPOINT is empty, submitting shows an honest fallback with a
//     prefilled mailto instead of pretending the message was sent.

const requiredError = (label) => `Please enter your ${label.toLowerCase()}.`

function buildInitial() {
  return {
    name: '',
    email: '',
    company: '',
    service: '',
    timeline: '',
    goal: '',
    currentSystem: '',
    details: '',
    website: '', // honeypot — must stay empty
  }
}

function ContactForm() {
  const [values, setValues] = useState(buildInitial())
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // idle | submitting | sent | error | config
  const [lastSubmission, setLastSubmission] = useState(null) // for mailto fallback
  const mailtoRef = useRef(null)

  const setField = (field) => (event) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validateForm(data) {
    const next = {}
    if (!data.name.trim()) next.name = requiredError('name')
    if (!data.email.trim()) next.email = requiredError('email')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!data.goal.trim()) next.goal = requiredError('what you are trying to achieve')
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // Honeypot: if the hidden field was filled, silently discard (bot).
    if (values.website) {
      setStatus('sent')
      return
    }

    const data = {
      name: values.name.trim(),
      email: values.email.trim(),
      goal: values.goal.trim(),
      company: values.company.trim(),
      service: values.service,
      timeline: values.timeline.trim(),
      currentSystem: values.currentSystem.trim(),
      details: values.details.trim(),
    }

    const validationErrors = validateForm(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus(null)
      return
    }

    setStatus('submitting')
    const result = await submitContactForm(data)

    if (result.ok) {
      setStatus('sent')
      setValues(buildInitial())
      setErrors({})
      return
    }

    if (result.notConfigured) {
      setLastSubmission(data)
      setStatus('config')
      setErrors({})
      return
    }

    setLastSubmission(data)
    setStatus('error')
  }

  const fieldError = (field) => (errors[field] ? <span id={`${field}-error`} className="form-field__error" role="alert">{errors[field]}</span> : null)
  const ariaInvalid = (field) => (errors[field] ? { 'aria-invalid': true, 'aria-describedby': `${field}-error` } : {})

  const statusMessage = () => {
    switch (status) {
      case 'submitting':
        return 'Sending your message…'
      case 'sent':
        return 'Thank you — your message has been sent. We will reply to your email.'
      case 'config':
        return (
          <>
            Online form delivery is not yet configured, so this form is not sending yet. Please
            email us directly — your details are pre-filled in the link below.
          </>
        )
      case 'error':
        return 'Something went wrong sending your message. Please try again, or email us directly.'
      default:
        return null
    }
  }

  const mailto = buildMailto({
    subject: 'New Kryzect enquiry',
    body: `Name: ${lastSubmission?.name ?? ''}\nEmail: ${lastSubmission?.email ?? ''}\nGoal: ${lastSubmission?.goal ?? ''}\nCompany: ${lastSubmission?.company ?? ''}\nService: ${lastSubmission?.service ?? ''}\nTimeline: ${lastSubmission?.timeline ?? ''}\nCurrent system: ${lastSubmission?.currentSystem ?? ''}\nDetails: ${lastSubmission?.details ?? ''}`,
  })

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — visually hidden, must remain empty */}
      <div className="form-field form-field--honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" value={values.website} onChange={setField('website')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-field">
        <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
        <input id="name" name="name" type="text" value={values.name} onChange={setField('name')} required {...ariaInvalid('name')} />
        {fieldError('name')}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" value={values.email} onChange={setField('email')} required {...ariaInvalid('email')} />
        {fieldError('email')}
      </div>

      <div className="form-field">
        <label htmlFor="goal">What are you trying to achieve? <span aria-hidden="true">*</span></label>
        <textarea id="goal" name="goal" rows="4" value={values.goal} onChange={setField('goal')} required {...ariaInvalid('goal')} />
        {fieldError('goal')}
      </div>

      <hr className="form-divider" aria-hidden="true" />

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" value={values.company} onChange={setField('company')} />
        </div>

        <div className="form-field">
          <label htmlFor="service">Service</label>
          <select id="service" name="service" value={values.service} onChange={setField('service')}>
            <option value="">Select…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="timeline">Timeline</label>
          <input id="timeline" name="timeline" type="text" value={values.timeline} onChange={setField('timeline')} placeholder="e.g. 1–3 months, ASAP" />
        </div>

        <div className="form-field">
          <label htmlFor="currentSystem">Current system</label>
          <input id="currentSystem" name="currentSystem" type="text" value={values.currentSystem} onChange={setField('currentSystem')} placeholder="e.g. existing tools, website, legacy app" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="details">Additional details</label>
        <textarea id="details" name="details" rows="3" value={values.details} onChange={setField('details')} />
      </div>

      {/* Live status region */}
      <div className="form-status region" aria-live="polite">
        {statusMessage()}
        {status === 'config' ? (
          <a ref={mailtoRef} href={mailto} className="form-status__link">
            Email Kryzect →
          </a>
        ) : null}
        {status === 'error' ? (
          <a href={mailto} className="form-status__link">
            Email Kryzect →
          </a>
        ) : null}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm