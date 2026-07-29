function OrderCard({ movie, selectedSeats = [], totalPrice = 0 }) {
  const convenienceFee = 5;
  const finalTotal = totalPrice + convenienceFee;

  return (
    <div className="mt-6 rounded-2xl border border-[#2A2735] bg-[#16131F] p-6 shadow-lg">
      <div className="flex gap-6">
        {/* Movie Poster */}
        <div className="h-56 w-40 overflow-hidden rounded-xl bg-[#2A2735]">
          <img
            src={movie?.poster}
            alt={movie?.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold">
            {movie?.title}
          </h2>

          <p className="mt-2 text-gray-400">
            {movie?.theatre}
          </p>

          <p className="mt-1 text-gray-400">
            {movie?.date} • {movie?.time}
          </p>

          <div className="my-6 border-t border-[#2A2735]"></div>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-400">
                Seats
              </span>

              <span>
                {selectedSeats
                  .map((seat) => `${seat.row}${seat.number}`)
                  .join(", ")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Tickets
              </span>

              <span>
                {selectedSeats.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Ticket Price
              </span>

              <span>
                ${totalPrice}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Convenience Fee
              </span>

              <span>
                ${convenienceFee}
              </span>
            </div>

          </div>

          <div className="my-6 border-t border-[#2A2735]"></div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">
              Total
            </span>

            <span className="text-3xl font-bold text-[#D4A62A]">
              ${finalTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;