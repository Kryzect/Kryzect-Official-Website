import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICE_OPTIONS } from '../data/contact.js'
import {
  FIELD_LIMITS,
  validateContact,
  submitContactForm,
  buildMailto,
} from '../utils/contactForm.js'

const initial = () =>
  Object.fromEntries(Object.keys(FIELD_LIMITS).map((field) => [field, '']))
export default function ContactForm() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const pending = useRef(false)
  const form = useRef(null)
  const change = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'submitting') setStatus('idle')
  }
  async function submit(event) {
    event.preventDefault()
    if (pending.current) return
    const data = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    )
    const next = validateContact(data)
    setErrors(next)
    if (Object.keys(next).length) {
      const field = form.current.elements.namedItem(Object.keys(next)[0])
      if (field?.closest('details')) field.closest('details').open = true
      requestAnimationFrame(() => field?.focus())
      return
    }
    pending.current = true
    setStatus('submitting')
    try {
      const result = await submitContactForm(data)
      setStatus(result.ok ? 'sent' : 'error')
      setError(result.error ?? '')
      if (result.ok) setValues(initial())
    } finally {
      pending.current = false
    }
  }
  const field = (
    name,
    label,
    { required = false, multiline = false, autoComplete, placeholder } = {},
  ) => {
    const Tag = multiline ? 'textarea' : 'input'
    return (
      <div className="form-field">
        <label htmlFor={name}>
          {label}
          {required ? ' *' : ''}
        </label>
        <Tag
          id={name}
          name={name}
          type={multiline ? undefined : name === 'email' ? 'email' : 'text'}
          rows={multiline ? 4 : undefined}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={FIELD_LIMITS[name]}
          disabled={!ready}
          required={required}
          value={values[name]}
          onChange={change(name)}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span id={`${name}-error`} className="form-field__error" role="alert">
            {errors[name]}
          </span>
        )}
      </div>
    )
  }
  return (
    <form
      ref={form}
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-busy={!ready || status === 'submitting'}
      method="post"
      action="/contact"
    >
      <p className="form-note">
        Fields marked * are required. A short outline is enough to start.
      </p>
      {field('name', 'Name', { required: true, autoComplete: 'name' })}
      {field('email', 'Email', { required: true, autoComplete: 'email' })}
      {field('goal', 'What would you like to achieve?', {
        required: true,
        multiline: true,
      })}
      <details className="form-optional">
        <summary>Add project context (optional)</summary>
        <div className="form-optional__fields">
          {field('company', 'Company', { autoComplete: 'organization' })}
          <div className="form-field">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              name="service"
              disabled={!ready}
              value={values.service}
              onChange={change('service')}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          {field('timeline', 'Timeline', {
            placeholder: 'For example, within three months',
          })}
          {field('currentSystem', 'Current tools or systems')}
          {field('details', 'Additional details', { multiline: true })}
        </div>
      </details>
      <p className="form-note">
        Please leave out passwords, access keys, and sensitive client records.
        Your details are used to respond to your enquiry.{' '}
        <Link to="/privacy">Privacy notice</Link>
      </p>
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={!ready || status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
      <div
        className="form-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === 'sent'
          ? 'Thank you. Your message has been accepted for delivery. We will respond by email.'
          : status === 'error'
            ? error
            : status === 'submitting'
              ? 'Sending your message…'
              : ''}
      </div>
      {status === 'error' && (
        <a
          href={buildMailto({
            body: Object.entries(values)
              .filter(([, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n'),
          })}
        >
          Email your enquiry instead →
        </a>
      )}
    </form>
  )
}
