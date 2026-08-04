import { useState, useEffect } from 'react';

/**
 * @component SeatGrid
 * @description Renders an interactive 2D theater seat map color-coded by category.
 */
export default function SeatGrid({ layout }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrices, setSeatPrices] = useState({});

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/seat-categories');
        const data = await response.json();
        
        const priceMapping = {};
        if (Array.isArray(data)) {
          data.forEach(cat => {
            priceMapping[cat.name] = cat.price;
          });
        }
        setSeatPrices(priceMapping);
      } catch (error) {
        console.error('Error fetching seat prices:', error);
      }
    };

    loadPrices();
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);

    if (isAlreadySelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const seatPrice = seatPrices[seat.category] || 0;
    return total + seatPrice;
  }, 0);

  // Helper function to return visual styles based on Seat Category
  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Recliner':
        return 'bg-purple-950/60 hover:bg-purple-900 border-purple-500/50 text-purple-200';
      case 'Platinum':
        return 'bg-cyan-950/60 hover:bg-cyan-900 border-cyan-500/50 text-cyan-200';
      case 'Gold':
        return 'bg-amber-950/60 hover:bg-amber-900 border-amber-500/50 text-amber-200';
      case 'Silver':
      default:
        return 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300';
    }
  };

  if (!layout || !layout.rows) {
    return <div className="text-white text-center mt-20">Loading layout...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-slate-100">Neon Frontier</h1>
        <p className="text-sm text-slate-400 mt-1">
          {layout.theaterName} • <span className="text-amber-400 font-semibold">Dynamic Category Pricing</span>
        </p>
      </div>

      {/* Category Price Legend Bar */}
      <div className="flex flex-wrap justify-center gap-4 text-xs mb-8 bg-[#111622] px-6 py-3 rounded-xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-600"></div>
          <span className="text-slate-300 font-medium">Silver (${(seatPrices['Silver'] || 0).toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-amber-950 border border-amber-500"></div>
          <span className="text-amber-300 font-medium">Gold (${(seatPrices['Gold'] || 0).toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-cyan-950 border border-cyan-500"></div>
          <span className="text-cyan-300 font-medium">Platinum (${(seatPrices['Platinum'] || 0).toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-purple-950 border border-purple-500"></div>
          <span className="text-purple-300 font-medium">Recliner (${(seatPrices['Recliner'] || 0).toFixed(2)})</span>
        </div>
      </div>

      {/* Screen Graphic */}
      <div className="w-full max-w-2xl mb-10 flex flex-col items-center">
        <div className="w-3/4 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-70 shadow-[0_8px_25px_rgba(245,158,11,0.6)]"></div>
        <span className="text-xs tracking-widest text-slate-500 uppercase mt-3 font-semibold">Screen This Way</span>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col gap-3 mb-10" role="grid">
        {layout.rows.map((row) => (
          <div key={row.rowLabel} className="flex items-center gap-4" role="row">
            
            <span className="w-4 text-center text-xs font-bold text-slate-500">
              {row.rowLabel}
            </span>

            <div className="flex gap-2">
              {row.seats.map((seat) => {
                const isSelected = selectedSeats.some((s) => s.id === seat.id);
                const isBooked = seat.status === 'booked';
                const currentSeatPrice = seatPrices[seat.category] || 0;

                let seatStyles = `border ${getCategoryStyles(seat.category)} cursor-pointer`;

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
                    title={`${seat.id} [${seat.category}] - $${currentSeatPrice.toFixed(2)}`}
                    className={`w-8 h-8 rounded-md text-xs transition-all duration-150 flex items-center justify-center font-semibold ${seatStyles}`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>

            <span className="w-4 text-center text-xs font-bold text-slate-500">
              {row.rowLabel}
            </span>
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="flex gap-6 text-xs text-slate-400 mb-10 bg-[#111622] px-6 py-2.5 rounded-full border border-slate-800">
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

      {/* Summary Footer */}
      <div className="w-full max-w-2xl bg-[#111622] border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-sm font-semibold text-amber-400">
            {selectedSeats.length > 0
              ? `${selectedSeats.length} seats selected: ${selectedSeats.map((s) => `${s.id} (${s.category})`).join(', ')}`
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