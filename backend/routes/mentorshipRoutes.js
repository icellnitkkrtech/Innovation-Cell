const express = require('express');
const router = express.Router();
const MentorshipRequest = require('../models/MentorshipRequest');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all mentors
router.get('/mentors', async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: 'alumni',
      isMentor: true
    }).select('-password');
    
    res.json(mentors);
  } catch (err) {
    console.error('Error getting mentors:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get mentor by ID
router.get('/mentors/:id', async (req, res) => {
  try {
    const mentor = await User.findOne({ 
      _id: req.params.id,
      role: 'alumni',
      isMentor: true
    }).select('-password');
    
    if (!mentor) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }
    
    res.json(mentor);
  } catch (err) {
    console.error('Error getting mentor:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update mentor profile (for alumni)
router.put('/profile', auth, async (req, res) => {
  try {
    // Check if user is alumni
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const { expertise, mentorBio, availabilityHours, isMentor } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 
        expertise, 
        mentorBio, 
        availabilityHours,
        isMentor: isMentor !== undefined ? isMentor : true
      },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating mentor profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get mentorship requests for current user
router.get('/requests', auth, async (req, res) => {
  try {
    let requests;
    
    if (req.user.role === 'student') {
      // Students see requests they've sent
      requests = await MentorshipRequest.find({ student: req.user.id })
        .populate('mentor', 'name email jobTitle company')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'alumni') {
      // Alumni see requests they've received
      requests = await MentorshipRequest.find({ mentor: req.user.id })
        .populate('student', 'name email program year')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'admin') {
      // Admins see all requests
      requests = await MentorshipRequest.find()
        .populate('student', 'name email program year')
        .populate('mentor', 'name email jobTitle company')
        .sort({ createdAt: -1 });
    }
    
    res.json(requests || []);
  } catch (err) {
    console.error('Error getting mentorship requests:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get mentorship request by ID
router.get('/requests/:id', auth, async (req, res) => {
  try {
    const request = await MentorshipRequest.findById(req.params.id)
      .populate('student', 'name email program year')
      .populate('mentor', 'name email jobTitle company expertise');
    
    if (!request) {
      return res.status(404).json({ msg: 'Mentorship request not found' });
    }
    
    // Check if user is authorized to view this request
    if (
      request.student._id.toString() !== req.user.id &&
      request.mentor._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ msg: 'Not authorized to view this request' });
    }
    
    res.json(request);
  } catch (err) {
    console.error('Error getting mentorship request:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create mentorship request (students only)
router.post('/requests', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ msg: 'Only students can request mentorship' });
    }
    
    const { mentor, message, topics, duration } = req.body;
    
    // Check if mentor exists and is available
    const mentorUser = await User.findOne({ 
      _id: mentor,
      role: 'alumni',
      isMentor: true
    });
    
    if (!mentorUser) {
      return res.status(404).json({ msg: 'Mentor not found or not available' });
    }
    
    // Check if there's already an active request
    const existingRequest = await MentorshipRequest.findOne({
      student: req.user.id,
      mentor: mentor,
      status: { $in: ['pending', 'accepted'] }
    });
    
    if (existingRequest) {
      return res.status(400).json({ 
        msg: `You already have an ${existingRequest.status} mentorship request with this mentor` 
      });
    }
    
    const newRequest = new MentorshipRequest({
      student: req.user.id,
      mentor,
      message,
      topics,
      duration
    });
    
    const request = await newRequest.save();
    
    // Populate the response
    const populatedRequest = await MentorshipRequest.findById(request._id)
      .populate('student', 'name email')
      .populate('mentor', 'name email');
    
    res.json(populatedRequest);
  } catch (err) {
    console.error('Error creating mentorship request:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Respond to mentorship request (mentors only)
router.put('/requests/:id/respond', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }
    
    const request = await MentorshipRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Mentorship request not found' });
    }
    
    // Check if user is the mentor for this request
    if (request.mentor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to respond to this request' });
    }
    
    // Check if request is still pending
    if (request.status !== 'pending') {
      return res.status(400).json({ msg: `Request has already been ${request.status}` });
    }
    
    request.status = status;
    request.responseDate = Date.now();
    
    await request.save();
    
    // Populate the response
    const populatedRequest = await MentorshipRequest.findById(request._id)
      .populate('student', 'name email')
      .populate('mentor', 'name email');
    
    res.json(populatedRequest);
  } catch (err) {
    console.error('Error responding to mentorship request:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 