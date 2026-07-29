import Seat from "./Seat";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

function SeatGrid({ seats, setSeats }) {
  const handleSeatClick = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id !== id) return seat;

        if (seat.status === "reserved" || seat.status === "blocked") {
          return seat;
        }

        return {
          ...seat,
          status:
            seat.status === "selected"
              ? "available"
              : "selected",
        };
      })
    );
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-5 text-center text-[#7F7A99]">
              {row}
            </span>

            <div className="flex items-center">
              {seats
              .filter((seat) => seat.row === row)
              .map((seat, index) => (
                <div
                  key={seat.id}
                  className={index === 7 ? "ml-8" : "ml-2"}
                >
                  <Seat
                    seat={seat}
                    status={seat.status}
                    onClick={() => handleSeatClick(seat.id)}
                  />
                </div>
          ))}
      </div>

            <span className="w-5 text-center text-[#7F7A99]">
              {row}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatGrid;