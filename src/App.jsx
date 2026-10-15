import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  // 👇 Inicializa el user desde localStorage si existe
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Login
  const handleLogin = async ({ email, password }) => {
    setError('');
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      await new Promise((r) => setTimeout(r, 800));

      if (email === 'admin@test.com' && password === '123456') {
        const loggedUser = { email, name: 'Admin' };
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser)); // 👈 guarda
        navigate('/');
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const handleRegister = async ({ nombre, email, password }) => {
    setError('');
    setLoading(true);
    try {
      if (!nombre || !email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      await new Promise((r) => setTimeout(r, 800));

      const newUser = { email, name: nombre };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser)); // 👈 guarda
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setError('');
    localStorage.removeItem('user'); // 👈 borra
    navigate('/login');
  };

  return (
    <Routes>
      {/* Ruta protegida: home solo si hay usuario */}
      <Route
        path="/"
        element={
          user ? (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
              <h1>Bienvenido, {user.name} 👋</h1>
              <p className="text-muted">{user.email}</p>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage
              onSubmit={handleLogin}
              error={error}
              loading={loading}
            />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage
              onSubmit={handleRegister}
              error={error}
              loading={loading}
            />
          )
        }
      />

      {/* Cualquier ruta desconocida → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;