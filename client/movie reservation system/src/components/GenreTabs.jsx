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

const GenreTabs = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <section className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-4 px-8">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setActiveGenre(genre)}
          className={`rounded-full border px-6 py-3 text-lg font-medium transition ${
            activeGenre === genre
              ? "border-[#D4A02A] bg-[#D4A02A] text-black"
              : "border-[#2B2940] bg-[#171621] text-[#A39DBF] hover:border-[#D4A02A]"
          }`}
        >
          {genre}
        </button>
      ))}
    </section>
  );
};

export default GenreTabs;