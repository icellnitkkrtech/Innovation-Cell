const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const { protectAlumniRoutes, isAlumniOrAdmin } = require('../middleware/alumniAuth');
const multer = require('multer');
// Apply auth middleware to all alumni routes
router.use(protectAlumniRoutes);
router.use(isAlumniOrAdmin);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads/profile-images/');
    },
    filename: function(req, file, cb) {
      cb(null, `user-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  // File filter to only allow image files
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  };
  
  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB max file size
    },
    fileFilter: fileFilter
  });
// Dashboard
router.get('/dashboard', alumniController.getDashboardData);

// Directory
router.get('/directory', alumniController.getAllAlumni);
router.get('/directory/:id', alumniController.getAlumniById);
router.post('/connect/:id', alumniController.connectWithAlumni);

// Events
router.get('/events', alumniController.getEvents);
router.get('/events/:id', alumniController.getEventById);
router.post('/events/:id/register', alumniController.registerForEvent);
router.delete('/events/:id/register', alumniController.cancelEventRegistration);
router.post('/events/propose', alumniController.proposeEvent);

// Jobs
router.get('/jobs', alumniController.getJobs);
router.get('/jobs/:id', alumniController.getJobById);
router.post('/jobs', alumniController.postJob);
router.put('/jobs/:id', alumniController.updateJob);
router.delete('/jobs/:id', alumniController.deleteJob);
router.post('/jobs/:id/apply', alumniController.applyForJob);

// Mentorship
router.get('/mentorship', alumniController.getMentorships);
router.get('/mentorship/mentors', alumniController.getAvailableMentors);
router.get('/mentorship/profile', alumniController.getMentorProfile);
router.put('/mentorship/profile', alumniController.updateMentorProfile);
router.post('/mentorship/request/:mentorId', alumniController.requestMentorship);
router.post('/mentorship/:requestId/accept', alumniController.acceptMentorship);
router.post('/mentorship/:requestId/decline', alumniController.declineMentorship);
router.post('/mentorship/:mentorshipId/end', alumniController.endMentorship);

// Projects
router.get('/projects', alumniController.getProjects);
router.get('/projects/:id', alumniController.getProjectById);
router.post('/projects', alumniController.proposeProject);
router.put('/projects/:id', alumniController.updateProject);
router.delete('/projects/:id', alumniController.deleteProject);
router.post('/projects/:id/join', alumniController.joinProject);
router.post('/projects/:id/leave', alumniController.leaveProject);

// Donations
router.get('/donations/campaigns', alumniController.getDonationCampaigns);
router.get('/donations/user', alumniController.getUserDonations);
router.post('/donations', alumniController.makeDonation);

// Resources
router.get('/resources', alumniController.getResources);
router.get('/resources/:id', alumniController.getResourceById);
router.post('/resources', alumniController.submitResource);

// Forums
router.get('/forums', alumniController.getForums);
router.get('/forums/:forumId/topics', alumniController.getForumTopics);
router.get('/forums/topics/:topicId', alumniController.getTopicById);
router.post('/forums/topics', alumniController.createForumTopic);
router.post('/forums/topics/:topicId/replies', alumniController.replyToTopic);

// Profile
router.get('/profile', protectAlumniRoutes, alumniController.getUserProfile);
router.put('/profile', protectAlumniRoutes, alumniController.updateUserProfile);
router.post('/profile/image', protectAlumniRoutes, upload.single('profileImage'), alumniController.uploadProfileImage);

module.exports = router; 