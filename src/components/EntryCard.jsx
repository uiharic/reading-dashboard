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

      <h2 className="entry-card__title">{entry.title}</h2>

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

      <div className="entry-card__actions">
        <button
          className={`read-btn${entry.read ? ' read-btn--read' : ''}`}
          onClick={() => onToggleRead(entry.id)}
        >
          {entry.read ? 'Mark unread' : 'Mark read'}
        </button>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            ดูต้นทาง ↗
          </a>
        )}
      </div>
    </article>
  )
}
