import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ links }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // 1. Borra la sesión
    navigate('/', { replace: true });      // 2. Te manda directo al HomePage (/)
  };

  return (
    <nav className="nav flex-column nav-pills p-3 bg-light h-100">
      {/* Links del menú */}
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {l.label}
        </NavLink>
      ))}

      <hr className="my-4 text-muted" />

      <Link to="/" className="btn btn-outline-primary btn-sm">
        Ir al sitio público
      </Link>

      <Link
        to="/logout"
        className="btn btn-outline-danger btn-sm mt-3"
      >
        🚪 Cerrar Sesión
      </Link>

    </nav>
  );
};
