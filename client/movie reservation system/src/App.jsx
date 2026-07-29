import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MovieDetails from "./pages/MovieDetails";
import { AdminPanel } from "./features/admin/pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;