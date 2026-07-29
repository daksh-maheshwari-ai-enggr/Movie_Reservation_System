import { useState } from 'react';
import MovieDetails from './components/booking/MovieDetails';
import SeatGrid from './components/booking/SeatGrid';
import AddTheaterModal from './components/admin/AddTheaterModal';

/**
 * @component App
 * @description Root orchestrator component for the frontend application.
 * Manages simulated routing between views (Movie Details <-> Seat Grid)
 * and coordinates global state such as the selected showtime and admin modal visibility.
 */
export default function App() {
  /* ==========================================
     Global State Management
     ========================================== */
  
  // Routing State: Controls which main view is currently rendered
  const [currentView, setCurrentView] = useState('movie-details');
  
  // Context State: Stores the payload from the user's selected showtime
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  
  // UI State: Controls the visibility of the admin configuration overlay
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the transition from the Movie Details view to the Seat Selection grid.
   * 
   * @param {Object} showtimeData - Payload containing time, screen, and pricing info.
   */
  const handleShowtimeSelect = (showtimeData) => {
    setSelectedShowtime(showtimeData);
    setCurrentView('seat-grid');
  };

  /**
   * Simulates the API POST request to create a new theater.
   * Currently logs the payload to the console and alerts the user for testing.
   * 
   * @param {Object} newTheater - The compiled theater configuration payload.
   */
  const handleAddTheater = (newTheater) => {
    console.log("[Admin] New Theater Payload Received:", newTheater);
    alert(`Successfully added "${newTheater.name}" with capacity of ${newTheater.totalCapacity} seats!`);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F17]">
      
      {/* ==========================================
          1. Global UI Elements
          ========================================== */}
      {/* Floating Action Button (FAB) - Admin Controls */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2.5 rounded-full shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider"
          aria-label="Open Admin Add Theater Modal"
        >
          <span aria-hidden="true">⚙️</span> + Add Hall
        </button>
      </div>

      {/* ==========================================
          2. View Rendering: Movie Details
          ========================================== */}
      {currentView === 'movie-details' && (
        <MovieDetails onSelectShowtime={handleShowtimeSelect} />
      )}

      {/* ==========================================
          3. View Rendering: Interactive Seat Grid
          ========================================== */}
      {currentView === 'seat-grid' && (
        <div className="pt-6">
          
          {/* Navigation & Context Banner */}
          <div className="max-w-4xl mx-auto px-6 mb-2 flex items-center justify-between">
            
            {/* Back Button */}
            <button
              onClick={() => setCurrentView('movie-details')}
              className="bg-[#111622] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Return to Movie Details"
            >
              <span aria-hidden="true">←</span> Back to Showtimes
            </button>

            {/* Active Context Readout */}
            {selectedShowtime && (
              <div className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg font-medium">
                🎬 Selected: <span className="font-bold">{selectedShowtime.time}</span> ({selectedShowtime.screen}) • ${selectedShowtime.price}/seat
              </div>
            )}
          </div>

          {/* Core Grid Component */}
          <SeatGrid />
        </div>
      )}

      {/* ==========================================
          4. Modals & Overlays
          ========================================== */}
      <AddTheaterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTheater={handleAddTheater}
      />

    </div>
  );
}