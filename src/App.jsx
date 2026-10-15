import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./constants/roles";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VetDashboard from "./pages/vet/VetDashboard";
import DuenoDashboard from "./pages/dueno/DuenoDashboard";

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Por rol */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vet/*"
        element={
          <ProtectedRoute roles={[ROLES.VET]}>
            <VetDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dueno/*"
        element={
          <ProtectedRoute roles={[ROLES.DUENO]}>
            <DuenoDashboard />
          </ProtectedRoute>
        }
      />

      {/* Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}