import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import FilmsPage from "./pages/FilmsPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import SeatsPage from "./pages/SeatsPage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import ConfirmedPage from "./pages/ConfirmedPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { call } from "./utils/api.js";

export default function App() {
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

  const pages = {
    films: <FilmsPage movies={movies} setPage={setPage} setMovie={setMovie} />,
    auth: <AuthPage onDone={onDone} setPage={setPage} />,
    detail: (
      <DetailPage
        movie={movie}
        showtimes={showtimes}
        setPage={setPage}
        setShowtime={setShowtime}
      />
    ),
    seats: (
      <SeatsPage
        showtime={showtime}
        user={session}
        setPage={setPage}
        setOrder={setOrder}
      />
    ),
    summary: (
      <SummaryPage
        showtime={showtime}
        order={order}
        user={session}
        setPage={setPage}
        setBooking={setBooking}
      />
    ),
    confirmed: <ConfirmedPage booking={booking} setPage={setPage} />,
    bookings: <BookingsPage user={session} />,
    admin: (
      <AdminPage
        user={session}
        movies={movies}
        showtimes={showtimes}
        refresh={refresh}
      />
    ),
  };

  return (
    <>
      <Header user={session} setPage={setPage} logout={logout} />
      {pages[page] || pages.films}
    </>
  );
}
