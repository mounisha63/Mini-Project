import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateEvent.css'

function CreateEvent({ onAddEvent }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Technology'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.description && formData.date && formData.category) {
      onAddEvent(formData.title, formData.description, formData.date, formData.category)
      navigate('/events')
    }
  }

  return (
    <div className="create-event">
      <div className="form-container">
        <h1>🎉 Create New Event</h1>
        <p>Share amazing events with the community!</p>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Event Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows="6"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/events')}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              🚀 Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent