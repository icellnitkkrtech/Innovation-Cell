const alumniService = require('../services/alumniService');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('File upload only supports the following filetypes - ' + filetypes));
  }
}).single('file');

// Dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = await alumniService.getDashboardData(req.user.id);
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Directory
exports.getAllAlumni = async (req, res) => {
  try {
    const filters = req.query;
    const alumni = await alumniService.getAllAlumni(filters);
    res.json(alumni);
  } catch (error) {
    console.error('Error fetching alumni directory:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getAlumniById = async (req, res) => {
  try {
    const alumnus = await alumniService.getAlumniById(req.params.id);
    if (!alumnus) {
      return res.status(404).json({ message: 'Alumni not found' });
    }
    res.json(alumnus);
  } catch (error) {
    console.error('Error fetching alumni profile:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.connectWithAlumni = async (req, res) => {
  try {
    const result = await alumniService.connectWithAlumni(req.user.id, req.params.id, req.body.message);
    res.json(result);
  } catch (error) {
    console.error('Error connecting with alumni:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Events
exports.getEvents = async (req, res) => {
  try {
    const events = await alumniService.getEvents(req.query);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await alumniService.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const result = await alumniService.registerForEvent(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.cancelEventRegistration = async (req, res) => {
  try {
    const result = await alumniService.cancelEventRegistration(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error cancelling event registration:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.proposeEvent = async (req, res) => {
  try {
    const event = await alumniService.proposeEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error proposing event:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await alumniService.getJobs(req.query);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await alumniService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.postJob = async (req, res) => {
  try {
    const job = await alumniService.postJob(req.body, req.user.id);
    res.status(201).json(job);
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await alumniService.updateJob(req.params.id, req.body, req.user.id);
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.message === 'Job not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Not authorized to update this job') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const result = await alumniService.deleteJob(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.message === 'Job not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Not authorized to delete this job') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    upload(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      const applicationData = {
        coverLetter: req.body.coverLetter,
        resumeUrl: req.file ? `/uploads/${req.file.filename}` : null
      };
      
      const result = await alumniService.applyForJob(req.params.id, req.user.id, applicationData);
      res.json(result);
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Mentorship
exports.getMentorships = async (req, res) => {
  try {
    const mentorships = await alumniService.getMentorships(req.user.id);
    res.json(mentorships);
  } catch (error) {
    console.error('Error fetching mentorships:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getAvailableMentors = async (req, res) => {
  try {
    const mentors = await alumniService.getAvailableMentors();
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching available mentors:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getMentorProfile = async (req, res) => {
  try {
    const profile = await alumniService.getMentorProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching mentor profile:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.updateMentorProfile = async (req, res) => {
  try {
    const profile = await alumniService.updateMentorProfile(req.user.id, req.body);
    res.json(profile);
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.requestMentorship = async (req, res) => {
  try {
    const request = await alumniService.requestMentorship({
      mentorId: req.params.mentorId,
      ...req.body
    }, req.user.id);
    res.status(201).json(request);
  } catch (error) {
    console.error('Error requesting mentorship:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.acceptMentorship = async (req, res) => {
  try {
    const result = await alumniService.acceptMentorship(req.params.requestId, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error accepting mentorship:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.declineMentorship = async (req, res) => {
  try {
    const result = await alumniService.declineMentorship(req.params.requestId, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error declining mentorship:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.endMentorship = async (req, res) => {
  try {
    const result = await alumniService.endMentorship(req.params.mentorshipId, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error ending mentorship:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await alumniService.getProjects(req.query);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await alumniService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.proposeProject = async (req, res) => {
  try {
    const project = await alumniService.proposeProject(req.body, req.user.id);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error proposing project:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await alumniService.updateProject(req.params.id, req.body, req.user.id);
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Not authorized to update this project') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const result = await alumniService.deleteProject(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting project:', error);
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Not authorized to delete this project') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.joinProject = async (req, res) => {
  try {
    const result = await alumniService.joinProject(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error joining project:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.leaveProject = async (req, res) => {
  try {
    const result = await alumniService.leaveProject(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error leaving project:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Donations
exports.getDonationCampaigns = async (req, res) => {
  try {
    const campaigns = await alumniService.getDonationCampaigns();
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching donation campaigns:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    const donations = await alumniService.getUserDonations(req.user.id);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.makeDonation = async (req, res) => {
  try {
    const donation = await alumniService.makeDonation(req.user.id, req.body);
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error making donation:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Resources
exports.getResources = async (req, res) => {
  try {
    const resources = await alumniService.getResources(req.query);
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await alumniService.getResourceById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Error fetching resource details:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.submitResource = async (req, res) => {
  try {
    upload(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      const resourceData = {
        ...req.body,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : null
      };
      
      const resource = await alumniService.submitResource(resourceData, req.user.id);
      res.status(201).json(resource);
    });
  } catch (error) {
    console.error('Error submitting resource:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Forums
exports.getForums = async (req, res) => {
  try {
    const forums = await alumniService.getForums();
    res.json(forums);
  } catch (error) {
    console.error('Error fetching forums:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getForumTopics = async (req, res) => {
  try {
    const topics = await alumniService.getForumTopics(req.params.forumId, req.query);
    res.json(topics);
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await alumniService.getTopicById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    console.error('Error fetching topic details:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.createForumTopic = async (req, res) => {
  try {
    const topic = await alumniService.createForumTopic(req.body, req.user.id);
    res.status(201).json(topic);
  } catch (error) {
    console.error('Error creating forum topic:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.replyToTopic = async (req, res) => {
  try {
    const reply = await alumniService.replyToTopic(req.params.topicId, req.body, req.user.id);
    res.status(201).json(reply);
  } catch (error) {
    console.error('Error replying to topic:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// Profile
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await alumniService.getUserProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};



// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Sanitize and validate the input data
    const {
      name,
      phone,
      location,
      bio,
      graduationYear,
      degree,
      major,
      currentPosition,
      company,
      industry,
      skills,
      socialLinks,
      privacySettings
    } = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user profile fields
    // Only update fields that are provided in the request
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (bio) user.bio = bio;
    if (graduationYear) user.graduationYear = graduationYear;
    if (degree) user.degree = degree;
    if (major) user.major = major;
    if (currentPosition) user.currentPosition = currentPosition;
    if (company) user.company = company;
    if (industry) user.industry = industry;
    
    // Handle arrays and objects separately
    if (skills && Array.isArray(skills)) {
      user.skills = skills;
    }
    
    if (socialLinks && typeof socialLinks === 'object') {
      user.socialLinks = {
        ...user.socialLinks || {},
        ...socialLinks
      };
    }
    
    if (privacySettings && typeof privacySettings === 'object') {
      user.privacySettings = {
        ...user.privacySettings || {},
        ...privacySettings
      };
    }
    
    // Save the updated user
    await user.save();
    
    // Return the updated user profile (excluding sensitive information)
    const userProfile = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      graduationYear: user.graduationYear,
      degree: user.degree,
      major: user.major,
      currentPosition: user.currentPosition,
      company: user.company,
      industry: user.industry,
      skills: user.skills,
      socialLinks: user.socialLinks,
      privacySettings: user.privacySettings,
      profileImage: user.profileImage
    };
    
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    // Assuming you're using multer or similar middleware to handle file uploads
    const imageUrl = `/uploads/profile-images/${req.file.filename}`;
    
    // Update user's profile image
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ 
      message: 'Profile image uploaded successfully',
      profileImage: imageUrl
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add other alumni controller methods as needed...