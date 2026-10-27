import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ASSISTANT_LIMITS,
  ASSISTANT_SUGGESTIONS,
  assistantErrorMessage,
} from '../utils/assistant.js'
import '../styles/assistant-panel.css'
import { sourceAnswer } from '../utils/assistant-sources.js'

function safeHref(value) {
  return (
    typeof value === 'string' &&
    (/^\/[a-z0-9/-]*$/.test(value) ||
      value === 'https://github.com/aliamirchoudhary')
  )
}

function normalizeReply(value) {
  if (
    !value ||
    typeof value.answer !== 'string' ||
    !value.answer.trim() ||
    value.answer.length > ASSISTANT_LIMITS.answer ||
    !Array.isArray(value.sources) ||
    !Array.isArray(value.actions)
  )
    throw new Error('Invalid reply')
  return {
    role: 'assistant',
    content: value.answer,
    sources: value.sources
      .slice(0, 4)
      .filter(
        (item) =>
          typeof item.label === 'string' &&
          item.label.length < 120 &&
          safeHref(item.href),
      ),
    actions: value.actions
      .slice(0, 3)
      .filter(
        (item) =>
          typeof item.label === 'string' &&
          item.label.length < 80 &&
          safeHref(item.href),
      ),
  }
}

function contextFor(messages) {
  const history = []
  let length = 0
  for (const item of [...messages].reverse()) {
    if (
      history.length >= ASSISTANT_LIMITS.historyItems ||
      length + item.content.length > ASSISTANT_LIMITS.historyTotal
    )
      break
    history.unshift({ role: item.role, content: item.content })
    length += item.content.length
  }
  return history
}

