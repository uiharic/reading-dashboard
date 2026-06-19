export default function FilterBar({
  search, onSearch,
  sourceFilter, onSourceFilter,
  tagFilter, onTagFilter,
  allTags,
}) {
  const sources = ['all', 'facebook', 'x']
  const sourceLabel = { all: 'All', facebook: 'Facebook', x: 'X' }

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="search"
        placeholder="Search title or summary…"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />

      <div className="filter-group">
        <span className="filter-label">Source:</span>
        {sources.map(s => (
          <button
            key={s}
            className={`filter-btn${sourceFilter === s ? ' filter-btn--active' : ''}`}
            onClick={() => onSourceFilter(s)}
          >
            {sourceLabel[s]}
          </button>
        ))}
      </div>

      {allTags.length > 0 && (
        <div className="filter-group">
          <span className="filter-label">Tag:</span>
          <button
            className={`filter-btn${tagFilter === '' ? ' filter-btn--active' : ''}`}
            onClick={() => onTagFilter('')}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn${tagFilter === tag ? ' filter-btn--active' : ''}`}
              onClick={() => onTagFilter(tagFilter === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
