import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLE_HOME } from '../../data/roles'
import { Button } from '../atoms/Button'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // Al cerrar sesión, lo dejamos en el Home público
  }

  // Ruta de agendar según si está logueado o no
  const rutaAgendar = user ? '/appointment' : '/login'

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Logo - Usando el Link de React Router */}
        <Link to="/" className="fs-5 fw-bold text-success text-decoration-none">
          🐾 Veterinaria San Marcos
        </Link>

        <div className="d-flex align-items-center gap-3">
          <a href="#top" className="text-dark text-decoration-none">Inicio</a>
          <a href="#servicios" className="text-dark text-decoration-none">Servicios</a>
          <a href="#contacto" className="text-dark text-decoration-none">Contacto</a>
          {/* BOTÓN AGENDAR CITA */}
          <NavLink
            to={rutaAgendar}
            className="btn btn-primary btn-sm text-white text-decoration-none"
          >
            Agendar Cita
          </NavLink>

          {user ? (
            <>
              {/* BOTÓN MI PANEL */}
              <NavLink
                to={ROLE_HOME[user.role] ?? '/'}
                className="btn btn-outline-success btn-sm"
              >
                Mi Panel
              </NavLink>
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-dark text-decoration-none">
                Ingresar
              </NavLink>
              <NavLink to="/register" className="btn btn-success btn-sm text-white text-decoration-none">
                Registrarse
              </NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}