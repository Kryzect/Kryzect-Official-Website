import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'

const SESSION_KEY = 'kryzect-brand-intro-seen'
const INTRO_MS = 3200
const FADE_MS = 320

export default function BrandIntro({ replayRef }) {
  const dialog = useRef(null)
  const [open, setOpen] = useState(false)
  const [play, setPlay] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const replay = () => {
      setPlay((value) => value + 1)
      setOpen(true)
    }
    replayRef.current = replay
    return () => {
      replayRef.current = null
    }
  }, [replayRef])

  useEffect(() => {
    // Only the initial homepage landing qualifies, never a later route change.
    if (window.location.pathname !== '/' || window.location.hash)
      return undefined
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // Without session storage we cannot honor once-per-session behavior.
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      setOpen(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const element = dialog.current
    if (!element?.showModal) {
      setOpen(false)
      return undefined
    }
    element.showModal()
    setLeaving(false)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => setOpen(false), INTRO_MS)
    const fade = window.setTimeout(() => setLeaving(true), INTRO_MS - FADE_MS)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(fade)
      element.close()
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  return (
    <dialog
      ref={dialog}
      className={`brand-intro${leaving ? ' brand-intro--leaving' : ''}`}
      aria-labelledby="brand-intro-title"
      aria-describedby="brand-intro-tagline"
      onCancel={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault()
          event.currentTarget.querySelector('button')?.focus()
        }
      }}
    >
      <div className="brand-intro__content" key={play}>
        <div className="brand-intro__logo">{open && <Logo />}</div>
        <p id="brand-intro-title" className="brand-intro__title">
          Kryzect
        </p>
        <p id="brand-intro-tagline">Think First. Build Better.</p>
      </div>
      <button
        type="button"
        className="brand-intro__skip"
        onClick={() => setOpen(false)}
      >
        Skip intro <span aria-hidden="true">→</span>
      </button>
    </dialog>
  )
}
