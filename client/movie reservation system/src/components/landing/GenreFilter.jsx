import { useState } from "react";

const genres = [
  "All",
  "Action",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Thriller",
  "Horror",
];

function GenreFilter() {
  const [active, setActive] = useState("All");

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex flex-wrap justify-center gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActive(genre)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              active === genre
                ? "bg-[#D4AF37] text-black"
                : "bg-[#17131F] border border-[#2B2638] text-gray-300 hover:bg-[#222]"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;