const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Apply auth and admin middleware to all routes
router.use(auth, adminAuth);

// Dashboard routes
router.get('/dashboard', adminController.getDashboard);

// User management routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.post('/users/:id/verify', adminController.verifyUser);

// Event management routes
router.get('/events', adminController.getAllEvents);
router.get('/events/:id', adminController.getEventById);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

// Settings routes
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// Project management routes
router.get('/projects', adminController.getAllProjects);
router.get('/projects/:id', adminController.getProjectById);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Payment management routes
router.get('/payments', adminController.getAllPayments);
router.get('/payments/:id', adminController.getPaymentById);
router.post('/payments', adminController.createPayment);
router.put('/payments/:id', adminController.updatePayment);
router.delete('/payments/:id', adminController.deletePayment);

module.exports = router; 