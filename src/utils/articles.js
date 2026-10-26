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
    .flatMap((block) => block.items ?? [block.text ?? ''])
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}
