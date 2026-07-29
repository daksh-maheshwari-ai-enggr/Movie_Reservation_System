import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../services/movieService";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className="mt-10 text-center text-white">
        Loading Movies...
      </h2>
    );
  }

  return (
    <section className="mt-10">
      <div className="grid grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieGrid;