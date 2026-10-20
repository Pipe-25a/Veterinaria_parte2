import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => (
  <nav className="nav flex-column nav-pills p-3 bg-light h-100">
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
  </nav>
);

export default Sidebar;