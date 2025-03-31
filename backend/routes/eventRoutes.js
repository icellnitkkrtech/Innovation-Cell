const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Event = require('../models/Event');

// Get all published events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true })
      .sort({ date: 1 })
      .populate('createdBy', 'name');
    
    res.json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ msg: 'Server Error' });
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