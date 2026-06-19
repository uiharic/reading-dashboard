import { useState, useEffect } from 'react'
import FilterBar from './components/FilterBar'
import EntryList from './components/EntryList'

const LS_KEY = 'reading-dashboard:readStates'

function loadReadStates() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveReadState(id, value) {
  const stored = loadReadStates()
  stored[id] = value
  localStorage.setItem(LS_KEY, JSON.stringify(stored))
}

export default function App() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/entries.json`)
      .then(r => r.json())
      .then(data => {
        const stored = loadReadStates()
        // Merge: localStorage wins over default read value in JSON
        const merged = data.map(e => ({
          ...e,
          read: stored[e.id] !== undefined ? stored[e.id] : e.read,
        }))
        setEntries(merged)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggleRead = (id) => {
    setEntries(prev => {
      const next = prev.map(e =>
        e.id === id ? { ...e, read: !e.read } : e
      )
      const updated = next.find(e => e.id === id)
      saveReadState(id, updated.read)
      return next
    })
  }

  const allTags = [...new Set(entries.flatMap(e => e.tags))].sort()

  const visible = entries
    .filter(e => sourceFilter === 'all' || e.source === sourceFilter)
    .filter(e => !tagFilter || e.tags.includes(tagFilter))
    .filter(e => !dateFrom || e.date >= dateFrom)
    .filter(e => !dateTo || e.date <= dateTo)
    .filter(e => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Reading Dashboard</h1>
      </header>
      <main className="app-main">
        <FilterBar
          search={search}
          onSearch={setSearch}
          sourceFilter={sourceFilter}
          onSourceFilter={setSourceFilter}
          tagFilter={tagFilter}
          onTagFilter={setTagFilter}
          allTags={allTags}
          dateFrom={dateFrom}
          onDateFrom={setDateFrom}
          dateTo={dateTo}
          onDateTo={setDateTo}
        />
        {loading ? (
          <p className="loading">Loading…</p>
        ) : (
          <EntryList entries={visible} onToggleRead={toggleRead} />
        )}
      </main>
    </div>
  )
}
