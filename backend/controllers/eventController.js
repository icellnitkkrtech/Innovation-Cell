const eventService = require('../services/eventService');

// Get all published events
exports.getPublishedEvents = async (req, res) => {
  try {
    const events = await eventService.getPublishedEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await eventService.getUpcomingEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const result = await eventService.registerForEvent(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Event not found') {
      return res.status(404).json({ msg: err.message });
    }
    if (err.message === 'Already registered for this event') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
};

// Admin: Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Create event
exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user.id
    };
    const event = await eventService.createEvent(eventData);
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Event not found') {
      return res.status(404).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
}; 