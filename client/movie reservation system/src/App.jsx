import { Routes, Route } from "react-router-dom";
import { AdminPanel } from "./features/admin/pages/AdminPanel";

function App() {
  return (
    <Routes>

      {/* Your Admin Module */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* Teammate's User Module */}

    </Routes>
  );
}

export default App;
