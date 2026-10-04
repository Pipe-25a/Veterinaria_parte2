import { useState } from 'react'
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterPage'
import './App.css'

function App() {
  // Estado global del usuario autenticado
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario de login
  const handleLogin = async ({ email, password }) => {
    setError('');
    setLoading(true);

    try {
      //  Validación básica
      if (!email || !password) {
        throw new Error('Debes completar todos los campos');
      }

      //  Simulación de llamada a API (reemplaza por tu fetch real)
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error('Credenciales inválidas');
      // const data = await res.json();

      // Simulación:
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

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null);
    setError('');
  };

  //  Render condicional: si hay usuario, muestra home; si no, muestra login
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

  return (
    <LoginPage
      onSubmit={handleLogin}
      error={error}
      loading={loading}
    />
  );
}

export default App