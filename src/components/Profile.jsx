import { useState } from 'react'
import './Profile.css'

function Profile({ user, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editUser, setEditUser] = useState(user)

  const handleSave = () => {
    onUpdateProfile(editUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditUser(user)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">
            {user.avatar}
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          {!isEditing && (
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={editUser.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <div className="bio-section">
              <h2>About Me</h2>
              <p>{user.bio}</p>
            </div>

            <div className="stats-section">
              <h2>Activity</h2>
              <div className="stats">
                <div className="stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Events Created</span>
                </div>
                <div className="stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Comments</span>
                </div>
                <div className="stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Likes Given</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile