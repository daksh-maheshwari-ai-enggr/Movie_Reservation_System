const fmt = (d) =>
  new Date(d).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function ConfirmedPage({ booking, setPage }) {
  return (
    <main className="confirmed">
      <div className="check">✓</div>
      <h1>Booking Confirmed</h1>
      <p>Your seats are reserved. Enjoy the film.</p>
      <section className="card">
        <p>BOOKING REFERENCE</p>
        <h2>{booking.reference}</h2>
        <hr />
        <p>
          Film <b>{booking.showtime.movie.title}</b>
        </p>
        <p>
          Date & Time <b>{fmt(booking.showtime.startsAt)}</b>
        </p>
        <p>
          Seats <b>{booking.seatLabels.join(", ")}</b>
        </p>
        <h3>
          Total Charged <em>{money(booking.total)}</em>
        </h3>
      </section>
      <button className="gold" onClick={() => setPage("bookings")}>
        My Bookings
      </button>
    </main>
  );
}
