import axios from 'axios';

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
axios.defaults.withCredentials = true; // Important for sending cookies

// Request interceptor to handle errors
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized request - redirecting to login');
      // You could redirect to login here or handle in your components
    }
    return Promise.reject(error);
  }
);

// Admin API services
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => axios.get('/api/admin/dashboard'),
  
  // Users
  getAllUsers: () => axios.get('/api/admin/users'),
  getUserById: (id) => axios.get(`/api/admin/users/${id}`),
  updateUser: (id, userData) => axios.put(`/api/admin/users/${id}`, userData),
  deleteUser: (id) => axios.delete(`/api/admin/users/${id}`),
  verifyUser: (id) => axios.post(`/api/admin/users/${id}/verify`),
  
  // Events
  getAllEvents: () => axios.get('/api/admin/events'),
  getEventById: (id) => axios.get(`/api/admin/events/${id}`),
  createEvent: (eventData) => axios.post('/api/admin/events', eventData),
  updateEvent: (id, eventData) => axios.put(`/api/admin/events/${id}`, eventData),
  deleteEvent: (id) => axios.delete(`/api/admin/events/${id}`),
  
  // Settings
  getSettings: () => axios.get('/api/admin/settings'),
  updateSettings: (settingsData) => axios.put('/api/admin/settings', settingsData)
};

// Public API services
export const publicAPI = {
  // Events
  getPublicEvents: () => axios.get('/api/events'),
  getEventById: (id) => axios.get(`/api/events/${id}`)
};

// User API services
export const userAPI = {
  // Profile
  updateProfile: (profileData) => axios.put('/api/users/profile', profileData),
  getProfile: () => axios.get('/api/users/profile')
};

// Auth API
export const authAPI = {
  register: (userData) => axios.post('/auth/register', userData),
  login: (email, password) => axios.post('/auth/login', { email, password }),
  getCurrentUser: () => axios.get('/auth/me'),
  verifyEmail: (token) => axios.get(`/auth/verify-email/${token}`),
  forgotPassword: (email) => axios.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => axios.put(`/auth/reset-password/${token}`, { password }),
  updateProfile: (profileData) => axios.put('/auth/update-profile', profileData)
};

// Events API
export const eventsAPI = {
  getPublishedEvents: () => axios.get('/events'),
  getUpcomingEvents: () => axios.get('/events/upcoming'),
  registerForEvent: (eventId) => axios.post(`/events/${eventId}/register`),
  // Admin endpoints
  getAllEvents: () => axios.get('/events/admin'),
  createEvent: (eventData) => axios.post('/events/admin', eventData),
  updateEvent: (eventId, eventData) => axios.put(`/events/admin/${eventId}`, eventData),
  deleteEvent: (eventId) => axios.delete(`/events/admin/${eventId}`)
};

// Projects API
export const projectsAPI = {
  getProjects: () => axios.get('/projects'),
  getRecentProjects: () => axios.get('/projects/recent'),
  createProject: (projectData) => axios.post('/projects', projectData),
  // Admin endpoints
  updateProject: (projectId, projectData) => axios.put(`/projects/admin/${projectId}`, projectData),
  deleteProject: (projectId) => axios.delete(`/projects/admin/${projectId}`)
};

export default axios; 