const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
} = require('../controllers/userController');
const { protectMock } = require('../middleware/authMock');

// Note: Using protectMock temporarily until Module 1 is ready
router
  .route('/profile')
  .get(protectMock, getUserProfile)
  .put(protectMock, updateUserProfile);

router.route('/bookings').get(protectMock, getUserBookings);

module.exports = router;
