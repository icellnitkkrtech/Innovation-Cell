const express = require('express');
const router = express.Router();
const {auth, adminAuth} = require('../../middleware/auth');

const Membership = require('../../models/Membership');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/membership/me
// @desc    Get current user's membership details
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    let membership = await Membership.findOne({ user: req.user.id });
    
    if (!membership) {
      // Create a default membership if none exists
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Determine year group based on graduation year
      const currentYear = new Date().getFullYear();
      const yearGroup = user.graduationYear === currentYear + 1 ? 'final_year' : 'third_year';
      
      membership = new Membership({
        user: req.user.id,
        year: yearGroup,
        monthlyPayments: [],
        totalPaid: 0,
        totalDue: 0
      });
      
      await membership.save();
    }
    
    res.json(membership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/membership/due
// @desc    Get current user's due amount
// @access  Private
router.get('/due', auth, async (req, res) => {
  try {
    const membership = await Membership.findOne({ user: req.user.id });
    
    if (!membership) {
      return res.status(404).json({ msg: 'Membership not found for this user' });
    }
    
    res.json({ totalDue: membership.totalDue });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/membership/pay
// @desc    Make a membership payment
// @access  Private
router.post('/pay', [
  auth,
  check('month', 'Month is required').not().isEmpty(),
  check('year', 'Year is required').isNumeric(),
  check('paymentId', 'Payment ID is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { month, year, paymentId } = req.body;
  
  try {
    let membership = await Membership.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);
    
    if (!membership) {
      // Create new membership if it doesn't exist
      const currentYear = new Date().getFullYear();
      const yearGroup = user.graduationYear === currentYear + 1 ? 'final_year' : 'third_year';
      
      membership = new Membership({
        user: req.user.id,
        year: yearGroup,
        monthlyPayments: [],
        totalPaid: 0,
        totalDue: 0
      });
    }
    
    // Check if payment for this month already exists
    const existingPayment = membership.monthlyPayments.find(
      payment => payment.month === month && payment.year === parseInt(year) && payment.status === 'paid'
    );
    
    if (existingPayment) {
      return res.status(400).json({ msg: 'Payment for this month already exists' });
    }
    
    const amount = membership.year === 'third_year' ? 50 : 100;
    
    // Add new payment
    const newPayment = {
      month,
      year: parseInt(year),
      amount,
      paymentId,
      status: 'paid',
      paidOn: Date.now()
    };
    
    membership.monthlyPayments.push(newPayment);
    membership.totalPaid += amount;
    membership.totalDue = Math.max(0, membership.totalDue - amount);
    membership.lastPaymentDate = Date.now();
    
    await membership.save();
    
    res.json(membership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/membership/all
// @desc    Get all memberships (admin only)
// @access  Admin
router.get('/all', [auth, adminAuth], async (req, res) => {
    try {
      const memberships = await Membership.find().populate('user', ['name', 'email', 'graduationYear']);
      res.json(memberships);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   GET api/membership/pending
// @desc    Get users with pending payments (admin only)
// @access  Admin
router.get('/pending', [auth, adminAuth], async (req, res) => {
    try {
      const currentMonth = new Date().getMonth().toString();
      const currentYear = new Date().getFullYear();
      
      const memberships = await Membership.find().populate('user', ['name', 'email', 'graduationYear']);
      
      const pendingPayments = memberships.filter(membership => {
        const hasCurrentMonthPayment = membership.monthlyPayments.some(
          payment => 
            payment.month === currentMonth && 
            payment.year === currentYear &&
            payment.status === 'paid'
        );
        
        return !hasCurrentMonthPayment;
      });
      
      res.json(pendingPayments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   POST api/membership/send-reminders
// @desc    Send payment reminders to users with pending payments
// @access  Admin
router.post('/send-reminders', [auth, adminAuth], async (req, res) => {
    try {
      // In a real application, you would implement email sending logic here
      // For now, we'll just return a success message
      
      res.json({ msg: 'Payment reminders sent successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

// @route   GET api/membership/:id
// @desc    Get membership by ID (admin only)
// @access  Admin
router.get('/:id', [auth, adminAuth], async (req, res) => {
    try {
      const membership = await Membership.findById(req.params.id).populate('user', ['name', 'email', 'graduationYear']);
      
      if (!membership) {
        return res.status(404).json({ msg: 'Membership not found' });
      }
      
      res.json(membership);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Membership not found' });
      }
      res.status(500).send('Server Error');
    }
  });

module.exports = router; 