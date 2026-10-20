import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  // Sin sesión: al login
  if (!user) return <Navigate to="/login" replace />;

  // Con sesión pero sin el rol permitido: al inicio
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}