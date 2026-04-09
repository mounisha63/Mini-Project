import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Events from './components/Events'
import EventDetails from './components/EventDetails'
import CreateEvent from './components/CreateEvent'
import Profile from './components/Profile'
import Search from './components/Search'

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'React Conference 2024',
      description: 'Annual conference for React developers.',
      date: '2024-05-15',
      category: 'Technology',
      comments: [
        { id: 1, user: 'Alice', message: 'Excited for the talks!', timestamp: new Date().toISOString(), likes: 0, likedBy: [] },
        { id: 2, user: 'Bob', message: 'Will there be workshops?', timestamp: new Date().toISOString(), likes: 2, likedBy: ['Alice', 'Charlie'] }
      ]
    },
    {
      id: 2,
      title: 'JavaScript Meetup',
      description: 'Monthly meetup for JS enthusiasts.',
      date: '2024-06-10',
      category: 'Technology',
      comments: []
    },
    {
      id: 3,
      title: 'Music Festival',
      description: 'Summer music festival with multiple artists.',
      date: '2024-07-20',
      category: 'Entertainment',
      comments: [
        { id: 3, user: 'Dave', message: 'Can\'t wait for the lineup!', timestamp: new Date().toISOString(), likes: 1, likedBy: ['Eve'] }
      ]
    }
  ])

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
    bio: 'Event enthusiast and tech lover.'
  })

  const addEvent = (title, description, date, category) => {
    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      category,
      comments: []
    }
    setEvents([...events, newEvent])
  }

  const editEvent = (id, title, description, date, category) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, title, description, date, category } : event
    ))
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const addComment = (eventId, user, message) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, comments: [...event.comments, { id: Date.now(), user, message, timestamp: new Date().toISOString(), likes: 0, likedBy: [] }] }
        : event
    ))
  }

  const deleteComment = (eventId, commentId) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, comments: event.comments.filter(comment => comment.id !== commentId) }
        : event
    ))
  }

  const likeComment = (eventId, commentId, user) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? {
            ...event,
            comments: event.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    likes: comment.likedBy.includes(user) ? comment.likes - 1 : comment.likes + 1,
                    likedBy: comment.likedBy.includes(user)
                      ? comment.likedBy.filter(u => u !== user)
                      : [...comment.likedBy, user]
                  }
                : comment
            )
          }
        : event
    ))
  }

  const updateProfile = (newUser) => {
    setUser(newUser)
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home events={events} user={user} />} />
            <Route path="/events" element={<Events events={events} />} />
            <Route path="/events/:id" element={
              <EventDetails
                events={events}
                onEditEvent={editEvent}
                onDeleteEvent={deleteEvent}
                onAddComment={addComment}
                onDeleteComment={deleteComment}
                onLikeComment={likeComment}
              />
            } />
            <Route path="/create-event" element={<CreateEvent onAddEvent={addEvent} />} />
            <Route path="/profile" element={<Profile user={user} onUpdateProfile={updateProfile} />} />
            <Route path="/search" element={<Search events={events} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
