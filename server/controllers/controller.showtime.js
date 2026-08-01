const Showtime = require("../models/showtime.model.js");

// ==========================
// CREATE SHOWTIME
// POST /api/admin/showtimes
// ==========================
const createShowtime = async (req, res) => {
  try {
    const { movie, theater, startTime, ticketPrice } = req.body;

    if (!movie || !theater || !startTime || !ticketPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const showtime = await Showtime.create({
      movie,
      theater,
      startTime,
      ticketPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Showtime created successfully",
      data: showtime,
    });

  } catch (error) {
    console.log("Create showtime error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================
// GET ALL SHOWTIMES
// GET /api/admin/showtimes
// ==========================
const getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate("movie")
      .populate("theater")
      .sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      count: showtimes.length,
      data: showtimes,
    });

  } catch (error) {
    console.log("Get showtimes error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================
// GET SHOWTIME BY ID
// GET /api/admin/showtimes/:id
// ==========================
const getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;

    const showtime = await Showtime.findById(id)
      .populate("movie")
      .populate("theater");

    if (!showtime) {
      return res.status(404).json({
        success: false,
        message: "Showtime not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: showtime,
    });

  } catch (error) {
    console.log("Get showtime error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================
// UPDATE SHOWTIME
// PUT /api/admin/showtimes/:id
// ==========================
const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;

    const showtime = await Showtime.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!showtime) {
      return res.status(404).json({
        success: false,
        message: "Showtime not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Showtime updated successfully",
      data: showtime,
    });

  } catch (error) {
    console.log("Update showtime error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================
// DELETE SHOWTIME
// DELETE /api/admin/showtimes/:id
// ==========================
const deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;

    const showtime = await Showtime.findByIdAndDelete(id);

    if (!showtime) {
      return res.status(404).json({
        success: false,
        message: "Showtime not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Showtime deleted successfully",
    });

  } catch (error) {
    console.log("Delete showtime error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
};