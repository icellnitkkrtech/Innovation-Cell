const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['third_year', 'final_year']
  },
  monthlyPayments: [
    {
      month: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      paidOn: {
        type: Date,
        default: Date.now
      },
      paymentId: {
        type: String
      },
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
      }
    }
  ],
  totalPaid: {
    type: Number,
    default: 0
  },
  totalDue: {
    type: Number,
    default: 0
  },
  lastPaymentDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Membership', MembershipSchema); 