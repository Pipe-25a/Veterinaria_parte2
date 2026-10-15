import NavItem from "../molecules/NavItem";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__lista">
        <NavItem to="/">Inicio</NavItem>
        <NavItem to="/servicios">Servicios</NavItem>
        <NavItem to="#contacto">Contacto</NavItem>
        <NavItem to="/login">Iniciar sesión</NavItem>
        <NavItem to="/registro">Crear usuario</NavItem>
      </ul>
    </nav>
  );
}

export default Navbar;