const User = require('../models/User');

/**
 * Mock Authentication Middleware
 * Temporarily attaches a seeded user to req.user for Module 2 testing.
 * To be replaced when Module 1 (Authentication) is completed.
 */
const protectMock = async (req, res, next) => {
  try {
    // Find the test user in the database
    // In a real scenario, this would verify a JWT and find by decoded ID
    const user = await User.findOne({ email: 'alex.rivera@cinevault.demo' });
    
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, mock user not found. Run seed script first.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, mock token failed' });
  }
};

module.exports = { protectMock };
