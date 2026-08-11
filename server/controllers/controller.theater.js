const Theater = require("../models/theater.model.js");


// ==========================
// CREATE THEATER
// POST /api/admin/theaters
// ==========================

const createTheater = async (req, res) => {
  try {
    const { name, rows, seatsPerRow, description } = req.body;

    if (!name || !rows || !seatsPerRow) {
      return res.status(400).json({
        success: false,
        message: "Name, rows and seats per row are required",
      });
    }

    const theater = await Theater.create({
      name,
      rows,
      seatsPerRow,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Theater created successfully",
      data: theater,
    });

  } catch (error) {
    console.log("Create theater error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================
// GET ALL THEATERS
// GET /api/admin/theaters
// ==========================

const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();

    return res.status(200).json({
      success: true,
      count: theaters.length,
      data: theaters,
    });

  } catch (error) {
    console.log("Get theaters error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================
// UPDATE THEATER
// PUT /api/admin/theaters/:id
// ==========================

const updateTheater = async (req, res) => {
  try {
    const { id } = req.params;

    const theater = await Theater.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Theater updated successfully",
      data: theater,
    });

  } catch (error) {
    console.log("Update theater error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================
// DELETE THEATER
// DELETE /api/admin/theaters/:id
// ==========================

const deleteTheater = async (req, res) => {
  try {
    const { id } = req.params;

    const theater = await Theater.findByIdAndDelete(id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Theater deleted successfully",
    });

  } catch (error) {
    console.log("Delete theater error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  createTheater,
  getAllTheaters,
  updateTheater,
  deleteTheater,
};