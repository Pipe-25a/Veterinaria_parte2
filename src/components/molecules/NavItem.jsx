//esto es pa la barra de navegacion
import React from 'react';
import Link from "../atoms/Link";

//funcion para la barra de navegacion
function NavItem({ to, children }) {
  return (
    //esto es para la barra de navegacion
    <li>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}
export default NavItem;
