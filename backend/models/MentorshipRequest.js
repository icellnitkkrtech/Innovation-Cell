const mongoose = require('mongoose');

const MentorshipRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  topics: {
    type: [String],
    required: true
  },
  duration: {
    type: String,
    enum: ['1_month', '3_months', '6_months', 'ongoing'],
    default: '3_months'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  responseDate: {
    type: Date
  },
  completedDate: {
    type: Date
  }
});

module.exports = mongoose.model('MentorshipRequest', MentorshipRequestSchema); 