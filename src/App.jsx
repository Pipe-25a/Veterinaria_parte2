import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROLE_HOME } from './data/roles'
import HomePage from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DuenoDashboard from './pages/dueno/DuenoDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AppointmentPage from './pages/AppointmentPage'

function App() {
  const { user } = useAuth()
  // Ruta de inicio según rol para usuarios logueados
  const home = user ? (ROLE_HOME[user.role] ?? '/dueno') : '/login'

  return (
    <Routes>
      {/* Página principal pública del sitio */}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
