import { useState } from "react";
import { call } from "../utils/api.js";

export default function FilmsPage({ movies, setPage, setMovie }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");

  const genres = [
    "All",
    "Sci-Fi",
    "Thriller",
    "Drama",
    "Action",
    "Comedy",
    "Horror",
  ];

  const filteredMovies = movies.filter(
    (movie) =>
      (!genre || movie.genre === genre) &&
      `${movie.title} ${movie.director}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main>
      <section className="hero">
        <p>NOW SHOWING</p>
        <h1>This Week’s Films</h1>
      </section>
      <div className="filters">
        <input
          placeholder="Search by title or director..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {genres.map((option) => (
          <button
            key={option}
            className={(option === "All" ? !genre : genre === option) ? "gold" : ""}
            onClick={() => setGenre(option === "All" ? "" : option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="moviegrid">
        {filteredMovies.map((movie) => (
          <article
            key={movie._id}
            className="movie"
            onClick={() => {
              setMovie(movie);
              setPage("detail");
            }}
          >
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>
              {movie.genre} · {movie.duration}m
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
