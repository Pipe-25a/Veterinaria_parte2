import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLE_HOME } from '../../data/roles'
import { Button } from '../atoms/Button'
import { Link } from '../atoms/Link'

export default function Navbar() {
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

        <Link href="/" onNavigate={navigate} className="fs-5 fw-bold text-success text-decoration-none">
          🐾 Veterinaria San Marcos
        </Link>

        <div className="d-flex align-items-center gap-3">
          <NavLink to="/" className="text-dark text-decoration-none">Inicio</NavLink>
          <NavLink to="/servicios" className="text-dark text-decoration-none">Servicios</NavLink>
          <NavLink to="/contacto" className="text-dark text-decoration-none">Contacto</NavLink>

          {/* BOTÓN AGENDAR CITA: Siempre visible, inteligente */}
          <NavLink
            to={rutaAgendar}
            className="btn btn-primary btn-sm text-white text-decoration-none"
          >
            Agendar Cita
          </NavLink>

          {user ? (
            <>
              <NavLink
                to={ROLE_HOME[user.role] ?? '/dueno'}
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