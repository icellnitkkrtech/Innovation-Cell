const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { auth, adminAuth } = require('../middleware/auth');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error('Error getting announcements:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get recent announcements
router.get('/recent', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json(announcements);
  } catch (err) {
    console.error('Error getting recent announcements:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (err) {
    console.error('Error getting announcement:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create announcement (admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const newAnnouncement = new Announcement({
      ...req.body,
      createdBy: req.user.id
    });
    const announcement = await newAnnouncement.save();
    res.json(announcement);
  } catch (err) {
    console.error('Error creating announcement:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update announcement (admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (err) {
    console.error('Error updating announcement:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete announcement (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    res.json({ msg: 'Announcement deleted' });
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 