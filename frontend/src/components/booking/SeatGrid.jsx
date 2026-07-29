import { useState } from 'react';
import { mockTheaterLayout } from '../../data/mockSeatData';

/**
 * @component SeatGrid
 * @description Renders an interactive 2D theater seat map.
 * Handles user seat selection, dynamic pricing calculation, and visual status indicators (Available, Selected, Booked).
 */
export default function SeatGrid() {
  // Local state to track the array of seats currently selected by the user
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Data source (Would eventually be replaced by props or an API fetch)
  const layout = mockTheaterLayout;

  /**
   * Toggles the selection state of a specific seat.
   * Prevents interaction with already booked seats.
   * 
   * @param {Object} seat - The seat object clicked by the user.
   */
  const handleSeatClick = (seat) => {
    // Guard Clause: Prevent interaction with booked seats
    if (seat.status === 'booked') return;

    // Check if the seat exists in the current selection
    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);

    if (isAlreadySelected) {
      // Remove seat from selection
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      // Append seat to selection
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Derived State: Calculates total cost based on the number of selected seats
  const totalPrice = selectedSeats.length * layout.ticketPrice;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6 flex flex-col items-center">
      
      {/* ==========================================
          1. Header Information
          ========================================== */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-100">Neon Frontier</h1>
        <p className="text-sm text-slate-400 mt-1">
          {layout.theaterName} • Thu, Jul 23 • 2:30 PM •{' '}
          <span className="text-amber-400 font-semibold">${layout.ticketPrice.toFixed(2)} / seat</span>
        </p>
      </div>

      {/* ==========================================
          2. Screen Directional Graphic
          ========================================== */}
      <div className="w-full max-w-2xl mb-12 flex flex-col items-center">
        <div className="w-3/4 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-70 shadow-[0_8px_25px_rgba(245,158,11,0.6)]"></div>
        <span className="text-xs tracking-widest text-slate-500 uppercase mt-3 font-semibold">Screen</span>
      </div>

      {/* ==========================================
          3. Interactive Seat Map (2D Grid)
          ========================================== */}
      <div className="flex flex-col gap-3 mb-12" role="grid" aria-label="Seat Selection Grid">
        {layout.rows.map((row) => (
          <div key={row.rowLabel} className="flex items-center gap-4" role="row">
            
            {/* Left Row Identifier */}
            <span className="w-4 text-center text-xs font-bold text-slate-500" aria-hidden="true">
              {row.rowLabel}
            </span>

            {/* Row Seats */}
            <div className="flex gap-2">
              {row.seats.map((seat) => {
                const isSelected = selectedSeats.some((s) => s.id === seat.id);
                const isBooked = seat.status === 'booked';

                // Base styling for an available seat
                let seatStyles = 'bg-slate-800 hover:bg-slate-700 text-slate-400 cursor-pointer border border-slate-700/50';

                // Apply conditional styling based on seat status
                if (isBooked) {
                  seatStyles = 'bg-slate-900/60 text-slate-700 cursor-not-allowed border-transparent';
                } else if (isSelected) {
                  seatStyles = 'bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/30 scale-105 border-amber-400';
                }

                return (
                  <button
                    key={seat.id}
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                    title={`${seat.id} (${seat.category}) - $${layout.ticketPrice}`}
                    aria-label={`Seat ${seat.id}, ${isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'}`}
                    aria-pressed={isSelected}
                    className={`w-8 h-8 rounded-md text-xs transition-all duration-150 flex items-center justify-center ${seatStyles}`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>

            {/* Right Row Identifier */}
            <span className="w-4 text-center text-xs font-bold text-slate-500" aria-hidden="true">
              {row.rowLabel}
            </span>
          </div>
        ))}
      </div>

      {/* ==========================================
          4. Status Legend
          ========================================== */}
      <div className="flex gap-6 text-xs text-slate-400 mb-12 bg-[#111622] px-6 py-3 rounded-full border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-amber-500"></div>
          <span className="text-slate-200 font-medium">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-slate-900/60 border border-slate-800"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* ==========================================
          5. Floating Checkout Action Bar
          ========================================== */}
      <div className="w-full max-w-2xl bg-[#111622] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            {selectedSeats.length > 0
              ? `${selectedSeats.length} seats selected: ${selectedSeats.map((s) => s.id).join(', ')}`
              : 'No seats selected yet'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Total Amount: <span className="text-white font-bold text-sm">${totalPrice.toFixed(2)}</span>
          </p>
        </div>

        <button
          disabled={selectedSeats.length === 0}
          className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
            selectedSeats.length > 0
              ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95'
              : 'bg-slate-800/80 text-slate-500 cursor-not-allowed'
          }`}
        >
          Continue to Payment →
        </button>
      </div>

    </div>
  );
}