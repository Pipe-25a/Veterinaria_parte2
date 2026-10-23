import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ links }) => (
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

    {/* Botón fijo al final */}
    <hr className="my-4 text-muted" />
    <Link to="/" className="btn btn-outline-primary btn-sm">
      🌐 Ir al sitio público
    </Link>
  </nav>
);

export default Sidebar;