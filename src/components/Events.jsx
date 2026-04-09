import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Events.css'

function Events({ events }) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const categories = ['all', ...new Set(events.map(event => event.category))]

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    return event.category === filter
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date)
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'comments') {
      return b.comments.length - a.comments.length
    }
    return 0
  })

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>All Events</h1>
        <Link to="/create-event" className="create-btn">+ Create New Event</Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="comments">Most Discussed</option>
          </select>
        </div>
      </div>

      <div className="events-grid">
        {sortedEvents.map(event => (
          <Link key={event.id} to={`/events/${event.id}`} className="event-card">
            <div className="event-header">
              <h3>{event.title}</h3>
              <span className="category">{event.category}</span>
            </div>
            <p className="description">{event.description}</p>
            <div className="event-footer">
              <span className="date">📅 {new Date(event.date).toLocaleDateString()}</span>
              <span className="comments-count">💬 {event.comments.length}</span>
            </div>
          </Link>
        ))}
      </div>

      {sortedEvents.length === 0 && (
        <div className="no-events">
          <h3>No events found</h3>
          <p>Try adjusting your filters or create a new event!</p>
          <Link to="/create-event" className="create-btn">Create Event</Link>
        </div>
      )}
    </div>
  )
}

export default Events