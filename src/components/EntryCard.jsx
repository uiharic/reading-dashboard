import { formatDate } from '../utils/date'

const SOURCE_LABEL = { facebook: 'Facebook', x: 'X' }

export default function EntryCard({ entry, onToggleRead }) {
  return (
    <article className={`entry-card${entry.read ? ' entry-card--read' : ''}`}>
      <div className="entry-card__meta">
        <span className={`source-badge source-badge--${entry.source}`}>
          {SOURCE_LABEL[entry.source] ?? entry.source}
        </span>
        <span className="entry-card__date">{formatDate(entry.date)}</span>
      </div>

      <h2 className="entry-card__title">
        <a href={entry.url} target="_blank" rel="noopener noreferrer">
          {entry.title}
        </a>
      </h2>

      {entry.summary && (
        <p className="entry-card__summary">{entry.summary}</p>
      )}

      {entry.tags.length > 0 && (
        <div className="entry-card__tags">
          {entry.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <button
        className={`read-btn${entry.read ? ' read-btn--read' : ''}`}
        onClick={() => onToggleRead(entry.id)}
      >
        {entry.read ? 'Mark unread' : 'Mark read'}
      </button>
    </article>
  )
}
