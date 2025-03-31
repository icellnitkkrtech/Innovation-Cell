const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const eventController = require('../controllers/eventController');

// Public routes
router.get('/', eventController.getPublishedEvents);
router.get('/upcoming', eventController.getUpcomingEvents);

// Private routes
router.post('/:id/register', auth, eventController.registerForEvent);

// Admin routes
router.get('/admin', [auth, adminAuth], eventController.getAllEvents);
router.post('/admin', [auth, adminAuth], eventController.createEvent);
router.put('/admin/:id', [auth, adminAuth], eventController.updateEvent);
router.delete('/admin/:id', [auth, adminAuth], eventController.deleteEvent);

module.exports = router; 