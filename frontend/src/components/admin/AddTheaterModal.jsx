import { useState } from 'react';

/**
 * @component AddTheaterModal
 * @description A modal form interface used by admins to create a new theater/screen.
 * Captures structural details and dynamically calculates seating capacity.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal in the DOM.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onAddTheater - Callback triggered on form submission with the compiled theater payload.
 */
export default function AddTheaterModal({ isOpen, onClose, onAddTheater }) {
  // Local form state management
  const [name, setName] = useState('');
  const [rows, setRows] = useState(8);
  const [seatsPerRow, setSeatsPerRow] = useState(12);
  const [description, setDescription] = useState('');

  // Early return: Prevent rendering if modal state is inactive
  if (!isOpen) return null;

  // Derived State: Automatically calculates total seats based on grid dimensions
  const totalCapacity = rows * seatsPerRow;

  /**
   * Handles form submission, prevents default refresh, constructs the payload, 
   * and lifts the state back up to the parent component.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Construct the payload matching the expected data structure
    const newTheater = {
      name,
      rows: Number(rows),
      seatsPerRow: Number(seatsPerRow),
      totalCapacity,
      description,
    };
    
    onAddTheater(newTheater);
    onClose(); 
  };

  return (
    /* Modal Backdrop Overlay */
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      
      /* Main Modal Container */
      <div className="bg-[#111622] border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-slate-100 animate-fadeIn">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-4">
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>🎬</span> Add New Theater Hall
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-lg font-bold px-2 py-1 rounded hover:bg-slate-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Data Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field: Theater Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Theater Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grand Hall, Screen 4 — IMAX"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Fields: Grid Dimensions (Rows & Columns) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Number of Rows
              </label>
              <input
                type="number"
                min="1"
                max="26"
                required
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Seats Per Row
              </label>
              <input
                type="number"
                min="1"
                required
                value={seatsPerRow}
                onChange={(e) => setSeatsPerRow(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* UI Element: Dynamic Total Capacity Readout */}
          <div className="bg-[#0B0F17]/80 border border-amber-500/20 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400">
              Calculated Total Capacity: <span className="text-amber-400 font-bold text-sm ml-1">{totalCapacity} seats</span>
            </p>
          </div>

          {/* Field: Description / Amenities */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Description & Features
            </label>
            <textarea
              rows="3"
              placeholder="e.g. Dolby Atmos audio, 4K Laser projection, Recliner seating available..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          {/* Action Controls */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
            >
              + Add Theater
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}