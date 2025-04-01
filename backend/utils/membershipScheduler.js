const cron = require('node-cron');
const Membership = require('../models/Membership');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  // Your email configuration
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to update dues on the 1st of every month
const updateMembershipDues = async () => {
  try {
    console.log('Running monthly membership dues update...');
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Get all active memberships
    const memberships = await Membership.find().populate('user');
    
    for (const membership of memberships) {
      // Check if payment for current month exists
      const hasCurrentMonthPayment = membership.monthlyPayments.some(
        payment => 
          payment.month === currentMonth.toString() && 
          payment.year === currentYear &&
          payment.status === 'paid'
      );
      
      // If no payment for current month, add to dues
      if (!hasCurrentMonthPayment) {
        const amount = membership.year === 'third_year' ? 50 : 100;
        membership.totalDue += amount;
        await membership.save();
        
        // Send email notification
        if (membership.user && membership.user.email) {
          const mailOptions = {
            from: 'innovation@example.com',
            to: membership.user.email,
            subject: 'Monthly Innovation Cell Contribution Due',
            html: `
              <h2>Innovation Cell Monthly Contribution</h2>
              <p>Dear ${membership.user.name},</p>
              <p>Your monthly contribution of ₹${amount} for the Innovation Cell is now due.</p>
              <p>Please log in to your account to make the payment.</p>
              <p>Total amount due: ₹${membership.totalDue}</p>
              <p>Thank you for your continued support!</p>
            `
          };
          
          transporter.sendMail(mailOptions);
        }
      }
    }
    
    console.log('Membership dues updated successfully');
  } catch (error) {
    console.error('Error updating membership dues:', error);
  }
};

// Function to send payment reminders
const sendPaymentReminders = async () => {
  try {
    console.log('Sending payment reminders...');
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Get all memberships with pending payments
    const memberships = await Membership.find().populate('user');
    
    for (const membership of memberships) {
      // Check if payment for current month exists
      const hasCurrentMonthPayment = membership.monthlyPayments.some(
        payment => 
          payment.month === currentMonth.toString() && 
          payment.year === currentYear &&
          payment.status === 'paid'
      );
      
      // If no payment for current month, send reminder
      if (!hasCurrentMonthPayment && membership.user && membership.user.email) {
        const amount = membership.year === 'third_year' ? 50 : 100;
        
        const mailOptions = {
          from: 'innovation@example.com',
          to: membership.user.email,
          subject: 'Reminder: Innovation Cell Monthly Contribution',
          html: `
            <h2>Payment Reminder</h2>
            <p>Dear ${membership.user.name},</p>
            <p>This is a friendly reminder that your monthly contribution of ₹${amount} for the Innovation Cell is due.</p>
            <p>Please log in to your account to make the payment.</p>
            <p>Total amount due: ₹${membership.totalDue}</p>
            <p>Thank you for your continued support!</p>
          `
        };
        
        transporter.sendMail(mailOptions);
      }
    }
    
    console.log('Payment reminders sent successfully');
  } catch (error) {
    console.error('Error sending payment reminders:', error);
  }
};

// Schedule monthly dues update (runs on the 1st of every month at 00:01)
cron.schedule('1 0 1 * *', updateMembershipDues);

// Schedule weekly payment reminders (runs every Monday at 09:00)
cron.schedule('0 9 * * 1', sendPaymentReminders);

module.exports = {
  updateMembershipDues,
  sendPaymentReminders
}; 