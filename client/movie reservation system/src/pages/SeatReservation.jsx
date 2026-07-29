import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieInfo from "../components/MovieInfo";
import Screen from "../components/Screen";
import SeatGrid from "../components/SeatGrid";
import SeatLegend from "../components/SeatLegend";
import Footer from "../components/Footer";
import seatData from "../data/seats";

function SeatReservation() {
  const { state } = useLocation();

  // Movie object received from the previous page
  const movie = state?.movie;

  // If no movie is passed, redirect to the movies page
  if (!movie) {
    return <Navigate to="/" replace />;
  }

  const [seats, setSeats] = useState(seatData);

  return (
    <div className="min-h-screen bg-[#0B0913] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-12 py-8">
        {/* Movie Details */}
        <MovieInfo movie={movie} />

        {/* Screen */}
        <Screen />

        {/* Seat Layout */}
        <SeatGrid
          seats={seats}
          setSeats={setSeats}
        />

        {/* Legend */}
        <SeatLegend />

        {/* Footer */}
        <Footer
          seats={seats}
          movie={movie}
        />
      </main>
    </div>
  );
}

export default SeatReservation;