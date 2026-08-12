import { Movie, Theater, Booking } from "../models.js";

export const stats = async (req, res) => {
  const [movies, theaters, bookings] = await Promise.all([
    Movie.countDocuments(),
    Theater.countDocuments(),
    Booking.find({ status: "CONFIRMED" }).populate("user showtime"),
  ]);
  res.json({
    movies,
    theaters,
    confirmedBookings: bookings.length,
    revenue: bookings.reduce((n, b) => n + b.total, 0),
    bookings,
  });
};
