import axios from 'axios';

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL ;
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
  updateSettings: (settingsData) => axios.put('/api/admin/settings', settingsData),
  
  // Announcements
  getAllAnnouncements: () => axios.get('/api/admin/announcements'),
  getAnnouncementById: (id) => axios.get(`/api/admin/announcements/${id}`),
  createAnnouncement: (data) => axios.post('/api/admin/announcements', data),
  updateAnnouncement: (id, data) => axios.put(`/api/admin/announcements/${id}`, data),
  deleteAnnouncement: (id) => axios.delete(`/api/admin/announcements/${id}`),
   // Projects 
   getAllProjects: () => axios.get('/api/admin/projects'),
   getProjectById: (id) => axios.get(`/api/admin/projects/${id}`),
   createProject: (projectData) => axios.post('/api/admin/projects', projectData),
   updateProject: (id, projectData) => axios.put(`/api/admin/projects/${id}`, projectData),
   deleteProject: (id) => axios.delete(`/api/admin/projects/${id}`),
   approveProject: (id) => axios.post(`/api/admin/projects/${id}/approve`),
   rejectProject: (id) => axios.post(`/api/admin/projects/${id}/reject`),
   featureProject: (id) => axios.post(`/api/admin/projects/${id}/feature`),
   unfeatureProject: (id) => axios.post(`/api/admin/projects/${id}/unfeature`),
   
    // Payment Management
  getAllPayments: () => axios.get('/api/admin/payments'),
  getPaymentById: (id) => axios.get(`/api/admin/payments/${id}`),
  createPayment: (paymentData) => axios.post('/api/admin/payments', paymentData),
  updatePayment: (id, paymentData) => axios.put(`/api/admin/payments/${id}`, paymentData),
  deletePayment: (id) => axios.delete(`/api/admin/payments/${id}`),
  
  // Jobs
  getAllJobs: () => axios.get('/api/admin/jobs'),
  getJobById: (id) => axios.get(`/api/admin/jobs/${id}`),
  updateJob: (id, data) => axios.put(`/api/admin/jobs/${id}`, data),
  deleteJob: (id) => axios.delete(`/api/admin/jobs/${id}`),
  
  // Membership
  getAllMemberships: () => axios.get('/api/membership/all'),
  getPendingMemberships: () => axios.get('/api/membership/pending'),
  sendPaymentReminders: () => axios.post('/api/membership/send-reminders'),
  getMembershipById: (id) => axios.get(`/api/membership/${id}`),
};

// Public API services
export const publicAPI = {
  // Events
  getEvents: () => axios.get('/api/events'),
  getEventById: (id) => axios.get(`/api/events/${id}`),
  
  // Alumni Directory
  getAlumniDirectory: (filters) => axios.get('/api/alumni-directory', { params: filters }),
  getAlumniProfile: (id) => axios.get(`/api/alumni/${id}`),
  
  // Jobs
  getJobs: () => axios.get('/api/jobs'),
  getJobById: (id) => axios.get(`/api/jobs/${id}`),
  
  // Announcements
  getAnnouncements: () => axios.get('/api/announcements'),
  getAnnouncementById: (id) => axios.get(`/api/announcements/${id}`)
};

