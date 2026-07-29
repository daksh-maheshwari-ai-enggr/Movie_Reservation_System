import { useNavigate } from "react-router-dom";

function ContinueButton({ seats }) {
  const navigate = useNavigate();

  const selectedSeats = seats.filter(
    (seat) => seat.status === "selected"
  );

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;

    navigate("/order-summary", {
      state: {
        selectedSeats,
      },
    });
  };

  return (
    <div className="mt-10 flex justify-end">
      <button
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
        className={`rounded-md px-6 py-3 font-semibold transition-all duration-300
          ${
            selectedSeats.length === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[#D6A53A] text-black hover:bg-[#E2B74F]"
          }`}
      >
        Continue →
      </button>
    </div>
  );
}

export default ContinueButton;