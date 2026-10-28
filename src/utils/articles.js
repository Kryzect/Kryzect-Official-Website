export function formatDate(iso) {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00Z`)
  return Number.isNaN(date.getTime())
    ? iso
    : new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date)
}
export function articleWordCount(blocks) {
  return blocks
    .flatMap((block) =>
      block.type === 'figure'
        ? [inlineText(block.caption)]
        : (block.items ?? [block.text ?? '']).map(inlineText),
    )
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function inlineText(value) {
  return typeof value === 'string'
    ? value
    : Array.isArray(value)
      ? value.map((part) => part.text || '').join('')
      : ''
}

export function articleReadingTime(content) {
  return `${Math.max(1, Math.ceil(articleWordCount(content) / 220))} min read`
}

export function isSafeArticleHref(value) {
  if (
    typeof value !== 'string' ||
    value.includes('\\') ||
    [...value].some(
      (character) =>
        character.charCodeAt(0) <= 32 || character.charCodeAt(0) === 127,
    )
  )
    return false
  if (value.startsWith('#')) return value.length > 1
  if (value.startsWith('/')) return !value.startsWith('//')
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    )
  } catch {
    return false
  }
}
