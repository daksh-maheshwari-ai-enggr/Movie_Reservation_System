import { Booking } from "../models.js";
import { confirmBooking } from "../services/seatService.js";

export const confirm = async (req, res) => {
  try {
    const b = await confirmBooking({ ...req.body, userId: req.user.id });
    req.app.get("io").to(`showtime:${b.showtime}`).emit("seats:changed");
    res
      .status(201)
      .json(
        await b.populate({
          path: "showtime",
          populate: { path: "movie theater" },
        }),
      );
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const myBookings = async (req, res) =>
  res.json(
    await Booking.find({ user: req.user.id })
      .populate({ path: "showtime", populate: { path: "movie theater" } })
      .sort({ createdAt: -1 }),
  );
