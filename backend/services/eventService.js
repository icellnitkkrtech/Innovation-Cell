const Event = require('../models/Event');

// Get all published events
exports.getPublishedEvents = async () => {
  return await Event.find({ isPublished: true })
    .sort({ date: 1 })
    .populate('organizer', 'name');
};

// Get upcoming events
exports.getUpcomingEvents = async (limit = 3) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return await Event.find({ 
    isPublished: true,
    date: { $gte: today } 
  })
    .sort({ date: 1 })
    .limit(limit)
    .populate('organizer', 'name');
};

// Get all events (admin)
exports.getAllEvents = async () => {
  return await Event.find()
    .sort({ date: -1 })
    .populate('organizer', 'name')
    .populate('attendees', 'name email');
};

// Get event by ID
exports.getEventById = async (eventId) => {
  return await Event.findById(eventId);
};

// Create new event
exports.createEvent = async (eventData) => {
  const newEvent = new Event(eventData);
  return await newEvent.save();
};

// Update event
exports.updateEvent = async (eventId, updateData) => {
  const updateFields = {};
  for (const [key, value] of Object.entries(updateData)) {
    if (key !== '_id' && key !== 'attendees') {
      updateFields[key] = value;
    }
  }
  
  return await Event.findByIdAndUpdate(
    eventId,
    { $set: updateFields },
    { new: true }
  );
};

// Delete event
exports.deleteEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  
  await event.remove();
  return { message: 'Event removed' };
};

// Register user for event
exports.registerForEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  
  // Check if user is already registered
  if (event.attendees.includes(userId)) {
    throw new Error('Already registered for this event');
  }
  
  event.attendees.push(userId);
  await event.save();
  
  return { message: 'Successfully registered for event' };
}; 