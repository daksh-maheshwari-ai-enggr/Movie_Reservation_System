import { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import Modal from "../components/Modal.jsx";
import { call } from "../utils/api.js";
import { formatMoney } from "../utils/formatters.js";

export default function AdminPage({ user, movies, showtimes, refresh }) {
  const [tab, setTab] = useState("Overview");
  const [theaters, setTheaters] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    Promise.all([call("/theaters"), call("/admin/stats", { token: user.token })]).then(
      ([theatersData, statsData]) => {
        setTheaters(theatersData);
        setStats(statsData);
      },
    );
  }, [tab, user.token]);

  const submit = async (e) => {
    e.preventDefault();
    const kind = form.kind;
    const body = { ...form };
    delete body.kind;
    const path = form._id ? `/${kind}/${form._id}` : `/${kind}`;
    const method = form._id ? "PUT" : "POST";
    delete body._id;

    try {
      let made = await call(path, {
        token: user.token,
        method,
        body: JSON.stringify(body),
      });

      if (kind === "theaters" && !form._id) {
        await call(`/theaters/${made._id}/seats`, {
          token: user.token,
          method: "POST",
        });
      }

      setForm(null);
      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const removeItem = async (kind, id) => {
    if (!confirm("Remove this item?")) return;
    await call(`/${kind}/${id}`, { token: user.token, method: "DELETE" });
    refresh();
  };

  return (
    <main className="admin">
      <h1>Admin Dashboard</h1>
      <div className="metrics">
        {[
          ["Films", stats?.movies],
          ["Theaters", stats?.theaters],
          ["Confirmed bookings", stats?.confirmedBookings],
          ["Revenue", formatMoney(stats?.revenue)],
        ].map(([label, value]) => (
          <div key={label} className="card">
            <p>{label}</p>
            <h2>{value ?? "—"}</h2>
          </div>
        ))}
      </div>

      <div className="tabs">
        {["Overview", "Movies", "Theaters", "Showtimes"].map((tabName) => (
          <button
            key={tabName}
            className={tabName === tab ? "active" : ""}
            onClick={() => setTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <h2 className="section-title">All Bookings</h2>
          <Table
            headings={["Reference", "Film", "Customer", "Seats", "Total", "Status"]}
            rows={stats?.bookings || []}
            cols={["reference", "showtime.movie.title", "user.name", "seatLabels", "total", "status"]}
          />
        </>
      )}

      {tab === "Movies" && (
        <>
          <button
            className="gold add"
            onClick={() =>
              setForm({
                kind: "movies",
                title: "",
                genre: "Sci-Fi",
                duration: 120,
                rating: "PG-13",
                year: 2026,
                director: "",
                description: "",
                posterUrl: "",
              })
            }
          >
            + Add Film
          </button>
          <h2 className="section-title">Films</h2>
          <Table
            headings={["Title", "Genre", "Duration", "Rating", "Actions"]}
            rows={movies}
            cols={["title", "genre", "duration", "rating"]}
            edit={(item) => setForm({ ...item, kind: "movies" })}
            del={(item) => removeItem("movies", item._id)}
          />
        </>
      )}

      {tab === "Theaters" && (
        <>
          <button
            className="gold add"
            onClick={() =>
              setForm({
                kind: "theaters",
                name: "",
                rows: 7,
                seatsPerRow: 12,
                description: "",
              })
            }
          >
            + Add Theater
          </button>
          <h2 className="section-title">Theaters</h2>
          <Table
            headings={["Theater", "Rows", "Seats / row", "Description", "Actions"]}
            rows={theaters}
            cols={["name", "rows", "seatsPerRow", "description"]}
            edit={(item) => setForm({ ...item, kind: "theaters" })}
            del={(item) => removeItem("theaters", item._id)}
          />
        </>
      )}

      {tab === "Showtimes" && (
        <>
          <button
            className="gold add"
            onClick={() =>
              setForm({
                kind: "showtimes",
                movie: movies[0]?._id,
                theater: theaters[0]?._id,
                startsAt: "",
                price: 16,
              })
            }
          >
            + Add Showtime
          </button>
          <h2 className="section-title">Showtimes</h2>
          <Table
            headings={["Film", "Theater", "Date & time", "Price", "Actions"]}
            rows={showtimes}
            cols={["movie.title", "theater.name", "startsAt", "price"]}
            del={(item) => removeItem("showtimes", item._id)}
          />
        </>
      )}

      {form && (
        <Modal
          form={form}
          setForm={setForm}
          movies={movies}
          theaters={theaters}
          submit={submit}
        />
      )}
    </main>
  );
}
