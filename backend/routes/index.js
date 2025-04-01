const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const projectRoutes = require('./projectRoutes');
const announcementRoutes = require('./announcementRoutes');
const jobRoutes = require('./jobRoutes');
const mentorshipRoutes = require('./mentorshipRoutes');
const alumniRoutes = require('./alumni')
// Import other route files as needed
const adminRoute = require('./admin')
// Add this line with your other route imports
const membershipRoutes = require('./api/membership');


// API routes
router.use('/api/auth', authRoutes);
router.use('/api/events', eventRoutes);
router.use('/api/projects', projectRoutes);
router.use('/api/announcements', announcementRoutes);
router.use('/api/jobs', jobRoutes);
router.use('/api/mentorship', mentorshipRoutes);
// Add this line with your other app.use statements
router.use('/api/membership', membershipRoutes);
// Add other routes as needed
router.use("/api/admin", adminRoute)
router.use("/api/alumni", alumniRoutes)
module.exports = router; 