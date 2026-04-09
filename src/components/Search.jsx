import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Search.css'

function Search({ events }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')

  const categories = ['all', ...new Set(events.map(event => event.category))]

  const results = useMemo(() => {
    return events.filter(event => {
      const matchesQuery = query === '' ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = category === 'all' || event.category === category

      return matchesQuery && matchesCategory
    })
  }, [query, category, events])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category !== 'all') params.set('category', category)
    setSearchParams(params)
  }

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>🔍 Search Events</h1>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="search-results">
          <h2>Search Results ({results.length})</h2>

          {results.length === 0 ? (
            <div className="no-results">
              <p>No events found matching your search.</p>
              <p>Try different keywords or browse all events.</p>
              <Link to="/events" className="browse-btn">Browse All Events</Link>
            </div>
          ) : (
            <div className="results-grid">
              {results.map(event => (
                <Link key={event.id} to={`/events/${event.id}`} className="result-card">
                  <div className="result-header">
                    <h3>{event.title}</h3>
                    <span className="category">{event.category}</span>
                  </div>
                  <p className="description">
                    {event.description.length > 150
                      ? event.description.substring(0, 150) + '...'
                      : event.description
                    }
                  </p>
                  <div className="result-footer">
                    <span className="date">📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span className="comments">💬 {event.comments.length}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search