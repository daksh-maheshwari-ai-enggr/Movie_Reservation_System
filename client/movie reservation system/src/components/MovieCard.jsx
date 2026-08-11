const MovieCard = ({ movie }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl border border-[#242230] bg-[#15141D] transition duration-300 group-hover:scale-[1.01] group-hover:border-[#D4A02A]">

        {/* Poster */}
        <img
          src={movie.image}
          alt={movie.title}
          className="h-[310px] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {/* Rating Badge */}
        <span className="absolute right-3 top-3 rounded-md bg-[#111018]/90 px-2.5 py-1 text-[11px] font-semibold text-white">
          {movie.rating}
        </span>

      </div>

      {/* Movie Details */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-white">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-[#9D98B8]">
          {movie.genre} • {movie.duration}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;