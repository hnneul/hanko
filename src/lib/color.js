export function normalizeHex(value) {
  const digits = String(value ?? '').trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(digits)) {
    return `#${[...digits].map((digit) => digit.repeat(2)).join('')}`.toUpperCase()
  }
  if (/^[0-9a-f]{6}$/i.test(digits)) return `#${digits}`.toUpperCase()
  return null
}

