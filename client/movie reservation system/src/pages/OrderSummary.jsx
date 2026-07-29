import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HoldTimer from "../components/HoldTimer";
import OrderCard from "../components/OrderCard";
import PaymentButton from "../components/PaymentButton";

function OrderSummary() {
  const location = useLocation();

  const {
    movie,
    selectedSeats,
    totalPrice,
  } = location.state || {};

  return (
    <div className="min-h-screen bg-[#0B0913] text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-12 py-10">
        <h1 className="text-5xl font-serif font-bold text-center">
          Order Summary
        </h1>

        <HoldTimer />

        <OrderCard
          movie={movie}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
        />

        <PaymentButton />
      </main>
    </div>
  );
}

export default OrderSummary;