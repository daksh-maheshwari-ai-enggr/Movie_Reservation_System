import { useEffect, useState } from "react";
import { ModalShell } from "./ModalShell";
import {
  createShowtime,
  getMovies,
  getTheaters,
} from "../../api/adminApi";

export function AddShowtimeModal({ onClose, onShowtimeAdded }) {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  const [movie, setMovie] = useState("");
  const [theater, setTheater] = useState("");
  const [startTime, setStartTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const moviesRes = await getMovies();
      const theatersRes = await getTheaters();

      setMovies(moviesRes.data || []);
      setTheaters(theatersRes.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function submitShowtime(e) {
    e.preventDefault();

    try {
      const response = await createShowtime({
        movie,
        theater,
        startTime,
        ticketPrice: Number(ticketPrice),
      });

      if (onShowtimeAdded) {
        onShowtimeAdded(response.data);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create showtime");
    }
  }

  return (
    <ModalShell title="Add Showtime" onClose={onClose}>
      <form onSubmit={submitShowtime}>

        <label className="block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Movie
          </span>

          <select
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            required
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          >
            <option value="">Select Movie</option>

            {movies.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Theater
          </span>

          <select
            value={theater}
            onChange={(e) => setTheater(e.target.value)}
            required
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          >
            <option value="">Select Theater</option>

            {theaters.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Date & Time
          </span>

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm uppercase tracking-[0.12em] text-[#9492ba]">
            Ticket Price
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            required
            className="h-16 w-full rounded-xl border border-[#2a2b42] bg-[#0f0f18] px-5 outline-none focus:border-[#d69b22]"
          />
        </label>

        <div className="mt-9 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#2d2e45] bg-[#1a1a26] px-5 py-4 text-lg font-semibold hover:bg-[#242434]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#d69b22] px-5 py-4 text-lg font-semibold text-black hover:bg-[#ebae30]"
          >
            Add Showtime
          </button>
        </div>
      </form>
    </ModalShell>
  );
}