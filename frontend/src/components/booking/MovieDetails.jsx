/**
 * @component MovieDetails
 * @description Displays comprehensive movie metadata (synopsis, cast, poster)
 * and provides a structured interface for users to select a showtime.
 * 
 * @param {Object} props
 * @param {Function} props.onSelectShowtime - Callback triggered when a showtime is clicked.
 *        Passes a selection payload object: { time: string, screen: string, price: number, date: string }
 */
export default function MovieDetails({ onSelectShowtime }) {
  // Static asset placeholder (Matches the Figma design specifications)
  const posterUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans pb-16">
      
      {/* ==========================================
          1. Global Navigation Header
          ========================================== */}
      <header className="border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Brand Logo */}
          <span className="text-2xl font-serif font-extrabold tracking-wider text-amber-500 cursor-pointer">
            CINÉ<span className="text-white">VAULT</span>
          </span>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#" className="text-white border-b-2 border-amber-500 pb-1">Films</a>
            <a href="#" className="hover:text-white transition-colors">My Bookings</a>
            <a href="#" className="hover:text-white transition-colors">Admin</a>
          </nav>
        </div>

        {/* User Profile / Admin Controls */}
        <div className="flex items-center gap-4 text-xs">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-slate-200">Alex</p>
            <p className="text-slate-400">Administrator</p>
          </div>
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            Admin
          </span>
          <button className="text-slate-400 hover:text-white font-medium ml-2 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      {/* ==========================================
          2. Main Content Layout
          ========================================== */}
      <main className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Navigation Breadcrumb */}
        <button className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 mb-8">
          <span>←</span> All Films
        </button>

        {/* 2-Column Grid: Visuals (Left) & Metadata (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Movie Poster (Span 5/12) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-[3/4] bg-slate-900">
              <img 
                src={posterUrl} 
                alt="Movie poster for Neon Frontier" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Movie Information & Showtimes (Span 7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* --- Metadata Headers --- */}
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
              2087 · SCI-FI · 142 MIN
            </p>
            <h1 className="text-5xl font-serif font-bold text-white tracking-tight mb-4">
              Neon Frontier
            </h1>
            
            <div className="mb-6">
              <span className="bg-[#161D2C] border border-slate-700/60 text-slate-300 text-xs font-semibold px-3 py-1 rounded-md tracking-wide">
                PG-13
              </span>
            </div>

            {/* --- Narrative & Crew --- */}
            <p className="text-slate-300 text-base leading-relaxed mb-8 font-normal max-w-xl">
              In 2087, a rogue cartographer discovers a signal from beyond the known star maps — drawing her into a conspiracy that spans three civilizations and rewrites everything humanity believed about first contact.
            </p>

            <div className="grid grid-cols-2 gap-6 border-y border-slate-800/80 py-6 mb-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Director
                </h3>
                <p className="text-sm font-medium text-slate-200">Yuki Tanaka</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Cast
                </h3>
                <p className="text-sm font-medium text-slate-200 leading-snug">
                  Elena Vasquez, James Okafor, Petra Novak
                </p>
              </div>
            </div>

            {/* ==========================================
                3. Showtime Selection Interface
                ========================================== */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
                Available Showtimes
              </h2>

              {/* Day Group: Sunday */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Sunday, July 26
                </h3>
                <div className="flex flex-wrap gap-3.5">
                  
                  {/* Action: Lifts selection payload to parent component */}
                  <button 
                    onClick={() => onSelectShowtime({ time: "2:30 PM", screen: "Grand Hall", price: 16.00, date: "Sun, Jul 26" })}
                    className="bg-[#111622] hover:bg-[#1A2234] border border-slate-800 hover:border-amber-500/50 rounded-xl px-5 py-3 text-left transition-all group cursor-pointer shadow-md active:scale-95"
                  >
                    <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">2:30 PM</p>
                    <p className="text-xs text-slate-400 mt-0.5">Grand Hall · <span className="text-slate-300 font-medium">$16</span></p>
                  </button>

                  <button 
                    onClick={() => onSelectShowtime({ time: "7:00 PM", screen: "Premiere Suite", price: 18.00, date: "Sun, Jul 26" })}
                    className="bg-[#111622] hover:bg-[#1A2234] border border-slate-800 hover:border-amber-500/50 rounded-xl px-5 py-3 text-left transition-all group cursor-pointer shadow-md active:scale-95"
                  >
                    <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">7:00 PM</p>
                    <p className="text-xs text-slate-400 mt-0.5">Premiere Suite · <span className="text-slate-300 font-medium">$18</span></p>
                  </button>

                </div>
              </div>

              {/* Day Group: Monday */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Monday, July 27
                </h3>
                <div className="flex flex-wrap gap-3.5">
                  
                  <button 
                    onClick={() => onSelectShowtime({ time: "11:00 AM", screen: "Grand Hall", price: 14.00, date: "Mon, Jul 27" })}
                    className="bg-[#111622] hover:bg-[#1A2234] border border-slate-800 hover:border-amber-500/50 rounded-xl px-5 py-3 text-left transition-all group cursor-pointer shadow-md active:scale-95"
                  >
                    <p className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">11:00 AM</p>
                    <p className="text-xs text-slate-400 mt-0.5">Grand Hall · <span className="text-slate-300 font-medium">$14</span></p>
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}