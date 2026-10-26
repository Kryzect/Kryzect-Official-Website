import { useEffect, useState } from 'react'

import Logo from './Logo.jsx'

const INTRO_MS = 3200
const FADE_MS = 320

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Restrained Kryzect intro: the supplied Logo plays its full animated
// formation on every load, then fades to reveal the site. Skipped entirely
// under reduced motion.
function Loading() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true)
      return undefined
    }

    let ignore = false
    const showT = window.setTimeout(() => {
      if (!ignore) setLeaving(true)
    }, INTRO_MS - FADE_MS)
    const hideT = window.setTimeout(() => {
      if (!ignore) setDone(true)
    }, INTRO_MS)

    return () => {
      ignore = true
      window.clearTimeout(showT)
      window.clearTimeout(hideT)
    }
  }, [])

  if (done) return null

  return (
    <div
      className={`loading${leaving ? ' loading--leaving' : ''}${visible ? ' is-visible' : ''}`}
      role="status"
      aria-label="Loading Kryzect"
      aria-hidden={leaving}
    >
      <div className="loading__content">
        <div className="loading__logo" aria-hidden="true">
          <Logo />
        </div>
        <p className="loading__brand">Kryzect</p>
        <p className="loading__tagline">Think First. Build Better.</p>
      </div>
    </div>
  )
}

export default Loading