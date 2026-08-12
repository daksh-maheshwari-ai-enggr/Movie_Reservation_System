import { useEffect, useState } from "react";
import { call } from "../utils/api.js";
import { formatMoney, formatDate } from "../utils/formatters.js";

export default function BookingsPage({ user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    call("/bookings/me", { token: user.token }).then(setBookings);
  }, [user.token]);

  return (
    <main>
      <h1>My Bookings</h1>
      <div className="bookinglist">
        {bookings.map((booking) => (
          <article key={booking._id} className="card">
            <img src={booking.showtime.movie.posterUrl} alt={booking.showtime.movie.title} />
            <div>
              <h2>{booking.showtime.movie.title}</h2>
              <p>
                {booking.showtime.theater.name} · {formatDate(booking.showtime.startsAt)}
                <br />
                {booking.seatLabels.join(", ")}
              </p>
              <span className="success">CONFIRMED</span> <em>{booking.reference}</em>
            </div>
            <h2>{formatMoney(booking.total)}</h2>
          </article>
        ))}
        {!bookings.length && <p>No bookings yet.</p>}
      </div>
    </main>
  );
}
