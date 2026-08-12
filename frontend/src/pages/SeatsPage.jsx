import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { call } from "../utils/api.js";

const fmt = (d) =>
  new Date(d).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function SeatsPage({ showtime, user, setPage, setOrder }) {
  const [seats, setSeats] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [error, setError] = useState("");
  const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;

  const loadSeats = () => call(`/showtimes/${showtime._id}/seats`).then(setSeats);

  useEffect(() => {
    loadSeats();
    const socket = io(socketUrl);
    socket.emit("showtime:join", showtime._id);
    socket.on("seats:changed", loadSeats);
    return () => socket.close();
  }, [showtime._id]);

  const toggleSeat = (seat) => {
    if (seat.status !== "AVAILABLE") return;
    setChosen((current) =>
      current.includes(seat.label)
        ? current.filter((label) => label !== seat.label)
        : [...current, seat.label],
    );
  };

  const next = async () => {
    if (!user) return setPage("auth");
    try {
      const data = await call(`/showtimes/${showtime._id}/hold`, {
        token: user.token,
        method: "POST",
        body: JSON.stringify({ labels: chosen }),
      });
      setOrder({ labels: chosen, expiresAt: data.expiresAt });
      setPage("summary");
    } catch (error) {
      setError(error.message);
      loadSeats();
    }
  };

  return (
    <main className="seatpage">
      <h2>Choose your seats</h2>
      <p>
        {showtime.movie.title} · {showtime.theater.name} · {fmt(showtime.startsAt)}
      </p>
      <div className="screen">SCREEN</div>
      <div className="seats">
        {seats.map((seat) => (
          <button
            key={seat._id}
            title={seat.label}
            className={`seat ${seat.status.toLowerCase()} ${chosen.includes(seat.label) ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat.label.replace(/\d+/, "") !==
              seats[seats.indexOf(seat) - 1]?.label?.replace(/\d+/, "") && (
              <i>{seat.label.replace(/\d+/, "")}</i>
            )}
            {seat.label}
          </button>
        ))}
      </div>
      <div className="legend">
        <span className="available">Available</span>
        <span className="selected">Selected</span>
        <span className="held">Reserved</span>
        <span className="blocked">Blocked</span>
      </div>
      {error && <p className="error">{error}</p>}
      <footer className="selection">
        {chosen.length ? (
          <div>
            <b>
              {chosen.length} seats: {chosen.join(", ")}
            </b>
            <p>
              Total: <em>{money(chosen.length * showtime.price)}</em>
            </p>
          </div>
        ) : (
          <p>Click seats to select them</p>
        )}
        <button className="gold" disabled={!chosen.length} onClick={next}>
          Continue →
        </button>
      </footer>
    </main>
  );
}
