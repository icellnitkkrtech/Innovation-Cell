const authService = require('../services/authService');

// Register user
exports.register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Email already registered') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }
    
    const { token, user } = await authService.loginUser(email, password);
    
    // Set token in HTTP-only cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict'
    };
    
    res.cookie('token', token, cookieOptions);
    
    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    if (
      err.message === 'Invalid credentials' ||
      err.message === 'Please verify your email to login'
    ) {
      return res.status(401).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'User not found') {
      return res.status(404).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const result = await authService.verifyEmail(req.params.token);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Invalid or expired token') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'No user with that email') {
      return res.status(404).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(
      req.params.token,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Invalid or expired token') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'User not found') {
      return res.status(404).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
}; 