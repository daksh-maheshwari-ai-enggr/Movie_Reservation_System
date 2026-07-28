import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import LoginSuccess from "./auth/pages/LoginSuccess";
import ProtectedRoute from "./auth/routes/ProtectedRoute";
import { AdminPanel } from "./features/admin/pages/AdminPanel";
import { userRoutes } from "./features/user/routes";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login-success" element={<LoginSuccess />} />

      {/* Protected Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* User Module */}
      {userRoutes}
    </Routes>
  );
}

export default App;