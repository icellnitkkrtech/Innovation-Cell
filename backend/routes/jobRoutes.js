const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { auth, adminAuth } = require('../middleware/auth');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email');
    
    res.json(jobs);
  } catch (err) {
    console.error('Error getting jobs:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email company jobTitle');
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.json(job);
  } catch (err) {
    console.error('Error getting job:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create job (alumni and admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is alumni or admin
    if (req.user.role !== 'alumni' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to post jobs' });
    }
    
    const newJob = new Job({
      ...req.body,
      postedBy: req.user.id
    });
    
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update job (owner or admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this job' });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedJob);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete job (owner or admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to delete this job' });
    }
    
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job deleted' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 