import { Movie } from "../models.js";

export const listMovies = async (req, res) => {
  const q = req.query.q
    ? {
        $or: [
          { title: { $regex: req.query.q, $options: "i" } },
          { director: { $regex: req.query.q, $options: "i" } },
        ],
      }
    : {};
  if (req.query.genre) q.genre = req.query.genre;
  res.json(await Movie.find(q).sort({ createdAt: -1 }));
};
