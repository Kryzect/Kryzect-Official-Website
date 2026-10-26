export const ASSISTANT_LIMITS = Object.freeze({
  message: 1600,
  historyItems: 8,
  historyMessage: 2400,
  historyTotal: 9000,
  requestBytes: 24000,
  answer: 2200,
})

export const ASSISTANT_SUGGESTIONS = [
  'What can Kryzect build for my business?',
  'Can you automate a repetitive workflow?',
  'Tell me about IncidentIQ.',
  'Who is behind Kryzect?',
]

export function validateAssistantRequest(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  if (
    Object.keys(value).some(
      (key) =>
        !['message', 'history', 'sessionId', 'adultConfirmed'].includes(key),
    )
  )
    return null
  const { message, history = [], sessionId, adultConfirmed } = value
  if (adultConfirmed !== true) return null
  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > ASSISTANT_LIMITS.message
  )
    return null
  if (typeof sessionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(sessionId))
    return null
  if (!Array.isArray(history) || history.length > ASSISTANT_LIMITS.historyItems)
    return null
  let length = 0
  const normalized = []
  for (const item of history) {
    if (
      !item ||
      typeof item !== 'object' ||
      Array.isArray(item) ||
      Object.keys(item).some((key) => !['role', 'content'].includes(key))
    )
      return null
    if (
      !['user', 'assistant'].includes(item.role) ||
      typeof item.content !== 'string' ||
      !item.content.trim() ||
      item.content.length > ASSISTANT_LIMITS.historyMessage
    )
      return null
    length += item.content.length
    normalized.push({ role: item.role, content: item.content.trim() })
  }
  if (length > ASSISTANT_LIMITS.historyTotal) return null
  return { message: message.trim(), history: normalized, sessionId }
}

export function assistantErrorMessage(status) {
  if (status === 429)
    return 'The assistant has reached its current message limit. Please try again later, or contact Kryzect directly.'
  if (status === 400 || status === 413)
    return 'Please shorten your message and try again.'
  return 'The assistant is unavailable right now. You can still contact Kryzect or book a call below.'
}
