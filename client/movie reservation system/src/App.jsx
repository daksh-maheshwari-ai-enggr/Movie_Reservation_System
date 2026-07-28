import { Routes, Route } from "react-router-dom";
import { AdminPanel } from "./features/admin/pages/AdminPanel";
import { userRoutes } from './features/user/routes'


function App() {
  return (
    <Routes>

      {/* Your Admin Module */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* Teammate's User Module */}
      {userRoutes}
    </Routes>
  );
}

export default App;
