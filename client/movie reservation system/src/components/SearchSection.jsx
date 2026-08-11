import { useState } from "react";

const genres = [
  "All",
  "Sci-Fi",
  "Thriller",
  "Drama",
  "Action",
  "Comedy",
  "Horror",
];

const SearchSection = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <section className="mx-auto flex max-w-7xl items-center gap-5 px-7 py-8">

      {/* Search */}
      <div className="relative w-[390px] flex-shrink-0">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8E8A9F]">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by title or director..."
          className="h-14 w-full rounded-xl border border-[#2B2940] bg-[#171621] pl-12 pr-4 text-white placeholder:text-[#8E8A9F] outline-none"
        />
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`rounded-full px-6 py-3 text-lg transition ${
              activeGenre === genre
                ? "bg-[#D4A02A] text-black"
                : "bg-[#1B1926] text-[#B6B2D4]"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

    </section>
  );
};

export default SearchSection;