export default function AssistantPanel({ open }) {
  const [aiEnabled, setAiEnabled] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState(null)
  const [sourcePreview, setSourcePreview] = useState(null)
  const [limited, setLimited] = useState(false)
  const controller = useRef(null)
  const pending = useRef(false)
  const serial = useRef(0)
  const sessionId = useRef(null)
  const log = useRef(null)
  const input = useRef(null)
  const abortReason = useRef('')
  const retryTimer = useRef(null)

  useEffect(() => {
    const request = new AbortController()
    const timeout = setTimeout(() => request.abort(), 5000)
    fetch('/api/assistant?config=1', {
      signal: request.signal,
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) return
        const config = await response.json()
        if (!request.signal.aborted) setAiEnabled(config.aiEnabled === true)
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
    return () => {
      clearTimeout(timeout)
      request.abort()
    }
  }, [])

  useEffect(() => {
    if (!open && controller.current) {
      abortReason.current = 'stopped'
      controller.current.abort()
    }
  }, [open])
  useEffect(
    () => () => {
      serial.current++
      controller.current?.abort()
      clearTimeout(retryTimer.current)
    },
    [],
  )
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight
  }, [messages, busy, failure, sourcePreview])

  function clear() {
    serial.current++
    controller.current?.abort()
    controller.current = null
    pending.current = false
    setMessages([])
    setDraft('')
    setFailure(null)
    setSourcePreview(null)
    setBusy(false)
    input.current?.focus()
    // Keep rate-limit state and the session ID: clearing is not a quota reset.
  }

  async function send(question, retry = null) {
    question = question.trim()
    if (
      pending.current ||
      limited ||
      !question ||
      question.length > ASSISTANT_LIMITS.message
    )
      return
    if (!aiEnabled) {
      const history = contextFor(messages)
      setMessages((current) => [
        ...current,
        { role: 'user', content: question },
        { ...sourceAnswer(question, history), directSource: true },
      ])
      setDraft('')
      setFailure(null)
      return
    }
    pending.current = true
    setBusy(true)
    setFailure(null)
    setSourcePreview(null)
    const history = retry?.history || contextFor(messages)
    if (!retry) {
      setMessages((current) => [
        ...current,
        { role: 'user', content: question },
      ])
      setDraft('')
    }
    const id = ++serial.current
    const request = new AbortController()
    controller.current = request
    abortReason.current = ''
    const sourceTimer = setTimeout(() => {
      if (serial.current !== id || request.signal.aborted) return
      const source = sourceAnswer(question, history)
      if (source.matched) setSourcePreview({ ...source, preview: true })
    }, 1800)
    const timeout = setTimeout(() => {
      abortReason.current = 'timeout'
      request.abort()
    }, 36000)
    let allowSourceFallback = true
    try {
      sessionId.current ||= crypto.randomUUID()
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history,
          sessionId: sessionId.current,
          adultConfirmed: true,
        }),
        signal: request.signal,
        credentials: 'same-origin',
      })
      if (!response.ok) {
        allowSourceFallback = response.status >= 500
        if (response.status === 429) {
          setLimited(true)
          const seconds = Math.min(
            86400,
            Math.max(1, Number(response.headers.get('Retry-After')) || 60),
          )
          clearTimeout(retryTimer.current)
          retryTimer.current = setTimeout(
            () => setLimited(false),
            seconds * 1000,
          )
        }
        const error = new Error(assistantErrorMessage(response.status))
        error.public = true
        throw error
      }
      const text = await response.text()
      if (text.length > 20000) throw new Error('Invalid reply')
      const reply = normalizeReply(JSON.parse(text))
      if (serial.current === id) setMessages((current) => [...current, reply])
    } catch (error) {
      if (
        serial.current === id &&
        allowSourceFallback &&
        (!request.signal.aborted || abortReason.current === 'timeout')
      ) {
        const reply = sourceAnswer(question, history)
        setMessages((current) => [...current, reply])
      } else if (serial.current === id)
        setFailure({
          question,
          history,
          message: request.signal.aborted
            ? abortReason.current === 'stopped'
              ? 'Reply stopped. Your message is kept here so you can retry.'
              : 'The reply took too long. Your message is kept here so you can retry, or contact us directly.'
            : error.public
              ? error.message
              : assistantErrorMessage(503),
        })
    } finally {
      clearTimeout(timeout)
      clearTimeout(sourceTimer)
      if (serial.current === id) {
        setSourcePreview(null)
        pending.current = false
        controller.current = null
        setBusy(false)
      }
    }
  }

  return (
    <>
      <div
        ref={log}
        className="assistant-messages"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={busy}
      >
        <div className="assistant-welcome">
          <p className="assistant-welcome__title">
            What would you like to build?
          </p>
          <p>
            Ask about Kryzect’s services, products, founder, or how we could
            help your business.
          </p>
          {!messages.length && (
            <div className="assistant-suggestions">
              {ASSISTANT_SUGGESTIONS.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => void send(question)}
                  disabled={busy || limited}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
        {[...messages, ...(sourcePreview ? [sourcePreview] : [])].map(
          (message, index) => (
            <article
              className={`assistant-message assistant-message--${message.role}`}
              key={index}
            >
              <p className="assistant-message__author">
                {message.role === 'user'
                  ? 'You'
                  : message.preview
                    ? 'Saved source · AI reply loading'
                    : message.directSource
                      ? 'Saved source answer'
                      : message.mode === 'source'
                        ? 'Saved source answer · AI unavailable'
                        : 'Kryzect Assistant'}
              </p>
              <p className="assistant-message__text">{message.content}</p>
              {message.sources?.length > 0 && (
                <div className="assistant-sources" aria-label="Sources">
                  {message.sources.map((source) => (
                    <a
                      href={source.href}
                      key={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
              {message.actions?.length > 0 && (
                <div className="assistant-actions">
                  {message.actions.map((action) => (
                    <a
                      href={action.href}
                      key={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {action.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
              {message.suggestions?.length > 0 && (
                <div
                  className="assistant-suggestions"
                  aria-label="Clarify your question"
                >
                  {message.suggestions.map((question) => (
                    <button
                      type="button"
                      key={question}
                      disabled={busy || limited}
                      onClick={() => void send(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </article>
          ),
        )}
        {busy && (
          <p className="assistant-pending" role="status">
            Preparing a reply…
          </p>
        )}
        {failure && (
          <div className="assistant-failure" role="alert">
            <p>{failure.message}</p>
            <button
              type="button"
              disabled={limited || busy}
              onClick={() => void send(failure.question, failure)}
            >
              Retry message
            </button>
          </div>
        )}
      </div>
      <div className="assistant-footer">
        <p className="assistant-privacy">
          {aiEnabled
            ? '18+ by sending. AI providers process messages; avoid sensitive information.'
            : 'Answers from saved public information. Messages stay in this page.'}{' '}
          <Link to="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy<span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </p>
        <form
          className="assistant-compose"
          onSubmit={(event) => {
            event.preventDefault()
            void send(draft)
          }}
        >
          <label className="sr-only" htmlFor="assistant-message">
            Message Kryzect Assistant
          </label>
          <textarea
            ref={input}
            id="assistant-message"
            rows={2}
            value={draft}
            maxLength={ASSISTANT_LIMITS.message}
            placeholder="Tell us what you have in mind…"
            aria-describedby="assistant-message-count"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault()
                void send(draft)
              }
            }}
          />
          <div className="assistant-compose__tools">
            <span id="assistant-message-count">
              {draft.length}/{ASSISTANT_LIMITS.message}
            </span>
            <button
              type="button"
              className="assistant-clear"
              aria-label="Clear chat"
              onClick={clear}
              disabled={!messages.length && !draft && !failure}
            >
              Clear
            </button>
            {busy ? (
              <button
                type="button"
                className="assistant-send"
                aria-label="Stop reply"
                onClick={() => {
                  abortReason.current = 'stopped'
                  controller.current?.abort()
                }}
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="assistant-send"
                aria-label="Send message"
                disabled={!draft.trim() || limited}
              >
                Send
              </button>
            )}
          </div>
        </form>
        <div className="assistant-footer__bottom">
          <p className="assistant-human">
            <Link to="/contact" target="_blank" rel="noopener noreferrer">
              Contact Kryzect
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/book-a-call" target="_blank" rel="noopener noreferrer">
              Book a call
            </Link>
          </p>
          <p className="assistant-disclaimer">
            {aiEnabled ? 'AI may err. ' : ''}Confirm scope and pricing with us.
          </p>
        </div>
      </div>
    </>
  )
}
