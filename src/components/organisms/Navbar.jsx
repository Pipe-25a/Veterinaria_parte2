import { useState } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLE_HOME } from '../../data/roles'
import { Button } from '../atoms/Button'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  // Solo dueños (o anónimos) ven "Agendar Cita"
  const showAppointmentButton = !user || user.role === 'dueno'
  const appointmentRoute = user ? '/dueno/citas/nueva' : '/login'

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div className="container">
        <Link to="/" className="fs-5 fw-bold text-success text-decoration-none">
          <img src="/logo.jpg" alt="" className="navbar-logo-img" />
          Veterinaria San Marcos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <div className="d-flex align-items-lg-center gap-3 ms-auto mt-3 mt-lg-0 flex-column flex-lg-row">
            {/* Usar Link en vez de <a href="#..."> para no romper en otras rutas */}
            <Link to="/#servicios" className="text-dark text-decoration-none" onClick={() => setOpen(false)}>
              Servicios
            </Link>
            <Link to="/#contacto" className="text-dark text-decoration-none" onClick={() => setOpen(false)}>
              Contacto
            </Link>

            {showAppointmentButton && (
              <NavLink to={appointmentRoute} className="btn btn-primary btn-sm text-white text-decoration-none">
                Agendar Cita
              </NavLink>
            )}

            {user ? (
              <>
                <NavLink to={ROLE_HOME[user.role] ?? '/'} className="btn btn-outline-success btn-sm">
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
      </div>
    </nav>
  )
}