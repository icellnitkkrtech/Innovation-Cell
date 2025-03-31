import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
  updateProfile: (profileData) => api.put('/auth/update-profile', profileData)
};

// Events API
export const eventsAPI = {
  getPublishedEvents: () => api.get('/events'),
  getUpcomingEvents: () => api.get('/events/upcoming'),
  registerForEvent: (eventId) => api.post(`/events/${eventId}/register`),
  // Admin endpoints
  getAllEvents: () => api.get('/events/admin'),
  createEvent: (eventData) => api.post('/events/admin', eventData),
  updateEvent: (eventId, eventData) => api.put(`/events/admin/${eventId}`, eventData),
  deleteEvent: (eventId) => api.delete(`/events/admin/${eventId}`)
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),
  getRecentProjects: () => api.get('/projects/recent'),
  createProject: (projectData) => api.post('/projects', projectData),
  // Admin endpoints
  updateProject: (projectId, projectData) => api.put(`/projects/admin/${projectId}`, projectData),
  deleteProject: (projectId) => api.delete(`/projects/admin/${projectId}`)
};

export default api; 