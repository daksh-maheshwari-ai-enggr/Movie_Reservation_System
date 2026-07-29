function MovieInfo() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-wide text-white">
        Neon Frontier
      </h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
        <span>Grand Hall</span>

        <span className="text-[#D4AF37]">•</span>

        <span>Sat Jul 25</span>

        <span className="text-[#D4AF37]">•</span>

        <span>11:00 AM</span>

        <span className="text-[#D4AF37]">•</span>

        <span className="text-[#D4AF37] font-semibold">$14</span>
      </div>
    </div>
  );
}

export default MovieInfo;