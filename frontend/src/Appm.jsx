import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Auth Context Provider
import { AuthProvider } from './context/AuthContext'

// Route Protection Components
import ProtectedRoute from './components/routing/ProtectedRoute'
import AdminRoute from './components/routes/AdminRoute'

// Pages
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/AdminDashboard'
import Projects from './pages/Projects'
import Events from './pages/Events'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4500)
  }, [])

  if (loading) {
    return <Loader />
  } else {
    return (
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={5000} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    )
  }
}

export default App
