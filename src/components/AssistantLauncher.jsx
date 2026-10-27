import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/assistant.css'

export function AgentIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M16 4v4M13 4h6M8 11h16a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3ZM2 16v5m28-5v5M12 22h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default function AssistantLauncher() {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [Panel, setPanel] = useState(null)
  const [loadError, setLoadError] = useState(false)
  const loading = useRef(false)
  const dialog = useRef(null)
  useEffect(() => setReady(true), [])

  async function loadPanel() {
    if (Panel || loading.current) return
    loading.current = true
    setLoadError(false)
    try {
      const module = await import('./AssistantPanel.jsx')
      setPanel(() => module.default)
    } catch {
      setLoadError(true)
    } finally {
      loading.current = false
    }
  }

  useEffect(() => {
    if (!open) return undefined
    const element = dialog.current
    if (!element?.showModal) {
      setOpen(false)
      return undefined
    }
    element.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const viewport = window.visualViewport
    const resize = () => {
      element.dataset.compactViewport = String(
        (viewport?.height || window.innerHeight) < 480,
      )
      element.style.setProperty(
        '--assistant-viewport-height',
        `${viewport?.height || window.innerHeight}px`,
      )
      element.style.setProperty(
        '--assistant-keyboard-inset',
        `${Math.max(0, window.innerHeight - (viewport?.height || window.innerHeight) - (viewport?.offsetTop || 0))}px`,
      )
    }
    resize()
    // Keep the composer reachable when a mobile keyboard reduces the viewport.
    const revealComposer = () => {
      if ((viewport?.height || window.innerHeight) < 480)
        element
          .querySelector('.assistant-compose')
          ?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
    }
    viewport?.addEventListener('resize', resize)
    viewport?.addEventListener('resize', revealComposer)
    viewport?.addEventListener('scroll', resize)
    return () => {
      element.close()
      document.body.style.overflow = previous
      viewport?.removeEventListener('resize', resize)
      viewport?.removeEventListener('resize', revealComposer)
      viewport?.removeEventListener('scroll', resize)
    }
  }, [open])

  useEffect(() => {
    if (open && Panel) {
      // Touch users choose when to summon the keyboard; opening chat should
      // first expose the conversation and suggestions, not a keyboard overlay.
      if (window.matchMedia('(pointer: coarse)').matches) return
      dialog.current?.querySelector('textarea')?.focus({ preventScroll: true })
      dialog.current
        ?.querySelector('.assistant-compose')
        ?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
    }
  }, [open, Panel])

  return (
    <>
      <button
        type="button"
        className="assistant-launcher"
        disabled={!ready}
        aria-label="Open Kryzect Assistant"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="kryzect-assistant"
        onClick={() => {
          setOpen(true)
          void loadPanel()
        }}
      >
        <AgentIcon />
      </button>
      <dialog
        ref={dialog}
        id="kryzect-assistant"
        className="assistant-dialog"
        aria-labelledby="assistant-title"
        aria-describedby="assistant-subtitle"
        onCancel={(event) => {
          event.preventDefault()
          setOpen(false)
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const box = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            setOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const controls = [
            ...event.currentTarget.querySelectorAll(
              'button:not(:disabled), a[href], textarea:not(:disabled)',
            ),
          ].filter((element) => element.getClientRects().length)
          const first = controls[0],
            last = controls.at(-1)
          if (!first) return
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              !controls.includes(document.activeElement))
          ) {
            event.preventDefault()
            last.focus()
          } else if (
            !event.shiftKey &&
            (document.activeElement === last ||
              !controls.includes(document.activeElement))
          ) {
            event.preventDefault()
            first.focus()
          }
        }}
      >
        <header className="assistant-header">
          <span className="assistant-header__icon">
            <AgentIcon />
          </span>
          <div>
            <h2 id="assistant-title">Kryzect Assistant</h2>
            <p id="assistant-subtitle">Services, products & project guidance</p>
          </div>
          <button
            type="button"
            className="assistant-close"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m6 6 12 12M6 18 18 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        {Panel ? (
          <Panel open={open} />
        ) : (
          <div className="assistant-loading">
            {loadError ? (
              <>
                <p>The chat could not load. You can still reach us directly.</p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => void loadPanel()}
                >
                  Try loading again
                </button>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Contact Kryzect
                </Link>
              </>
            ) : (
              <p role="status">Opening the assistant…</p>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
