import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppointmentPage from './pages/AppointmentPage';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

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
        localStorage.setItem('user', JSON.stringify(loggedUser));
        navigate('/appointment'); // 👈 Redirige a /appointment tras loguearse
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
  const handleRegister = async ({ name, email, password }) => {
    setError('');
    setLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      await new Promise((r) => setTimeout(r, 800));

      const newUser = { email, name };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/appointment'); // 👈 Redirige a /appointment tras registrarse
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler para procesar la cita recibida desde AppointmentPage
  const handleAppointment = (data) => {
    const newAppointment = {
      id: Date.now(),
      ownerEmail: user.email,
      status: 'pending',
      ...data,
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setSuccess(`Cita solicitada para ${data.petName}. La clínica te la confirmará.`);
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setError('');
    setSuccess('');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Routes>
      {/* Si entra a la raíz, redirige automáticamente según el estado de sesión */}
      <Route
        path="/"
        element={<Navigate to={user ? "/appointment" : "/login"} replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/appointment" replace />
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
            <Navigate to="/appointment" replace />
          ) : (
            <RegisterPage
              onSubmit={handleRegister}
              error={error}
              loading={loading}
            />
          )
        }
      />

      {/* Ruta protegida: Citas */}
      <Route
        path="/appointment"
        element={
          user ? (
            <AppointmentPage
              user={user}
              success={success}
              onSubmit={handleAppointment}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Cualquier ruta desconocida → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;