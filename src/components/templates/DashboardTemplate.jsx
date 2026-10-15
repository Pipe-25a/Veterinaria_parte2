import { Navbar, Nav, Container } from 'react-bootstrap';
import NavItem from '../molecules/NavItem';
import Button from '../atoms/Button';

// Plantilla: Panel principal con navegacion superior y contenedor de contenido
function DashboardTemplate({ user, onLogout, children }) {
  const userName = user?.name || user?.email || (typeof user === 'string' ? user : '');

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm mb-4">
        <Container>
          <Navbar.Brand>Veterinaria</Navbar.Brand>
          <Navbar.Toggle aria-controls="dashboard-navbar" />
          <Navbar.Collapse id="dashboard-navbar">
            <Nav className="me-auto">
              <NavItem to="/">Inicio</NavItem>
              <NavItem to="/citas">Citas</NavItem>
            </Nav>
            <div className="d-flex align-items-center gap-3">
              {userName && <span className="navbar-text">{userName}</span>}
              <Button variant="outline-danger" size="sm" onClick={onLogout}>
                Cerrar sesión
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="flex-grow-1 pb-4">
        {children}
      </Container>
    </div>
  );
}

export default DashboardTemplate;
