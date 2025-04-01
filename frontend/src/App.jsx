import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AlumniLayout from './components/layout/AlumniLayout';

// Import your components
import Navbar from "./components/layout/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard"; // Alumni dashboard
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
// import AlumniDirectory from "./pages/alumni/AlumniDirectory";
import PrivateRoute from "./components/routing/PrivateRoute";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import AlumniLayout from './components/layout/AlumniLayout';
import AlumniDashboard from './pages/alumni/AlumniDashboard';
import AlumniDirectory from './pages/alumni/AlumniDirectory';
import AlumniEvents from './pages/alumni/AlumniEvents';
import AlumniJobs from './pages/alumni/AlumniJobs';
import AlumniMentorship from './pages/alumni/AlumniMentorship';
import AlumniProjects from './pages/alumni/AlumniProjects';
import AlumniDonations from './pages/alumni/AlumniDonations';
import AlumniResources from './pages/alumni/AlumniResources';
import AlumniForums from './pages/alumni/AlumniForums';
import AlumniProfile from './pages/alumni/AlumniProfile';

import MentorshipRequest from "./components/student/MentorshipRequest";
import JobPosting from "./components/alumni/JobPosting";

// Import new pages
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailsPage from "./pages/jobs/JobDetailsPage";
import MentorshipPage from "./pages/mentorship/MentorshipPage";
import FindMentorPage from "./pages/mentorship/FindMentorPage";
import MentorshipRequestDetailsPage from "./pages/mentorship/MentorshipRequestDetailsPage";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import AnnouncementDetailsPage from "./pages/announcements/AnnouncementDetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MembershipPage from "./pages/membership/MembershipPage";
import MembershipPaymentPage from "./pages/membership/MembershipPaymentPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import AdminMemberships from "./pages/admin/AdminMemberships";

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
        
        {/* Alumni Routes with layout */}
        <Route path="/alumni" element={<AlumniLayout />}>
          <Route index element={<AlumniDashboard />} />
          <Route path="directory" element={<AlumniDirectory />} />
          <Route path="events" element={<AlumniEvents />} />
          <Route path="jobs" element={<AlumniJobs />} />
          <Route path="mentorship" element={<AlumniMentorship />} />
          <Route path="projects" element={<AlumniProjects />} />
          <Route path="donations" element={<AlumniDonations />} />
          <Route path="resources" element={<AlumniResources />} />
          <Route path="forums" element={<AlumniForums />} />
          <Route path="profile" element={<AlumniProfile />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          <RoleRoute element={<StudentDashboard />} allowedRoles={['student']} />
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
        <Route path='/admin/projects' element={
          <RoleRoute element={<AdminProjects />} allowedRoles={['admin']} />
        }/>
        <Route path='/admin/payments' element={
          <RoleRoute element={<AdminPayments />} allowedRoles={['admin']} />
        }/>
        <Route path="/admin/settings" element={
          <RoleRoute element={<AdminSettings />} allowedRoles={['admin']} />
        } />
        <Route path="/admin/memberships" element={
          <RoleRoute element={<AdminMemberships />} allowedRoles={['admin']} />
        } />
        
        {/* Payment Routes */}
        <Route path="/payment/:type/:id" element={
          <PrivateRoute element={<PaymentPage />} />
        } />
        <Route path="/payment/:type" element={
          <PrivateRoute element={<PaymentPage />} />
        } />
        <Route path="/payment/success" element={
          <PrivateRoute element={<PaymentSuccess />} />
        } />
        <Route path="/payment/membership/:paymentId" element={<PrivateRoute element={<MembershipPaymentPage />} />} />
        
        {/* Mentorship Routes */}
        <Route path="/mentorship/request/:mentorId" element={
          <RoleRoute element={<MentorshipRequest />} allowedRoles={['student']} />
        } />
        <Route path="/jobs/post" element={
          <RoleRoute element={<JobPosting />} allowedRoles={['alumni', 'admin']} />
        } />
        
        {/* Event routes */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />

        {/* Job routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        {/* Mentorship routes */}
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/mentorship/find" element={<FindMentorPage />} />
        <Route path="/mentorship/requests/:id" element={<MentorshipRequestDetailsPage />} />

        {/* Announcement routes */}
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:id" element={<AnnouncementDetailsPage />} />

        {/* Profile route */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/membership" element={<PrivateRoute element={<MembershipPage />} />} />
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
