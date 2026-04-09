import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎉 EventHub</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>
            📅 Events
          </Link>
        </li>
        <li>
          <Link to="/create-event" className={location.pathname === '/create-event' ? 'active' : ''}>
            ➕ Create Event
          </Link>
        </li>
        <li>
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>
            🔍 Search
          </Link>
        </li>
        <li>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            👤 Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar