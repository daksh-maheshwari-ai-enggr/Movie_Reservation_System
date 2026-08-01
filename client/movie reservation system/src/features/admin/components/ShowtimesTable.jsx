import { useEffect, useState } from "react";
import { getShowtimes } from "../api/adminApi";

export function ShowtimesTable({ onAddShowtime }) {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  async function fetchShowtimes() {
    try {
      const response = await getShowtimes();
      setShowtimes(response.data || []);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-[#9997bd]">
        Loading showtimes...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Showtimes</h2>

        <button
          onClick={onAddShowtime}
          className="rounded-xl bg-[#d69b22] px-5 py-3 font-semibold text-black transition hover:bg-[#ecaf32]"
        >
          + Add Showtime
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#292a42] bg-[#111119]">
        <table className="w-full min-w-[940px] border-collapse text-lg">
          <thead>
            <tr>
              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Film
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Theater
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Date & Time
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Price
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Occupancy
              </th>

              <th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {showtimes.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="border-t border-[#232438] px-6 py-8 text-center text-[#9997bd]"
                >
                  No showtimes found.
                </td>
              </tr>
            ) : (
              showtimes.map((showtime) => (
                <tr key={showtime._id}>
                  <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">
                    {showtime.movie?.title}
                  </td>

                  <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                    {showtime.theater?.name}
                  </td>

                  <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">
                    {new Date(showtime.startTime).toLocaleString()}
                  </td>

                  <td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">
                    ${showtime.ticketPrice}
                  </td>

                  <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                    N/A
                  </td>

                  <td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">
                    <button className="mr-5 hover:text-[#d69b22]">
                      Seats
                    </button>

                    <button className="hover:text-[#e37979]">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}