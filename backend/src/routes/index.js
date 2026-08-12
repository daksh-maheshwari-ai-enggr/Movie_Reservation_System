import express from "express";
import { createCrud } from "../controllers/crud.js";
import * as authCtr from "../controllers/auth.js";
import * as moviesCtr from "../controllers/movies.js";
import * as theatersCtr from "../controllers/theaters.js";
import * as showtimesCtr from "../controllers/showtimes.js";
import * as bookingsCtr from "../controllers/bookings.js";
import * as adminCtr from "../controllers/admin.js";
import { auth } from "../middleware/auth.js";
import { Movie, Theater } from "../models.js";

export const api = express.Router();

api.post("/auth/register", authCtr.register);
api.post("/auth/login", authCtr.login);

api.get("/movies", moviesCtr.listMovies);
api.use("/movies", createCrud(Movie));
api.use("/theaters", createCrud(Theater));
api.post("/theaters/:id/seats", theatersCtr.createTheaterSeats);

api.get("/showtimes", showtimesCtr.listShowtimes);
api.post("/showtimes", showtimesCtr.createShowtime);
api.delete("/showtimes/:id", showtimesCtr.deleteShowtime);

api.get("/showtimes/:id/seats", showtimesCtr.getShowtimeSeats);
api.post("/showtimes/:id/hold", auth, showtimesCtr.holdShowtimeSeats);
api.post("/showtimes/:id/release", auth, showtimesCtr.releaseShowtimeSeats);

api.post("/bookings/confirm", auth, bookingsCtr.confirm);
api.get("/bookings/me", auth, bookingsCtr.myBookings);

api.get("/admin/stats", auth, adminCtr.stats);
