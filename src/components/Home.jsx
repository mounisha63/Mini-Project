import { Link } from 'react-router-dom'
import './Home.css'

function Home({ events, user }) {
  const totalEvents = events.length
  const totalComments = events.reduce((sum, event) => sum + event.comments.length, 0)
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length
  const categories = [...new Set(events.map(event => event.category))]

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to EventHub, {user.name}!</h1>
        <p>Discover, discuss, and connect through amazing events.</p>
        <div className="hero-actions">
          <Link to="/events" className="btn-primary">Browse Events</Link>
          <Link to="/create-event" className="btn-secondary">Create Event</Link>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>{totalEvents}</h3>
          <p>Total Events</p>
        </div>
        <div className="stat-card">
          <h3>{totalComments}</h3>
          <p>Comments</p>
        </div>
        <div className="stat-card">
          <h3>{upcomingEvents}</h3>
          <p>Upcoming Events</p>
        </div>
        <div className="stat-card">
          <h3>{categories.length}</h3>
          <p>Categories</p>
        </div>
      </div>

      <div className="recent-events">
        <h2>Recent Events</h2>
        <div className="events-grid">
          {events.slice(0, 3).map(event => (
            <Link key={event.id} to={`/events/${event.id}`} className="event-preview">
              <h3>{event.title}</h3>
              <p>{event.description.substring(0, 100)}...</p>
              <span className="category">{event.category}</span>
              <span className="date">{new Date(event.date).toLocaleDateString()}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {categories.map(category => (
            <Link key={category} to={`/search?category=${category}`} className="category-card">
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home