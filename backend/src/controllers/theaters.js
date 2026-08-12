import { Theater, Seat } from "../models.js";

export const createTheaterSeats = async (req, res) => {
  const t = await Theater.findById(req.params.id);
  const seats = [];
  for (let r = 0; r < t.rows; r++)
    for (let n = 1; n <= t.seatsPerRow; n++)
      seats.push({
        theater: t._id,
        row: String.fromCharCode(65 + r),
        number: n,
        label: `${String.fromCharCode(65 + r)}${n}`,
      });
  await Seat.deleteMany({ theater: t._id });
  res.json(await Seat.insertMany(seats));
};
