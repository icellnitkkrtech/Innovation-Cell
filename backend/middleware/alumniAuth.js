const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect alumni routes
exports.protectAlumniRoutes = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Check if user is alumni or admin
exports.isAlumniOrAdmin = (req, res, next) => {
  if (req.user.role !== 'alumni' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Access denied. Only alumni and administrators can access this resource' 
    });
  }
  next();
}; 