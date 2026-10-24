import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute(props) {
  const { user } = useAuth()
  const roles = props.roles ?? []

  if (!user) return <Navigate to="/login" replace />
  if (roles.length > 0 && !roles.includes(user.role)) return <Navigate to="/" replace />
  return props.children
}