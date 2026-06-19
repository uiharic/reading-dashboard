const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Parse ISO date string directly to avoid timezone off-by-one on mobile.
// Never use new Date(dateStr) for display — it parses as UTC midnight which
// shifts the date back by one in negative-offset timezones.
export function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

// Build today's date string using local time components, not UTC.
export function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
