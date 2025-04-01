const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error getting events:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await Event.find({ 
      date: { $gte: currentDate } 
    }).sort({ date: 1 }).limit(5);
    
    res.json(events);
  } catch (err) {
    console.error('Error getting upcoming events:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name');
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    // Only return published events to non-admin users
    if (!event.isPublished) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error getting event:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;