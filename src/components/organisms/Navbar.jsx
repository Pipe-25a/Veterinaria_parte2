import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLE_HOME } from '../../data/roles'
import { NavItem } from '../molecules/NavItem'
import { Button } from '../atoms/Button'
import { Link } from '../atoms/Link'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand bg-white border-bottom shadow-sm px-3 py-2 sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Marca de la veterinaria */}
        <Link
          href="/"
          onNavigate={navigate}
          className="navbar-brand fw-bold text-primary text-decoration-none d-flex align-items-center gap-2 m-0"
        >
          <span className="fs-4">🐾</span>
          <span className="fs-5">Veterinaria San Marcos</span>
        </Link>

        {/* Enlaces de navegación */}
        <div className="d-flex align-items-center gap-3">
          <NavItem to="/">Inicio</NavItem>
          {user ? (
            <>
              <NavItem to={ROLE_HOME[user.role] ?? '/'}>Mi panel</NavItem>
              <span className="text-muted small fw-medium">{user.name}</span>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/login">Ingresar</NavItem>
              <NavItem to="/register">Registrarse</NavItem>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login')}
                className="d-none d-md-inline-block"
              >
                Agendar Cita
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
