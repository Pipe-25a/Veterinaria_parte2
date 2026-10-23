import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROLE_HOME } from './data/roles'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DuenoDashboard from './pages/dueno/DuenoDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AppointmentPage from './pages/AppointmentPage'

function App() {
  const { user } = useAuth()

  // Ruta a la que va un usuario logueado (para redirigirlo si intenta ir a /login)
  const home = user ? (ROLE_HOME[user.role] ?? '/dueno') : '/login'

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

      {/* Si la ruta no existe, lo mandamos al inicio público */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App