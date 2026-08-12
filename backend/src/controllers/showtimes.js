import { Showtime, Seat, ShowtimeSeat } from "../models.js";
import { holdSeats, releaseExpired } from "../services/seatService.js";

export const listShowtimes = async (req, res) =>
  res.json(
    await Showtime.find(req.query.movie ? { movie: req.query.movie } : {})
      .populate("movie theater")
      .sort({ startsAt: 1 }),
  );

export const createShowtime = async (req, res) => {
  const st = await Showtime.create(req.body);
  const seats = await Seat.find({ theater: st.theater });
  await ShowtimeSeat.insertMany(
    seats.map((s) => ({
      showtime: st._id,
      seat: s._id,
      label: s.label,
      status: s.isBlocked ? "BLOCKED" : "AVAILABLE",
    })),
  );
  res.status(201).json(st);
};

export const deleteShowtime = async (req, res) => {
  await ShowtimeSeat.deleteMany({ showtime: req.params.id });
  await Showtime.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const getShowtimeSeats = async (req, res) => {
  await releaseExpired(req.params.id);
  res.json(
    await ShowtimeSeat.find({ showtime: req.params.id }).sort({ label: 1 }),
  );
};

export const holdShowtimeSeats = async (req, res) => {
  try {
    const expiresAt = await holdSeats({
      showtimeId: req.params.id,
      labels: req.body.labels,
      userId: req.user.id,
    });
    req.app.get("io").to(`showtime:${req.params.id}`).emit("seats:changed");
    res.json({ expiresAt });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const releaseShowtimeSeats = async (req, res) => {
  await ShowtimeSeat.updateMany(
    { showtime: req.params.id, holdBy: req.user.id, status: "HELD" },
    { $set: { status: "AVAILABLE" }, $unset: { holdBy: 1, holdExpiresAt: 1 } },
  );
  req.app.get("io").to(`showtime:${req.params.id}`).emit("seats:changed");
  res.status(204).end();
};
