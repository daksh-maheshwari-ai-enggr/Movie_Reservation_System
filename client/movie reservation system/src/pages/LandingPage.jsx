import Navbar from "../components/shared/Navbar";
import HeroSection from "../components/landing/HeroSection";
import SearchBar from "../components/landing/SearchBar";
import GenreFilter from "../components/landing/GenreFilter";
import MovieGrid from "../components/landing/MovieGrid";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090811] text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <HeroSection />

      {/* Movies Section */}
      <section className="mx-auto max-w-7xl px-8 py-10">

        {/* Search */}
        <SearchBar />

        {/* Genres */}
        <GenreFilter />

        {/* Heading */}
        <div className="mt-12 mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Popular Movies
          </h2>

          <button className="text-[#D4AF37] hover:text-yellow-400 transition">
            View All →
          </button>

        </div>

        {/* Movie Grid */}
        <MovieGrid />

      </section>

    </div>
  );
}

export default LandingPage;