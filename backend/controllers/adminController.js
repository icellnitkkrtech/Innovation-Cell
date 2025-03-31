const adminService = require('../services/adminService');

// Dashboard controller
exports.getDashboard = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Dashboard controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
};

// User management controllers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Get all users controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Get user by ID controller error:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    console.error('Update user controller error:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user controller error:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await adminService.verifyUser(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Verify user controller error:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Event management controllers
exports.getAllEvents = async (req, res) => {
  try {
    const events = await adminService.getAllEvents();
    res.json(events);
  } catch (error) {
    console.error('Get all events controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await adminService.getEventById(req.params.id);
    res.json(event);
  } catch (error) {
    console.error('Get event by ID controller error:', error);
    if (error.message === 'Event not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await adminService.createEvent(req.body, req.user.id);
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await adminService.updateEvent(req.params.id, req.body);
    res.json(event);
  } catch (error) {
    console.error('Update event controller error:', error);
    if (error.message === 'Event not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await adminService.deleteEvent(req.params.id);
    res.json({ msg: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event controller error:', error);
    if (error.message === 'Event not found') {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Settings controllers
exports.getSettings = async (req, res) => {
  try {
    const settings = await adminService.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Get settings controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await adminService.updateSettings(req.body);
    res.json(settings);
  } catch (error) {
    console.error('Update settings controller error:', error);
    res.status(500).json({ msg: error.message || 'Server Error' });
  }
}; 