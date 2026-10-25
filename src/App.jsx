import { useEffect } from 'react' // <-- Agrega esto
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROLE_HOME } from './data/roles'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DuenoDashboard } from './pages/dueno/DuenoDashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppointmentPage } from './pages/AppointmentPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { VetDashboard } from './pages/vet/VetDashboard'

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  return null; // No renderiza nada, solo hace la acción
}

export function App() {
  const { user } = useAuth()

  // Ruta a la que va un usuario logueado (para redirigirlo si intenta ir a /login)
  //  2. (Opcional pero recomendado) Cambié el '/dueno' por '/' para que 
  // cualquier rol sin panel definido caiga al home público.
  const home = user ? (ROLE_HOME[user.role] ?? '/') : '/login'

  return (
    <Routes>
      {/* Página principal pública: SIEMPRE se muestra, esté logueado o no */}
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={user ? <Navigate to={home} replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={home} replace /> : <RegisterPage />}
      />

      <Route
        path="/dueno/*"
        element={
          <ProtectedRoute roles={['dueno']}>
            <DuenoDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointment"
        element={
          <ProtectedRoute roles={['dueno']}>
            <AppointmentPage />
          </ProtectedRoute>
        }
      />

      {/*  3. Agregamos la ruta protegida para el Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vet/*"
        element={
          <ProtectedRoute roles={['vet']}>
            <VetDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />

      {/* Si la ruta no existe, lo mandamos al inicio público */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}