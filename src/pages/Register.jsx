import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLE_HOME } from "../constants/roles";
import MainLayout from "../components/templates/MainLayout";
import RegisterForm from "../components/organisms/RegisterForm";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (data) => {
    setError("");
    setLoading(true);
    // Simula la espera de una respuesta del servidor
    setTimeout(() => {
      const result = register(data);
      setLoading(false);
      if (!result.ok) return setError(result.error);
      navigate(ROLE_HOME[result.user.role]);
    }, 800);
  };

  return (
    <MainLayout>
      <h1>Crear cuenta</h1>
      <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />
    </MainLayout>
  );
}