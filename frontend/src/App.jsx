import { useState, useEffect } from 'react';
import MovieDetails from './components/booking/MovieDetails';
import SeatGrid from './components/booking/SeatGrid';
import AddTheaterModal from './components/admin/AddTheaterModal';
import SeatCategories from './components/admin/SeatCategories'; 

// Helper function to generate 2D seat map evenly split across ALL 4 categories!
const generateLayout = (name, numRows, seatsPerRow) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // 0 -> 'A', 1 -> 'B', etc.
    const seats = [];
    
    // Distribute rows evenly across Silver, Gold, Platinum, and Recliner
    let category;
    const rowRatio = i / numRows;

    if (rowRatio >= 0.75) {
      category = 'Recliner'; // Top 25% (back rows)
    } else if (rowRatio >= 0.50) {
      category = 'Platinum'; // 50% - 75%
    } else if (rowRatio >= 0.25) {
      category = 'Gold';     // 25% - 50%
    } else {
      category = 'Silver';   // Bottom 25% (front rows)
    }

    for (let j = 1; j <= seatsPerRow; j++) {
      seats.push({
        id: `${rowLabel}${j}`,
        seatNumber: j,
        status: 'available', 
        category: category
      });
    }
    rows.push({ rowLabel, seats });
  }
  return { theaterName: name, rows };
};

export default function App() {
  const [currentView, setCurrentView] = useState('movie-details');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Saved theaters from MongoDB
  const [theaters, setTheaters] = useState([]);

  // Active seat layout preview
  const [theaterLayout, setTheaterLayout] = useState(
    generateLayout("Neon Frontier - Grand Hall", 8, 12)
  );

  // Helper function to fetch theaters from backend
  const fetchTheaters = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/theaters');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTheaters(data);
      }
    } catch (err) {
      console.error('Error fetching theaters:', err);
    }
  };

  // Safe useEffect to satisfy ESLint rule
  useEffect(() => {
    let isMounted = true;

    const loadInitialTheaters = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/theaters');
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          setTheaters(data);
        }
      } catch (err) {
        console.error('Error fetching theaters:', err);
      }
    };

    loadInitialTheaters();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleShowtimeSelect = (showtimeData) => {
    setSelectedShowtime(showtimeData);

    // If selected showtime corresponds to a saved hall in DB, load that specific hall's grid!
    const matchedTheater = theaters.find(t => 
      t.name.toLowerCase().includes(showtimeData.screen?.toLowerCase()) || 
      showtimeData.screen?.toLowerCase().includes(t.name.toLowerCase())
    );

    if (matchedTheater) {
      setTheaterLayout(generateLayout(matchedTheater.name, matchedTheater.rows, matchedTheater.seatsPerRow));
    } else {
      // Default fallback grid if no screen name match
      setTheaterLayout(generateLayout(`Hall (${showtimeData.screen})`, 8, 12));
    }

    setCurrentView('seat-grid');
  };

  const handleAddTheater = (newTheater) => {
    const newMap = generateLayout(newTheater.name, newTheater.rows, newTheater.seatsPerRow);
    setTheaterLayout(newMap); 
    fetchTheaters(); // Refresh list from backend
    alert(`Successfully generated layout for "${newTheater.name}" with ${newTheater.totalCapacity} seats!`);
  };

  const handleDeleteTheater = async (id) => {
    if (!window.confirm("Are you sure you want to delete this theater hall?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/theaters/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchTheaters();
      } else {
        alert("Failed to delete theater.");
      }
    } catch (err) {
      console.error("Error deleting theater:", err);
    }
  };

  const handlePreviewTheater = (theater) => {
    const newMap = generateLayout(theater.name, theater.rows, theater.seatsPerRow);
    setTheaterLayout(newMap);
    setCurrentView('seat-grid');
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F17]">
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => setCurrentView('manage-halls')}
          className="bg-sky-500 hover:bg-sky-400 text-black font-extrabold px-4 py-2.5 rounded-full shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <span aria-hidden="true">🏛️</span> Manage Halls ({theaters.length})
        </button>

        <button
          onClick={() => setCurrentView('seat-categories')}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <span aria-hidden="true">💰</span> Manage Pricing
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2.5 rounded-full shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <span aria-hidden="true">⚙️</span> + Add Hall
        </button>
      </div>

      {/* Views */}
      {currentView === 'movie-details' && (
        <MovieDetails onSelectShowtime={handleShowtimeSelect} />
      )}

      {currentView === 'seat-grid' && (
        <div className="pt-6">
          <div className="max-w-4xl mx-auto px-6 mb-2 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('movie-details')}
              className="bg-[#111622] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">←</span> Back to Showtimes
            </button>

            {selectedShowtime && (
              <div className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg font-medium">
                🎬 Selected: <span className="font-bold">{selectedShowtime.time}</span> ({selectedShowtime.screen})
              </div>
            )}
          </div>
          <SeatGrid layout={theaterLayout} />
        </div>
      )}

      {currentView === 'seat-categories' && (
        <div className="pt-6 pb-20">
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <button
              onClick={() => setCurrentView('movie-details')}
              className="bg-[#111622] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">←</span> Back to App
            </button>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white text-black rounded-xl p-6 shadow-xl">
              <SeatCategories />
            </div>
          </div>
        </div>
      )}

      {/* Manage Halls List View */}
      {currentView === 'manage-halls' && (
        <div className="pt-6 pb-20">
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <button
              onClick={() => setCurrentView('movie-details')}
              className="bg-[#111622] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span aria-hidden="true">←</span> Back to App
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[#111622] border border-slate-800 text-white rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6">
                Saved Theater Halls
              </h2>

              {theaters.length === 0 ? (
                <p className="text-slate-400 text-sm">No theater halls found in database. Click "+ Add Hall" to create one.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {theaters.map((t) => (
                    <div key={t._id} className="bg-[#0B0F17] border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-amber-400 text-lg">{t.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Dimensions: {t.rows} Rows × {t.seatsPerRow} Seats
                        </p>
                        <p className="text-xs text-slate-400">
                          Total Capacity: <span className="text-white font-semibold">{t.totalCapacity} seats</span>
                        </p>
                        {t.description && (
                          <p className="text-xs text-slate-500 mt-2 italic">{t.description}</p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-800/80">
                        <button
                          onClick={() => handlePreviewTheater(t)}
                          className="flex-1 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-bold py-1.5 rounded transition-all cursor-pointer"
                        >
                          Preview Layout
                        </button>
                        <button
                          onClick={() => handleDeleteTheater(t._id)}
                          className="bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-bold px-3 py-1.5 rounded transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AddTheaterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTheater={handleAddTheater}
      />
    </div>
  );
}