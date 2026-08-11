import MovieCard from "./MovieCard";

const movies = [
  {
    id: 1,
    title: "Neon Frontier",
    genre: "Action",
    duration: "122m",
    rating: "PG-13",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Venetian Heist",
    genre: "Thriller",
    duration: "118m",
    rating: "R",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Ember & Ash",
    genre: "Drama",
    duration: "126m",
    rating: "PG-13",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Razorback",
    genre: "Action",
    duration: "108m",
    rating: "R",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Laughing Fox",
    genre: "Comedy",
    duration: "95m",
    rating: "PG",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Whispers in the Deep",
    genre: "Horror",
    duration: "112m",
    rating: "R",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop",
  },
];

const MovieGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-7 py-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;