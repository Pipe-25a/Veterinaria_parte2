import { useState } from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  // Estado global del usuario autenticado
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Estado para controlar qué vista mostrar: 'login' o 'register'
  const [view, setView] = useState('login');

  // Función que se ejecuta al enviar el formulario de login
  const handleLogin = async ({ email, password }) => {
    setError('');
    setLoading(true);

    try {
      // Validación básica
      if (!email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      // Simulación de llamada a API
      await new Promise((r) => setTimeout(r, 800));

      if (email === 'admin@test.com' && password === '123456') {
        setUser({ email, name: 'Admin' });
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función que se ejecuta al enviar el formulario de registro
  const handleRegister = async ({ nombre, email, password }) => {
    setError('');
    setLoading(true);

    try {
      // Validación básica
      if (!nombre || !email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      // Simulación de llamada a API (reemplaza por tu fetch real)
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nombre, email, password }),
      // });
      // if (!res.ok) throw new Error('Error al registrar usuario');
      // const data = await res.json();

      // Simulación:
      await new Promise((r) => setTimeout(r, 800));

      // Aquí normalmente registrarías al usuario y luego lo loguearías
      // o lo redirigirías al login. Simulamos autologueo:
      setUser({ email, name: nombre });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null);
    setError('');
    setView('login');
  };

  // Función para cambiar entre login y registro
  const goToRegister = () => {
    setError('');
    setView('register');
  };

  const goToLogin = () => {
    setError('');
    setView('login');
  };

  // Render condicional: si hay usuario, muestra home
  if (user) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <h1>Bienvenido, {user.name} 👋</h1>
        <p className="text-muted">{user.email}</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  // Si no hay usuario, mostramos login o registro según el estado 'view'
  return (
    <>
      {view === 'login' ? (
        <LoginPage
          onSubmit={handleLogin}
          error={error}
          loading={loading}
          onGoToRegister={goToRegister}
        />
      ) : (
        <RegisterPage
          onSubmit={handleRegister}
          error={error}
          loading={loading}
          onGoToLogin={goToLogin}
        />
      )}
    </>
  );
}

export default App