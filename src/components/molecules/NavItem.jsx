//esto es pa la barra de navegacion
import React from 'react';
import Link from "../atoms/Link";

//funcion para la barra de navegacion
function NavItem({ to, children }) {
  return (
    //esto es para la barra de navegacion
    <nav>
      <ul>
        <NavItem to="/">Inicio</NavItem>
        <NavItem to="/servicios">Servicios</NavItem>
        <NavItem to="#contacto">Contacto</NavItem>
        <NavItem to="/login">Iniciar sesión</NavItem>
        
      </ul>
    </nav>
    );
}
export default NavItem;