import EntryCard from './EntryCard'

export default function EntryList({ entries, onToggleRead }) {
  if (entries.length === 0) {
    return <p className="empty">No entries found.</p>
  }

  return (
    <div className="entry-list">
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} onToggleRead={onToggleRead} />
      ))}
    </div>
  )
}
