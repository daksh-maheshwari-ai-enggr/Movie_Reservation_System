export function AdminTabs({ activeTab, onTabChange }) {
  return (
    <nav
      className="mt-16 flex overflow-x-auto border-b border-[#232438]"
      aria-label="Admin sections"
    >
      <button
        onClick={() => onTabChange('overview')}
        className={`relative min-w-36 px-7 py-4 text-left text-lg font-medium transition ${
          activeTab === 'overview'
            ? 'text-[#d69b22]'
            : 'text-[#9593ba] hover:text-[#d8d6e8]'
        }`}
      >
        Overview
        {activeTab === 'overview' && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#d69b22]" />}
      </button>

      <button
        onClick={() => onTabChange('movies')}
        className={`relative min-w-36 px-7 py-4 text-left text-lg font-medium transition ${
          activeTab === 'movies'
            ? 'text-[#d69b22]'
            : 'text-[#9593ba] hover:text-[#d8d6e8]'
        }`}
      >
        Movies
        {activeTab === 'movies' && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#d69b22]" />}
      </button>

      <button
        onClick={() => onTabChange('theaters')}
        className={`relative min-w-36 px-7 py-4 text-left text-lg font-medium transition ${
          activeTab === 'theaters'
            ? 'text-[#d69b22]'
            : 'text-[#9593ba] hover:text-[#d8d6e8]'
        }`}
      >
        Theaters
        {activeTab === 'theaters' && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#d69b22]" />}
      </button>

      <button
        onClick={() => onTabChange('showtimes')}
        className={`relative min-w-36 px-7 py-4 text-left text-lg font-medium transition ${
          activeTab === 'showtimes'
            ? 'text-[#d69b22]'
            : 'text-[#9593ba] hover:text-[#d8d6e8]'
        }`}
      >
        Showtimes
        {activeTab === 'showtimes' && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#d69b22]" />}
      </button>
    </nav>
  )
}
