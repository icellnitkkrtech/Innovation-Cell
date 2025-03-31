const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const projectController = require('../controllers/projectController');

// Private routes
router.get('/', auth, projectController.getProjects);
router.get('/recent', auth, projectController.getRecentProjects);
router.post('/', auth, projectController.createProject);

// Admin routes
router.put('/admin/:id', [auth, adminAuth], projectController.updateProject);
router.delete('/admin/:id', [auth, adminAuth], projectController.deleteProject);

module.exports = router; 