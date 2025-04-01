const Payment = require('../models/Payment');
const User = require('../models/User');
const Event = require('../models/Event');
const Project = require('../models/Project');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethod, description, relatedTo, relatedId } = req.body;
    
    // Validate required fields
    if (!amount || !paymentMethod) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    
    // Create payment record
    const payment = new Payment({
      user: req.user.id,
      amount,
      currency: currency || 'USD',
      paymentMethod,
      description,
      relatedTo,
      relatedId,
      status: 'completed', // In a real app, this would be set after payment confirmation
    });
    
    await payment.save();
    
    // Handle specific payment types
    if (relatedTo === 'event' && relatedId) {
      // Add user to event attendees
      await Event.findByIdAndUpdate(relatedId, {
        $addToSet: { attendees: req.user.id }
      });
    } else if (relatedTo === 'membership') {
      // Update user membership status
      await User.findByIdAndUpdate(req.user.id, {
        membershipStatus: 'active',
        membershipType: relatedId || 'standard',
        membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      });
    } else if (relatedTo === 'project' && relatedId) {
      // Add user as contributor to project
      await Project.findByIdAndUpdate(relatedId, {
        $addToSet: { contributors: { user: req.user.id, amount } }
      });
    }
    
    res.status(201).json(payment);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get user's payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .sort({ paymentDate: -1 });
    
    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get payment details
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    
    // Check if the payment belongs to the user or user is admin
    if (payment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to access this payment' });
    }
    
    res.json(payment);
  } catch (error) {
    console.error('Get payment by ID error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update payment status (admin only)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ msg: 'Please provide a status' });
    }
    
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    
    // Only allow specific status values
    if (!['pending', 'completed', 'failed', 'refunded'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }
    
    payment.status = status;
    await payment.save();
    
    res.json(payment);
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get payment receipt
exports.getPaymentReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'relatedId',
        select: 'title name description',
      });
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    
    // Check if the payment belongs to the user or user is admin
    if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to access this payment' });
    }
    
    // Generate receipt data
    const receiptData = {
      receiptNumber: payment._id,
      date: payment.paymentDate,
      customerName: payment.user.name,
      customerEmail: payment.user.email,
      paymentMethod: payment.paymentMethod,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      description: payment.description,
      relatedTo: payment.relatedTo,
      relatedItem: payment.relatedId ? {
        id: payment.relatedId._id,
        title: payment.relatedId.title || payment.relatedId.name,
        description: payment.relatedId.description
      } : null
    };
    
    res.json(receiptData);
  } catch (error) {
    console.error('Get payment receipt error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Request refund
exports.requestRefund = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    
    // Check if the payment belongs to the user
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to request refund for this payment' });
    }
    
    // Check if payment is eligible for refund
    if (payment.status !== 'completed') {
      return res.status(400).json({ msg: `Cannot request refund for payment with status: ${payment.status}` });
    }
    
    // Check if payment is too old (e.g., more than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (new Date(payment.paymentDate) < thirtyDaysAgo) {
      return res.status(400).json({ msg: 'Cannot request refund for payments older than 30 days' });
    }
    
    // Update payment status to refund requested
    payment.status = 'refund_requested';
    payment.refundReason = reason;
    payment.refundRequestDate = Date.now();
    
    await payment.save();
    
    res.json({ msg: 'Refund request submitted successfully', payment });
  } catch (error) {
    console.error('Request refund error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Process refund (admin only)
exports.processRefund = async (req, res) => {
  try {
    const { approved, notes } = req.body;
    
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    
    // Check if payment has a refund request
    if (payment.status !== 'refund_requested') {
      return res.status(400).json({ msg: 'This payment does not have an active refund request' });
    }
    
    if (approved) {
      // Process refund logic would go here (e.g., call to payment gateway API)
      payment.status = 'refunded';
      payment.refundProcessedDate = Date.now();
      payment.refundNotes = notes;
    } else {
      payment.status = 'completed'; // Revert to completed
      payment.refundRejectionReason = notes;
    }
    
    await payment.save();
    
    res.json({ 
      msg: approved ? 'Refund processed successfully' : 'Refund request rejected', 
      payment 
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = exports; 