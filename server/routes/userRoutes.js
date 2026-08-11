const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
} = require("../controllers/userController");

const { protect } = require("../middleware/auth");

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/bookings").get(protect, getUserBookings);

module.exports = router;