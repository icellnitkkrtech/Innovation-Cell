const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.auth = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in cookies first (preferred method)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // Fallback to Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // If no token found
    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({ msg: 'Not authorized to access this route' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
      
      // Add user to request
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Admin middleware
exports.adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to access this route' });
  }
  next();
}; 