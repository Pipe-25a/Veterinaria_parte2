import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOME } from "../../constants/roles";
import NavItem from "../molecules/NavItem";
import Button from "../atoms/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <NavItem to="/">Inicio</NavItem>
      {user ? (
        <>
          <NavItem to={ROLE_HOME[user.role]}>Mi panel</NavItem>
          <span>{user.name}</span>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </>
      ) : (
        <>
          <NavItem to="/login">Ingresar</NavItem>
          <NavItem to="/register">Registrarse</NavItem>
        </>
      )}
    </nav>
  );
}