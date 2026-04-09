import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './EventDetails.css'

function EventDetails({ events, onEditEvent, onDeleteEvent, onAddComment, onDeleteComment, onLikeComment }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const event = events.find(e => e.id === parseInt(id))

  if (!event) {
    return <div className="event-not-found">Event not found</div>
  }

  if (isEditing && !editTitle) {
    setEditTitle(event.title)
    setEditDescription(event.description)
    setEditDate(event.date)
    setEditCategory(event.category)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    onEditEvent(event.id, editTitle, editDescription, editDate, editCategory)
    setIsEditing(false)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (user && message) {
      onAddComment(event.id, user, message)
      setUser('')
      setMessage('')
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(event.id)
      navigate('/events')
    }
  }

  return (
    <div className="event-details">
      <div className="action-buttons">
        <button className="back-btn" onClick={() => navigate('/events')}>← Back to Events</button>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : '✏️ Edit Event'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>🗑️ Delete Event</button>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Event Description"
            required
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            required
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            required
          >
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
          <button type="submit">💾 Save Changes</button>
        </form>
      ) : (
        <div className="event-info">
          <div className="event-header">
            <h1>{event.title}</h1>
            <span className="category">{event.category}</span>
          </div>
          <p className="description">{event.description}</p>
          <div className="event-meta">
            <span className="date">📅 {new Date(event.date).toLocaleDateString()}</span>
            <span className="comments-count">💬 {event.comments.length} comments</span>
          </div>
        </div>
      )}

      <div className="discussion">
        <h2>💬 Discussion</h2>
        <div className="comments">
          {event.comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-content">
                <strong>{comment.user}:</strong> {comment.message}
                <small className="timestamp">({new Date(comment.timestamp).toLocaleString()})</small>
              </div>
              <div className="comment-actions">
                <button
                  className={`like-btn ${comment.likedBy.includes(user) ? 'liked' : ''}`}
                  onClick={() => onLikeComment(event.id, comment.id, user || 'Anonymous')}
                >
                  ❤️ {comment.likes}
                </button>
                <button className="delete-btn" onClick={() => onDeleteComment(event.id, comment.id)}>🗑️</button>
              </div>
            </div>
          ))}
          {event.comments.length === 0 && (
            <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <textarea
            placeholder="Share your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">💬 Post Comment</button>
        </form>
      </div>
    </div>
  )
}

export default EventDetails