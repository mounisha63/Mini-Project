# Event Discussion Platform

A responsive and interactive React-based platform for discussing events with full navigation and multiple modules. Built with Vite and React Router for fast development.

## Features

- **Navigation System**: Full routing between different pages
- **Dashboard (Home)**: Overview with statistics and recent events
- **Event Management**: View, create, edit, and delete events
- **Discussion System**: Add comments with likes and delete functionality
- **Search & Filter**: Advanced search with category filtering
- **User Profile**: Editable user profile with activity stats
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Attractive UI**: Modern design with gradients, animations, and hover effects

## Navigation Structure

- **🏠 Home**: Dashboard with stats and featured events
- **📅 Events**: Browse all events with filtering and sorting
- **➕ Create Event**: Form to add new events
- **🔍 Search**: Search events by title/description and category
- **👤 Profile**: User profile management

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used

- React 19 with React Router DOM
- Vite for build tooling
- CSS with responsive design
- React Hooks for state management

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css     # Navigation bar
│   ├── Home.jsx & Home.css         # Dashboard page
│   ├── Events.jsx & Events.css     # Events listing page
│   ├── EventDetails.jsx & EventDetails.css  # Event details page
│   ├── CreateEvent.jsx & CreateEvent.css    # Event creation form
│   ├── Profile.jsx & Profile.css    # User profile page
│   └── Search.jsx & Search.css      # Search page
├── App.jsx                         # Main app with routing
├── App.css                         # Global styles
├── main.jsx                        # Entry point
└── index.css                       # Base styles
```

## Interactive Features

- **Event CRUD**: Create, read, update, delete events
- **Comments**: Add, like, and delete comments
- **Search**: Real-time search with URL parameters
- **Filtering**: Filter by category and sort by date/title/popularity
- **Profile Editing**: Update user information
- **Responsive Navigation**: Mobile-friendly menu

The platform now provides a complete event management and discussion experience with professional navigation and modular architecture!

## Interactive Features

- **Add Events**: Click "Add New Event" to create new events
- **Edit Events**: In event details, click "Edit Event" to modify
- **Delete Events**: Remove events with the delete button
- **Comment**: Add comments to events
- **Like Comments**: Click the heart icon to like/unlike comments
- **Delete Comments**: Remove comments with the trash icon
- **Responsive**: Automatically adjusts to screen size
