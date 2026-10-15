import { useLocation } from 'react-router-dom';
import Link from '../atoms/Link';

// Molecula: Elemento de navegacion que resalta si la ruta actual coincide
function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className={`nav-item px-2 ${isActive ? 'active' : ''}`}>
      <Link
        to={to}
        variant={isActive ? 'nav nav-link active fw-bold text-primary' : 'nav nav-link text-secondary'}
      >
        {children}
      </Link>
    </div>
  );
}

export default NavItem;