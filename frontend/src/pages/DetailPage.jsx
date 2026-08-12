const fmt = (d) =>
  new Date(d).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function DetailPage({ movie, showtimes, setPage, setShowtime }) {
  const shows = showtimes.filter((s) => s.movie._id === movie._id);

  return (
    <main className="detail">
      <button className="link" onClick={() => setPage("films")}> 
        ← All Films
      </button>
      <div className="detailtop">
        <img src={movie.posterUrl} alt={movie.title} />
        <div>
          <p>
            {movie.year} · {movie.genre?.toUpperCase()} · {movie.duration} MIN
          </p>
          <h1>{movie.title}</h1>
          <span className="badge">{movie.rating}</span>
          <p className="description">{movie.description}</p>
          <div className="credits">
            <div>
              DIRECTOR<b>{movie.director}</b>
            </div>
            <div>
              CAST<b>{movie.cast?.join(", ")}</b>
            </div>
          </div>
          <h2>Available Showtimes</h2>
          <div className="shows">
            {shows.map((showtime) => (
              <button
                key={showtime._id}
                onClick={() => {
                  setShowtime(showtime);
                  setPage("seats");
                }}
              >
                <b>{fmt(showtime.startsAt).split(", ")[1]}</b>
                <small>
                  {showtime.theater.name} · {money(showtime.price)}
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
