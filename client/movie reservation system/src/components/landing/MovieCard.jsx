import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  console.log("Movie object:", movie);
  console.log("Movie _id:", movie._id);
    
  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="group cursor-pointer"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-2xl">

        <img
          src={movie.poster}
          alt={movie.title}
          className="h-[360px] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <span className="absolute top-3 right-3 rounded-md bg-[#2B2638]/90 px-2 py-1 text-xs font-medium text-white">
          {movie.rating}
        </span>

      </div>

      {/* Movie Details */}
      <div className="mt-4">

        <h3 className="text-[18px] font-semibold text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
          {movie.title}
        </h3>

        <p className="mt-1 text-[15px] text-[#8E8AAE]">
          {movie.genre} • {movie.duration}
        </p>

      </div>
    </div>
  );
}

export default MovieCard;