import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import MovieGrid from "../components/MovieGrid";
import AuthModal from "../auth/components/AuthModal";

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#08080F]">
      <Navbar onSignIn={() => setShowAuthModal(true)} />

      <Hero />

      <SearchSection />

      <MovieGrid />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Home;