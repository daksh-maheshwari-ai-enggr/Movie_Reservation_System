import { ShowtimeSeat, Showtime, Booking, Payment } from "../models.js";
export const releaseExpired = async (showtimeId) =>
  ShowtimeSeat.updateMany(
    {
      showtime: showtimeId,
      status: "HELD",
      holdExpiresAt: { $lte: new Date() },
    },
    { $set: { status: "AVAILABLE" }, $unset: { holdBy: 1, holdExpiresAt: 1 } },
  );
export async function holdSeats({ showtimeId, labels, userId }) {
  await releaseExpired(showtimeId);
  const expires = new Date(Date.now() + 600000);
  const result = await ShowtimeSeat.updateMany(
    { showtime: showtimeId, label: { $in: labels }, status: "AVAILABLE" },
    { $set: { status: "HELD", holdBy: userId, holdExpiresAt: expires } },
  );
  if (result.modifiedCount !== labels.length) {
    await ShowtimeSeat.updateMany(
      {
        showtime: showtimeId,
        label: { $in: labels },
        status: "HELD",
        holdBy: userId,
      },
      {
        $set: { status: "AVAILABLE" },
        $unset: { holdBy: 1, holdExpiresAt: 1 },
      },
    );
    throw Error("One or more seats were just taken");
  }
  return expires;
}
export async function confirmBooking({ showtimeId, userId, labels, last4 }) {
  await releaseExpired(showtimeId);
  const seats = await ShowtimeSeat.find({
    showtime: showtimeId,
    label: { $in: labels },
    status: "HELD",
    holdBy: userId,
    holdExpiresAt: { $gt: new Date() },
  });
  if (seats.length !== labels.length) throw Error("Your seat hold has expired");
  const showtime = await Showtime.findById(showtimeId);
  const subtotal = showtime.price * seats.length,
    serviceFee = +(subtotal * 0.05).toFixed(2),
    total = +(subtotal + serviceFee).toFixed(2);
  const reference = "CV" + Math.random().toString(36).slice(2, 8).toUpperCase();
  await ShowtimeSeat.updateMany(
    { _id: { $in: seats.map((s) => s._id) }, status: "HELD", holdBy: userId },
    { $set: { status: "BOOKED" }, $unset: { holdBy: 1, holdExpiresAt: 1 } },
  );
  const booking = await Booking.create({
    reference,
    user: userId,
    showtime: showtimeId,
    seats: seats.map((s) => s._id),
    seatLabels: labels,
    subtotal,
    serviceFee,
    total,
  });
  await Payment.create({ booking: booking._id, amount: total, last4 });
  return booking;
}
