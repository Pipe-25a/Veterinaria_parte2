import { NavLink, Link } from 'react-router-dom';

export const Sidebar = ({ links }) => {
  return (
    <nav className="nav flex-column p-3 h-100 sidebar-wrapper sidebar-container">
      <div className="mb-4 px-2 sidebar-brand">
        <img className="sidebar-logo-img" src="/logo.jpg" alt="Logo San Marcos" />
        <h5 className="fw-bold mb-0">Panel de Control</h5>
        <small className="opacity-50">Veterinaria</small>
      </div>

      <div className="flex-grow-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `nav-link mb-2 sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <hr className="text-secondary opacity-25" />

      <div className="d-flex flex-column gap-2">
        <Link to="/" className="btn btn-sm text-start btn-public">
          🌐 Ir al sitio público
        </Link>
        <Link to="/logout" className="btn btn-sm text-start btn-logout">
          🚪 Cerrar Sesión
        </Link>
      </div>
    </nav>
  );
};