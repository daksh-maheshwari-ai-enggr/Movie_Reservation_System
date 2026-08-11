import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";
import "./styles.css";
const API = import.meta.env.VITE_API_URL || "/api",
  SOCKET = import.meta.env.VITE_SOCKET_URL || window.location.origin;
const call = async (path, { token, ...opts } = {}) => {
  const r = await fetch(API + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...opts,
  });
  const data = await (r.headers.get("content-type")?.includes("json")
    ? r.json()
    : null);
  if (!r.ok) throw Error(data?.message || "Request failed");
  return data;
};
const fmt = (d) =>
  new Date(d).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
const money = (n) => `$${Number(n || 0).toFixed(2)}`;
function Header({ user, setPage, logout }) {
  return (
    <header>
      <button className="brand" onClick={() => setPage("films")}>
        CINÉ<span>VAULT</span>
      </button>
      <nav>
        <button onClick={() => setPage("films")}>Films</button>
        {user && (
          <button onClick={() => setPage("bookings")}>My Bookings</button>
        )}
        {user?.role === "ADMIN" && (
          <button onClick={() => setPage("admin")}>Admin</button>
        )}
      </nav>
      <div className="account">
        {user ? (
          <>
            <b>{user.name}</b>
            <small>{user.role === "ADMIN" ? "Administrator" : "Member"}</small>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button className="gold" onClick={() => setPage("auth")}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
function Auth({ onDone, setPage }) {
  const [register, setRegister] = useState(false),
    [form, setForm] = useState({ name: "", email: "", password: "" }),
    [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const d = await call("/auth/" + (register ? "register" : "login"), {
        method: "POST",
        body: JSON.stringify(form),
      });
      onDone(d);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <main className="auth">
      <form className="card" onSubmit={submit}>
        <h1>{register ? "Create Account" : "Sign In"}</h1>
        <div className="switch">
          <button
            type="button"
            className={!register ? "active" : ""}
            onClick={() => setRegister(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={register ? "active" : ""}
            onClick={() => setRegister(true)}
          >
            Register
          </button>
        </div>
        {register && (
          <Field
            label="Full name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
        )}
        <Field
          label="Email address"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
        />
        {!register && (
          <div className="demo">
            <b>Demo accounts — password: demo1234</b>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  email: "member@cinevault.demo",
                  password: "demo1234",
                })
              }
            >
              Member — Alex Rivera
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  email: "admin@cinevault.demo",
                  password: "demo1234",
                })
              }
            >
              Admin — Morgan Adeyemi
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button className="gold wide">
          {register ? "Create Account" : "Sign In"}
        </button>
        <button type="button" className="link" onClick={() => setPage("films")}>
          Cancel
        </button>
      </form>
    </main>
  );
}
const Field = ({ label, value, onChange, type = "text" }) => (
  <label>
    {label}
    <input
      required
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);
function Films({ movies, setPage, setMovie }) {
  const [q, setQ] = useState(""),
    [genre, setGenre] = useState("");
  const genres = [
    "All",
    "Sci-Fi",
    "Thriller",
    "Drama",
    "Action",
    "Comedy",
    "Horror",
  ];
  const list = movies.filter(
    (m) =>
      (!genre || m.genre === genre) &&
      `${m.title} ${m.director}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <main>
      <section className="hero">
        <p>NOW SHOWING</p>
        <h1>This Week’s Films</h1>
      </section>
      <div className="filters">
        <input
          placeholder="Search by title or director..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {genres.map((g) => (
          <button
            className={(g === "All" ? !genre : genre === g) ? "gold" : ""}
            onClick={() => setGenre(g === "All" ? "" : g)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="moviegrid">
        {list.map((m) => (
          <article
            className="movie"
            onClick={() => {
              setMovie(m);
              setPage("detail");
            }}
          >
            <img src={m.posterUrl} alt="" />
            <h3>{m.title}</h3>
            <p>
              {m.genre} · {m.duration}m
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
function Detail({ movie, showtimes, setPage, setShowtime }) {
  const shows = showtimes.filter((s) => s.movie._id === movie._id);
  return (
    <main className="detail">
      <button className="link" onClick={() => setPage("films")}>
        ← All Films
      </button>
      <div className="detailtop">
        <img src={movie.posterUrl} />
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
            {shows.map((s) => (
              <button
                onClick={() => {
                  setShowtime(s);
                  setPage("seats");
                }}
              >
                <b>{fmt(s.startsAt).split(", ")[1]}</b>
                <small>
                  {s.theater.name} · {money(s.price)}
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
function Seats({ showtime, user, setPage, setOrder }) {
  const [seats, setSeats] = useState([]),
    [chosen, setChosen] = useState([]),
    [error, setError] = useState("");
  const load = () => call(`/showtimes/${showtime._id}/seats`).then(setSeats);
  useEffect(() => {
    load();
    const s = io(SOCKET);
    s.emit("showtime:join", showtime._id);
    s.on("seats:changed", load);
    return () => s.close();
  }, [showtime._id]);
  const toggle = (s) => {
    if (s.status !== "AVAILABLE") return;
    setChosen((x) =>
      x.includes(s.label) ? x.filter((y) => y !== s.label) : [...x, s.label],
    );
  };
  const next = async () => {
    if (!user) return setPage("auth");
    try {
      const d = await call(`/showtimes/${showtime._id}/hold`, {
        token: user.token,
        method: "POST",
        body: JSON.stringify({ labels: chosen }),
      });
      setOrder({ labels: chosen, expiresAt: d.expiresAt });
      setPage("summary");
    } catch (e) {
      setError(e.message);
      load();
    }
  };
  return (
    <main className="seatpage">
      <h2>Choose your seats</h2>
      <p>
        {showtime.movie.title} · {showtime.theater.name} ·{" "}
        {fmt(showtime.startsAt)}
      </p>
      <div className="screen">SCREEN</div>
      <div className="seats">
        {seats.map((s) => (
          <button
            title={s.label}
            className={`seat ${s.status.toLowerCase()} ${chosen.includes(s.label) ? "selected" : ""}`}
            onClick={() => toggle(s)}
          >
            {s.label.replace(/\d+/, "") !==
              seats[seats.indexOf(s) - 1]?.label?.replace(/\d+/, "") && (
              <i>{s.label.replace(/\d+/, "")}</i>
            )}
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
function Summary({ showtime, order, user, setPage, setBooking }) {
  const [remaining, setRemaining] = useState(0),
    [busy, setBusy] = useState(false),
    [payment, setPayment] = useState({ number: "", holder: user.name, expiry: "", cvv: "" }),
    [paymentError, setPaymentError] = useState("");
  useEffect(() => {
    const t = setInterval(
      () =>
        setRemaining(
          Math.max(
            0,
            Math.ceil((new Date(order.expiresAt) - Date.now()) / 1000),
          ),
        ),
      500,
    );
    return () => clearInterval(t);
  }, []);
  const subtotal = order.labels.length * showtime.price,
    fee = +(subtotal * 0.05).toFixed(2);
  const pay = async () => {
    const digits = payment.number.replace(/\D/g, "");
    if (digits.length < 12 || !payment.holder.trim() || !/^\d{2}\/\d{2}$/.test(payment.expiry) || payment.cvv.length < 3) {
      setPaymentError("Enter a valid card number, cardholder name, expiry date and CVV.");
      return;
    }
    setBusy(true);
    try {
      const b = await call("/bookings/confirm", {
        token: user.token,
        method: "POST",
        body: JSON.stringify({
          showtimeId: showtime._id,
          labels: order.labels,
          // Only the last four digits are sent to the demo backend. Card number and CVV stay in this form.
          last4: digits.slice(-4),
        }),
      });
      setBooking(b);
      setPage("confirmed");
    } catch (e) {
      alert(e.message);
      setPage("seats");
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="summary">
      <h1>Order Summary</h1>
      <div className="hold">
        ◷ Seats held for {String(Math.floor(remaining / 60)).padStart(2, "0")}:
        {String(remaining % 60).padStart(2, "0")}
      </div>
      <section className="card">
        <div className="summaryfilm">
          <img src={showtime.movie.posterUrl} />
          <div>
            <h2>{showtime.movie.title}</h2>
            <p>
              {showtime.theater.name}
              <br />
              {fmt(showtime.startsAt)}
            </p>
          </div>
        </div>
        <hr />
        <p>
          Seats <b>{order.labels.join(", ")}</b>
        </p>
        <p>
          {order.labels.length} × {money(showtime.price)}{" "}
          <b>{money(subtotal)}</b>
        </p>
        <p>
          Service fee (5%) <b>{money(fee)}</b>
        </p>
        <hr />
        <h3>
          Total <em>{money(subtotal + fee)}</em>
        </h3>
      </section>
      <section className="payment">
        <div className="payment-card">
          <span>PAYMENT CARD</span>
          <strong>{payment.number ? payment.number.replace(/\d(?=\d{4})/g, "•") : "••••  ••••  ••••  ••••"}</strong>
          <div><small>Card Holder<b>{payment.holder || "YOUR NAME"}</b></small><small>Expires<b>{payment.expiry || "MM/YY"}</b></small></div>
        </div>
        <label>Card number<input inputMode="numeric" maxLength="19" placeholder="1234 5678 9012 3456" value={payment.number} onChange={e=>setPayment({...payment,number:e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim()})}/></label>
        <label>Cardholder name<input placeholder="Your name" value={payment.holder} onChange={e=>setPayment({...payment,holder:e.target.value})}/></label>
        <div className="payment-row"><label>Expiry (MM/YY)<input placeholder="08/27" maxLength="5" value={payment.expiry} onChange={e=>setPayment({...payment,expiry:e.target.value.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2")})}/></label><label>CVV<input type="password" inputMode="numeric" maxLength="4" placeholder="•••" value={payment.cvv} onChange={e=>setPayment({...payment,cvv:e.target.value.replace(/\D/g,"")})}/></label></div>
        <div className="payment-note">🔒 Payments are end-to-end encrypted and processed securely. <br/>(Demo — no real charge.)</div>
        {paymentError && <p className="error">{paymentError}</p>}
        <button
          className="gold wide"
          disabled={busy || remaining === 0}
          onClick={pay}
        >
          {busy ? "Processing…" : "Pay & Confirm Booking"}
        </button>
      </section>
    </main>
  );
}
function Confirmed({ booking, setPage }) {
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
function Bookings({ user }) {
  const [data, setData] = useState([]);
  useEffect(
    () => call("/bookings/me", { token: user.token }).then(setData),
    [],
  );
  return (
    <main>
      <h1>My Bookings</h1>
      <div className="bookinglist">
        {data.map((b) => (
          <article className="card">
            <img src={b.showtime.movie.posterUrl} />
            <div>
              <h2>{b.showtime.movie.title}</h2>
              <p>
                {b.showtime.theater.name} · {fmt(b.showtime.startsAt)}
                <br />
                {b.seatLabels.join(", ")}
              </p>
              <span className="success">CONFIRMED</span> <em>{b.reference}</em>
            </div>
            <h2>{money(b.total)}</h2>
          </article>
        ))}
        {!data.length && <p>No bookings yet.</p>}
      </div>
    </main>
  );
}
function Admin({ user, movies, showtimes, refresh }) {
  const [tab, setTab] = useState("Overview"),
    [theaters, setTheaters] = useState([]),
    [stats, setStats] = useState(null),
    [form, setForm] = useState(null);
  useEffect(() => {
    Promise.all([
      call("/theaters"),
      call("/admin/stats", { token: user.token }),
    ]).then(([t, s]) => {
      setTheaters(t);
      setStats(s);
    });
  }, [tab]);
  const submit = async (e) => {
    e.preventDefault();
    const kind = form.kind,
      body = { ...form };
    delete body.kind;
    try {
      let made = await call("/" + kind, {
        token: user.token,
        method: "POST",
        body: JSON.stringify(body),
      });
      if (kind === "theaters")
        await call(`/theaters/${made._id}/seats`, {
          token: user.token,
          method: "POST",
        });
      setForm(null);
      refresh();
    } catch (e) {
      alert(e.message);
    }
  };
  const del = async (kind, id) => {
    if (confirm("Remove this item?")) {
      await call(`/${kind}/${id}`, { token: user.token, method: "DELETE" });
      refresh();
    }
  };
  return (
    <main className="admin">
      <h1>Admin Dashboard</h1>
      <div className="metrics">
        {[
          ["Films", stats?.movies],
          ["Theaters", stats?.theaters],
          ["Confirmed bookings", stats?.confirmedBookings],
          ["Revenue", money(stats?.revenue)],
        ].map(([a, b]) => (
          <div className="card">
            <p>{a}</p>
            <h2>{b ?? "—"}</h2>
          </div>
        ))}
      </div>
      <div className="tabs">
        {["Overview", "Movies", "Theaters", "Showtimes"].map((x) => (
          <button
            className={x === tab ? "active" : ""}
            onClick={() => setTab(x)}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === "Overview" && (
        <><h2 className="section-title">All Bookings</h2><Table headings={["Reference","Film","Customer","Seats","Total","Status"]}
          rows={stats?.bookings || []}
          cols={["reference", "showtime.movie.title", "user.name", "seatLabels", "total", "status"]}/></>
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
          <h2 className="section-title">Films</h2><Table headings={["Title","Genre","Duration","Rating","Actions"]}
            rows={movies}
            cols={["title", "genre", "duration", "rating"]}
            del={(x) => del("movies", x._id)}
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
          <h2 className="section-title">Theaters</h2><Table headings={["Theater","Rows","Seats / row","Description","Actions"]}
            rows={theaters}
            cols={["name", "rows", "seatsPerRow", "description"]}
            del={(x) => del("theaters", x._id)}
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
          <h2 className="section-title">Showtimes</h2><Table headings={["Film","Theater","Date & time","Price","Actions"]}
            rows={showtimes}
            cols={["movie.title", "theater.name", "startsAt", "price"]}
            del={(x) => del("showtimes", x._id)}
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
const get = (o, k) => k.split(".").reduce((x, a) => x?.[a], o);
function Table({ rows, cols, del, headings = [] }) {
  return (
    <div className="table">
      {headings.length > 0 && <div className="table-head">{headings.map(h=><span>{h}</span>)}</div>}
      {rows.map((r) => (
        <div>
          {cols.map((c) => (
            <span>
              {Array.isArray(get(r, c))
                ? get(r, c).join(", ")
                : c === "startsAt"
                  ? fmt(get(r, c))
                  : get(r, c)}
            </span>
          ))}
          {del && (
            <button className="link" onClick={() => del(r)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
function Modal({ form, setForm, movies, theaters, submit }) {
  const fields =
    form.kind === "movies"
      ? [
          ["title"],
          ["genre"],
          ["duration", "number"],
          ["rating"],
          ["year", "number"],
          ["director"],
          ["description"],
        ]
      : form.kind === "theaters"
        ? [
            ["name"],
            ["rows", "number"],
            ["seatsPerRow", "number"],
            ["description"],
          ]
        : [];
  return (
    <div className="modal">
      <form className="card" onSubmit={submit}>
        <button type="button" className="close" onClick={() => setForm(null)}>
          ×
        </button>
        <h1>Add {form.kind.slice(0, -1)}</h1>
        {form.kind === "showtimes" ? (
          <>
            <label>
              Film
              <select
                value={form.movie}
                onChange={(e) => setForm({ ...form, movie: e.target.value })}
              >
                {movies.map((x) => (
                  <option value={x._id}>{x.title}</option>
                ))}
              </select>
            </label>
            <label>
              Theater
              <select
                value={form.theater}
                onChange={(e) => setForm({ ...form, theater: e.target.value })}
              >
                {theaters.map((x) => (
                  <option value={x._id}>{x.name}</option>
                ))}
              </select>
            </label>
            <Field
              label="Date & time"
              type="datetime-local"
              value={form.startsAt}
              onChange={(v) => setForm({ ...form, startsAt: v })}
            />
            <Field
              label="Ticket price"
              type="number"
              value={form.price}
              onChange={(v) => setForm({ ...form, price: +v })}
            />
          </>
        ) : (
          fields.map(([k, t]) => (
            <Field
              label={k}
              type={t}
              value={form[k]}
              onChange={(v) =>
                setForm({ ...form, [k]: t === "number" ? +v : v })
              }
            />
          ))
        )}
        <button className="gold wide">Create</button>
      </form>
    </div>
  );
}
function App() {
  const [session, setSession] = useState(() =>
      JSON.parse(localStorage.getItem("cv-session") || "null"),
    ),
    [page, setPage] = useState("films"),
    [movies, setMovies] = useState([]),
    [showtimes, setShowtimes] = useState([]),
    [movie, setMovie] = useState(),
    [showtime, setShowtime] = useState(),
    [order, setOrder] = useState(),
    [booking, setBooking] = useState();
  const refresh = () =>
    Promise.all([call("/movies"), call("/showtimes")]).then(([m, s]) => {
      setMovies(m);
      setShowtimes(s);
    });
  useEffect(refresh, []);
  const onDone = (d) => {
    const s = { ...d.user, token: d.token };
    setSession(s);
    localStorage.setItem("cv-session", JSON.stringify(s));
    setPage("films");
  };
  const logout = () => {
    setSession(null);
    localStorage.removeItem("cv-session");
    setPage("films");
  };
  const p = {
    films: <Films movies={movies} setPage={setPage} setMovie={setMovie} />,
    auth: <Auth onDone={onDone} setPage={setPage} />,
    detail: (
      <Detail
        movie={movie}
        showtimes={showtimes}
        setPage={setPage}
        setShowtime={setShowtime}
      />
    ),
    seats: (
      <Seats
        showtime={showtime}
        user={session}
        setPage={setPage}
        setOrder={setOrder}
      />
    ),
    summary: (
      <Summary
        showtime={showtime}
        order={order}
        user={session}
        setPage={setPage}
        setBooking={setBooking}
      />
    ),
    confirmed: <Confirmed booking={booking} setPage={setPage} />,
    bookings: <Bookings user={session} />,
    admin: (
      <Admin
        user={session}
        movies={movies}
        showtimes={showtimes}
        refresh={refresh}
      />
    ),
  };
  return (
    <>
      <style>{`.payment{text-align:left;margin:30px 0}.payment-card{height:220px;background:linear-gradient(115deg,#18213e,#174a80);border-radius:0 0 24px 24px;padding:28px 36px;color:#ded9d2;display:flex;flex-direction:column;justify-content:space-between}.payment-card>span{letter-spacing:2px;color:#a3a0b7}.payment-card>strong{font-size:26px;letter-spacing:5px;font-family:monospace}.payment-card>div{display:flex;justify-content:space-between}.payment-card small{color:#afafbc}.payment-card small b{display:block;margin-top:8px;color:#fff;letter-spacing:1px}.payment label{display:block;text-transform:uppercase;font-size:14px;color:#9d9ac1;letter-spacing:1.5px;margin-top:22px}.payment input{display:block;width:100%;background:#10101a;border:1px solid #302f46;border-radius:12px;color:#f5f1ed;padding:16px;margin-top:9px;letter-spacing:1px}.payment-row{display:grid;grid-template-columns:1fr 1fr;gap:24px}.payment-note{color:#49e590;background:#0c211b;border:1px solid #17553c;border-radius:12px;padding:16px;margin-top:24px;font-size:16px}.section-title{font-size:27px;margin:0 0 26px}.table .table-head{background:#11111b;color:#716f9a;text-transform:uppercase;font-size:13px;letter-spacing:1.5px;font-weight:bold}.table>div{grid-template-columns:repeat(5,minmax(100px,1fr));align-items:center}@media(max-width:800px){.payment-card{padding:24px;height:190px}.payment-row{gap:12px}}`}</style>
      <Header user={session} setPage={setPage} logout={logout} />
      {p[page] || p.films}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