// User API services
export const userAPI = {
  // Profile
  updateProfile: (profileData) => axios.put('/api/users/profile', profileData),
  getProfile: () => axios.get('/api/users/profile'),
  changePassword: (passwordData) => axios.put('/api/users/password', passwordData),
  deleteAccount: () => axios.delete('/api/users/account'),
  
  // Student specific
  getUpcomingEvents: () => axios.get('/api/events/upcoming'),
  getRecentAnnouncements: () => axios.get('/api/announcements/recent'),
  getJobOpportunities: () => axios.get('/api/jobs'),
  registerForEvent: (eventId) => axios.post(`/api/events/${eventId}/register`),
  
  // Mentorship
  getMentors: () => axios.get('/api/mentorship/mentors'),
  getMentorById: (id) => axios.get(`/api/mentorship/mentors/${id}`),
  getMentorshipRequests: () => axios.get('/api/mentorship/requests'),
  getMentorshipRequestById: (id) => axios.get(`/api/mentorship/requests/${id}`),
  createMentorshipRequest: (mentorId, data) => axios.post(`/api/mentorship/mentors/${mentorId}/request`, data),
  respondToMentorshipRequest: (id, status) => axios.put(`/api/mentorship/requests/${id}/respond`, { status }),
  completeMentorshipRequest: (id) => axios.put(`/api/mentorship/requests/${id}/complete`),
  
  // Alumni specific
  getNetworkingOpportunities: () => axios.get('/api/networking'),
  getAlumniSpotlight: () => axios.get('/api/alumni/spotlight'),
  createJobPosting: (data) => axios.post('/api/jobs', data),
  updateJobPosting: (id, data) => axios.put(`/api/jobs/${id}`, data),
  deleteJobPosting: (id) => axios.delete(`/api/jobs/${id}`),
  updateMentorProfile: (data) => axios.put('/api/mentorship/profile', data),
  
  // Job applications
  applyForJob: (jobId, application) => axios.post(`/api/jobs/${jobId}/apply`, application),
  getMyApplications: () => axios.get('/api/jobs/applications'),
  withdrawApplication: (applicationId) => axios.delete(`/api/jobs/applications/${applicationId}`),
  
  // Membership
  getMembership: () => axios.get('/api/membership/me'),
  getMembershipDue: () => axios.get('/api/membership/due'),
  payMembership: (data) => axios.post('/api/membership/pay', data),
  
  // Add these new methods
  getStats: () => axios.get('/api/users/stats'),
  getDashboardStats: () => axios.get('/api/users/dashboard-stats'),
  getActivities: () => axios.get('/api/users/activities'),
  getNotifications: () => axios.get('/api/users/notifications'),
  getUpcomingEvents: () => axios.get('/api/events/upcoming'),
  getRecentAnnouncements: () => axios.get('/api/announcements/recent'),
  getJobOpportunities: () => axios.get('/api/jobs/opportunities'),
  getMentorshipStatus: () => axios.get('/api/mentorship/status'),

}
export const alumniAPI = {

 // Dashboard
 getDashboardData: () => axios.get('/api/alumni/dashboard'),
  
 // Alumni Directory
 getAllAlumni: (filters = {}) => axios.get('/api/alumni/directory', { params: filters }),
 getAlumniById: (id) => axios.get(`/api/alumni/directory/${id}`),
 connectWithAlumni: (id) => axios.post(`/api/alumni/connect/${id}`),
 
 // Events
 getEvents: (filters = {}) => axios.get('/api/alumni/events', { params: filters }),
 getEventById: (id) => axios.get(`/api/alumni/events/${id}`),
 registerForEvent: (id) => axios.post(`/api/alumni/events/${id}/register`),
 cancelEventRegistration: (id) => axios.delete(`/api/alumni/events/${id}/register`),
 proposeEvent: (eventData) => axios.post('/api/alumni/events/propose', eventData),

 // Jobs
 getJobs: (filters = {}) => axios.get('/api/alumni/jobs', { params: filters }),
 getJobById: (id) => axios.get(`/api/alumni/jobs/${id}`),
 postJob: (jobData) => axios.post('/api/alumni/jobs', jobData),
 updateJob: (id, jobData) => axios.put(`/api/alumni/jobs/${id}`, jobData),
 deleteJob: (id) => axios.delete(`/api/alumni/jobs/${id}`),
 applyForJob: (id, applicationData) => axios.post(`/api/alumni/jobs/${id}/apply`, applicationData),
 
 // Mentorship
 getMentorships: () => axios.get('/api/alumni/mentorship'),
 getAvailableMentors: (filters = {}) => axios.get('/api/alumni/mentorship/mentors', { params: filters }),
 getMentorProfile: () => axios.get('/api/alumni/mentorship/profile'),
 updateMentorProfile: (profileData) => axios.put('/api/alumni/mentorship/profile', profileData),
 requestMentorship: (mentorId, requestData) => axios.post(`/api/alumni/mentorship/request/${mentorId}`, requestData),
 acceptMentorship: (requestId) => axios.post(`/api/alumni/mentorship/accept/${requestId}`),
 declineMentorship: (requestId) => axios.post(`/api/alumni/mentorship/decline/${requestId}`),
 endMentorship: (mentorshipId) => axios.post(`/api/alumni/mentorship/end/${mentorshipId}`),
 
 // Projects
 getProjects: (filters = {}) => axios.get('/api/alumni/projects', { params: filters }),
 getProjectById: (id) => axios.get(`/api/alumni/projects/${id}`),
 proposeProject: (projectData) => axios.post('/api/alumni/projects', projectData),
 updateProject: (id, projectData) => axios.put(`/api/alumni/projects/${id}`, projectData),
 deleteProject: (id) => axios.delete(`/api/alumni/projects/${id}`),
 joinProject: (id) => axios.post(`/api/alumni/projects/${id}/join`),
 leaveProject: (id) => axios.post(`/api/alumni/projects/${id}/leave`),
 
  getDonationCampaigns: () => axios.get('/api/alumni/donations/campaigns'),
  getUserDonations: () => axios.get('/api/alumni/donations/user'),
  makeDonation: (donationData) => axios.post('/api/alumni/donations', donationData),
  
  // Resources
  getResources: (filters = {}) => axios.get('/api/alumni/resources', { params: filters }),
  getResourceById: (id) => axios.get(`/api/alumni/resources/${id}`),
  submitResource: (resourceData) => axios.post('/api/alumni/resources', resourceData),
  
  // Forums
  getForums: () => axios.get('/api/alumni/forums'),
  getForumTopics: (forumId, filters = {}) => axios.get(`/api/alumni/forums/${forumId}/topics`, { params: filters }),
  getTopicById: (topicId) => axios.get(`/api/alumni/forums/topics/${topicId}`),
  createForumTopic: (topicData) => axios.post('/api/alumni/forums/topics', topicData),
  replyToTopic: (topicId, replyData) => axios.post(`/api/alumni/forums/topics/${topicId}/replies`, replyData),
  
  // Profile
  getUserProfile: () => axios.get('/api/alumni/profile'),
  updateUserProfile: (profileData) => axios.put('/api/alumni/profile', profileData),
  uploadProfileImage: (formData) => axios.post('/api/alumni/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Auth API
export const authAPI = {
  register: (userData) => axios.post('/api/auth/register', userData),
  login: (email, password) => axios.post('/api/auth/login', { email, password }),
  logout: () => axios.post('/api/auth/logout'),
  getCurrentUser: () => axios.get('/api/auth/me'),
  verifyEmail: (token) => axios.get(`/api/auth/verify-email/${token}`),
  forgotPassword: (email) => axios.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => axios.put(`/api/auth/reset-password/${token}`, { password })
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (type, id, data) => axios.post(`/api/payments/${type}/${id}`, data),
  getPaymentStatus: (paymentId) => axios.get(`/api/payments/${paymentId}`),
  getDonationOptions: () => axios.get('/api/payments/donation-options')
};

export default axios; 