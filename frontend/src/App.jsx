import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components
import Navbar from "./components/layout/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard"; // Alumni dashboard
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSettings from "./pages/admin/AdminSettings";
import AlumniDirectory from "./pages/AlumniDirectory";
import PrivateRoute from "./components/routing/PrivateRoute";

// Role-based route component
const RoleRoute = ({ element, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (user.role === 'student') {
      return <Navigate to="/student/dashboard" />;
    } else {
      return <Navigate to="/alumni/dashboard" />;
    }
  }
  
  return element;
};

function App() {
  return (
    <AuthProvider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        
        {/* Protected Routes for all authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
        </Route>
        
        {/* Alumni Routes */}
        <Route path="/alumni/dashboard" element={
          <RoleRoute element={<Dashboard />} allowedRoles={['alumni', 'admin']} />
        } />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          <RoleRoute element={<StudentDashboard />} allowedRoles={['student', 'admin']} />
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <RoleRoute element={<AdminDashboard />} allowedRoles={['admin']} />
        } />
        <Route path="/admin/users" element={
          <RoleRoute element={<AdminUsers />} allowedRoles={['admin']} />
        } />
        <Route path="/admin/events" element={
          <RoleRoute element={<AdminEvents />} allowedRoles={['admin']} />
        } />
        <Route path="/admin/settings" element={
          <RoleRoute element={<AdminSettings />} allowedRoles={['admin']} />
        } />
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
