import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await getMovieById(id);

      if (response.success) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="mt-20 text-center text-white text-2xl">
        Loading...
      </h1>
    );
  }

  if (!movie) {
    return (
      <h1 className="mt-20 text-center text-red-500 text-2xl">
        Movie Not Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-[#090811] text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <div className="grid grid-cols-2 gap-12">

          {/* Poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-2xl"
          />

          {/* Details */}
          <div>

            <h1 className="text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="mt-5 flex gap-6 text-lg text-gray-400">
              <span>{movie.genre}</span>
              <span>{movie.duration}</span>
              <span>{movie.year}</span>
            </div>

            <div className="mt-6">
              ⭐ {movie.rating}
            </div>

            <p className="mt-8 leading-8 text-gray-300">
              {movie.description}
            </p>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">
                Director
              </h2>

              <p className="mt-2 text-gray-400">
                {movie.director}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">
                Cast
              </h2>

              <p className="mt-2 text-gray-400">
                {movie.cast}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieDetails;