const Seat = require("../models/Seat");

// GET all seats for a show
const getSeatsByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const seats = await Seat.find({ showId });

    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSeatsByShow,
};