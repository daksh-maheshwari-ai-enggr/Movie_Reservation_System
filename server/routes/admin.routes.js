const express = require("express");

const {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovieById,
  getAllMovies,
} = require("../controllers/controller.movie.js");

const { protect, authorize } = require("../middleware/auth");

const adminRoutes = express.Router();

// Public Routes
adminRoutes.get("/movies", getAllMovies);
adminRoutes.get("/movies/:id", getMovieById);

// Admin Only Routes
adminRoutes.post(
  "/movies",
  protect,
  authorize("Admin"),
  createMovie
);

adminRoutes.put(
  "/movies/:id",
  protect,
  authorize("Admin"),
  updateMovie
);

adminRoutes.delete(
  "/movies/:id",
  protect,
  authorize("Admin"),
  deleteMovie
);

module.exports = adminRoutes;