import { useNavigate } from "react-router-dom";

function Footer({ seats = [], movie }) {
  const navigate = useNavigate();

  const selectedSeats = seats.filter(
    (seat) => seat.status === "selected"
  );

  const TICKET_PRICE = 14;

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + (seat.price || TICKET_PRICE),
    0
  );

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;

    navigate("/order-summary", {
      state: {
        movie,
        selectedSeats,
        totalPrice,
      },
    });
  };

  return (
    <div className="mt-12 border-t border-[#2A2838] pt-8 flex items-center justify-between">

      {/* Left Section */}
      <div>
        {selectedSeats.length === 0 ? (
          <>
            <p className="text-[#8D89A5] text-lg">
              Click seats to select them
            </p>

            <p className="mt-2 text-sm text-[#6F6A88]">
              Ticket Price: $14 per seat
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold text-white">
              {selectedSeats.length} Seat
              {selectedSeats.length > 1 ? "s" : ""}
            </p>

            <p className="mt-2 text-[#D4A62A] text-lg">
              {selectedSeats
                .map((seat) => `${seat.row}${seat.number}`)
                .join(", ")}
            </p>

            <p className="mt-3 text-xl font-semibold">
              Total:
              <span className="ml-2 text-[#D4A62A]">
                ${totalPrice}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
        className={`px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300
          ${
            selectedSeats.length === 0
              ? "bg-[#2C2A3D] text-[#7B7796] cursor-not-allowed"
              : "bg-[#D4A62A] text-black hover:bg-yellow-400 hover:scale-105"
          }`}
      >
        Continue →
      </button>

    </div>
  );
}

export default Footer;