const express = require("express");

const {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
} = require("../controllers/controller.showtime.js");

const showtimeRoutes = express.Router();

showtimeRoutes.post("/showtimes", createShowtime);

showtimeRoutes.get("/showtimes", getAllShowtimes);

showtimeRoutes.get("/showtimes/:id", getShowtimeById);

showtimeRoutes.put("/showtimes/:id", updateShowtime);

showtimeRoutes.delete("/showtimes/:id", deleteShowtime);

module.exports = showtimeRoutes;