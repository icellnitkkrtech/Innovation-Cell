const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const projectRoutes = require('./projectRoutes');
// Import other route files as needed
const adminRoute = require('./admin')
// API routes
router.use('/api/auth', authRoutes);
router.use('/api/events', eventRoutes);
router.use('/api/projects', projectRoutes);
// Add other routes as needed
router.use("/api/admin", adminRoute)
module.exports = router; 