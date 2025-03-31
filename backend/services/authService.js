const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Register user
exports.registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Create verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'student',
    isVerified: false
  });

  // Create verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

  // Create email message
  const message = `
    <h1>Email Verification</h1>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}" target="_blank">Verify Email</a>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Email Verification',
      message
    });

    // Save verification token to user
    user.resetPasswordToken = verificationToken;
    user.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    return { success: true, message: 'Verification email sent' };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    throw new Error('Email could not be sent');
  }
};

// Login user
exports.loginUser = async (email, password) => {
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Check if user is verified
  if (!user.isVerified) {
    throw new Error('Please verify your email to login');
  }

  // Create token
  const token = user.getSignedJwtToken();

  // Remove password from response
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    skills: user.skills,
    graduationYear: user.graduationYear,
    company: user.company,
    position: user.position,
    profilePicture: user.profilePicture,
    isVerified: user.isVerified
  };

  return { token, user: userResponse };
};

// Verify email
exports.verifyEmail = async (token) => {
  // Find user with token
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired token');
  }

  // Set user as verified
  user.isVerified = true;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { success: true, message: 'Email verified successfully' };
};

// Forgot password
exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('No user with that email');
  }

  // Get reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    <h1>Password Reset Request</h1>
    <p>You are receiving this email because you (or someone else) has requested the reset of a password.</p>
    <p>Please click on the following link to reset your password:</p>
    <a href="${resetUrl}" target="_blank">Reset Password</a>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message
    });

    return { success: true, message: 'Email sent' };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    throw new Error('Email could not be sent');
  }
};

// Reset password
exports.resetPassword = async (token, password) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired token');
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { success: true, message: 'Password reset successful' };
};

// Update user profile
exports.updateProfile = async (userId, updateData) => {
  // Fields to update
  const fieldsToUpdate = {};
  
  // Only allow certain fields to be updated
  const allowedFields = ['name', 'bio', 'skills', 'graduationYear', 'company', 'position', 'profilePicture'];
  
  for (const [key, value] of Object.entries(updateData)) {
    if (allowedFields.includes(key)) {
      fieldsToUpdate[key] = value;
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: fieldsToUpdate },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Get current user
exports.getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}; 