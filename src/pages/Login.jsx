import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLE_HOME } from "../constants/roles";
import MainLayout from "../components/templates/MainLayout";
import LoginForm from "../components/organisms/LoginForm";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (email, password) => {
    setError("");
    setLoading(true);
    // Simula la espera de una respuesta del servidor
    setTimeout(() => {
      const session = login(email, password);
      setLoading(false);
      if (!session) return setError("Credenciales inválidas");
      navigate(ROLE_HOME[session.role]);
    }, 800);
  };

  return (
    <MainLayout>
      <h1>Iniciar sesión</h1>
      <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
    </MainLayout>
  );
}