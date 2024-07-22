import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import Homepage from './pages/Homepage.jsx'
import InnokshetraPage from './pages/InnokshetraPage.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/innokshetra" element={<InnokshetraPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
)
