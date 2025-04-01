const User = require('../models/User');
const Event = require('../models/Event');
const Setting = require('../models/Setting');
const Project = require('../models/Project');
const Payment = require('../models/Payment');

// Get dashboard stats
exports.getDashboardStats = async () => {
  try {
    // Get user counts
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAlumni = await User.countDocuments({ role: 'alumni' });
    
    // Get event count
    const totalEvents = await Event.countDocuments();
    
    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');
    
    // Get recent events
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'name');
    
    return {
      totalUsers,
      totalStudents,
      totalAlumni,
      totalEvents,
      recentUsers,
      recentEvents
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw new Error('Failed to get dashboard statistics');
  }
};

// User management services
exports.getAllUsers = async () => {
  try {
    return await User.find().select('-password').sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error('Failed to get users');
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

exports.updateUser = async (userId, userData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Only allow certain fields to be updated
    const allowedFields = ['name', 'email', 'role', 'isVerified'];
    
    for (const [key, value] of Object.entries(userData)) {
      if (allowedFields.includes(key)) {
        user[key] = value;
      }
    }
    
    await user.save();
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    await user.remove();
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

exports.verifyUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    user.isVerified = true;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
};

// Event management services
exports.getAllEvents = async () => {
  try {
    return await Event.find()
      .sort({ date: -1 })
      .populate('createdBy', 'name');
  } catch (error) {
    console.error('Error getting all events:', error);
    throw new Error('Failed to get events');
  }
};

exports.getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId).populate('createdBy', 'name');
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    console.error('Error getting event by ID:', error);
    throw error;
  }
};

exports.createEvent = async (eventData, userId) => {
  try {
    const event = new Event({
      ...eventData,
      createdBy: userId
    });
    
    await event.save();
    return event;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

exports.updateEvent = async (eventId, eventData) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    // Update event fields
    const allowedFields = ['title', 'description', 'date', 'time', 'location', 'type', 'registrationLink', 'isPublished'];
    
    for (const [key, value] of Object.entries(eventData)) {
      if (allowedFields.includes(key)) {
        event[key] = value;
      }
    }
    
    await event.save();
    return event;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

exports.deleteEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    await event.remove();
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Settings management
exports.getSettings = async () => {
  try {
    const settings = await Setting.find();
    
    // Convert to key-value object
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });
    
    return settingsObject;
  } catch (error) {
    console.error('Error getting settings:', error);
    throw new Error('Failed to get settings');
  }
};

exports.updateSettings = async (settingsData) => {
  try {
    const updates = [];
    
    for (const [key, value] of Object.entries(settingsData)) {
      updates.push({
        updateOne: {
          filter: { key },
          update: { $set: { value, updatedAt: Date.now() } },
          upsert: true
        }
      });
    }
    
    if (updates.length > 0) {
      await Setting.bulkWrite(updates);
    }
    
    return await this.getSettings();
  } catch (error) {
    console.error('Error updating settings:', error);
    throw new Error('Failed to update settings');
  }
};

// Project management services
exports.getAllProjects = async () => {
  try {
    return await Project.find()
      .populate('createdBy', 'name')
      .populate('leadMember', 'name')
      .populate('teamMembers', 'name')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error getting all projects:', error);
    throw new Error('Failed to get projects');
  }
};

exports.getProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId)
      .populate('createdBy', 'name')
      .populate('leadMember', 'name')
      .populate('teamMembers', 'name');
    
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (error) {
    console.error('Error getting project by ID:', error);
    throw error;
  }
};

exports.createProject = async (projectData, userId) => {
  try {
    const project = new Project({
      ...projectData,
      createdBy: userId
    });
    
    await project.save();
    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

exports.updateProject = async (projectId, projectData) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Update project fields
    const allowedFields = [
      'title', 'description', 'startDate', 'endDate', 
      'status', 'budget', 'teamMembers', 'leadMember', 'documents'
    ];
    
    for (const [key, value] of Object.entries(projectData)) {
      if (allowedFields.includes(key)) {
        project[key] = value;
      }
    }
    
    await project.save();
    return project;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

exports.deleteProject = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    await project.remove();
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Payment management services
exports.getAllPayments = async () => {
  try {
    return await Payment.find()
      .populate('user', 'name email')
      .sort({ paymentDate: -1 });
  } catch (error) {
    console.error('Error getting all payments:', error);
    throw new Error('Failed to get payments');
  }
};

exports.getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId)
      .populate('user', 'name email');
    
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  } catch (error) {
    console.error('Error getting payment by ID:', error);
    throw error;
  }
};

exports.createPayment = async (paymentData) => {
  try {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

exports.updatePayment = async (paymentId, paymentData) => {
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    // Update payment fields
    const allowedFields = [
      'amount', 'currency', 'paymentMethod', 'status', 
      'description', 'paymentDate', 'receiptUrl'
    ];
    
    for (const [key, value] of Object.entries(paymentData)) {
      if (allowedFields.includes(key)) {
        payment[key] = value;
      }
    }
    
    await payment.save();
    return payment;
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
};

exports.deletePayment = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    await payment.remove();
    return { success: true };
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
}; 