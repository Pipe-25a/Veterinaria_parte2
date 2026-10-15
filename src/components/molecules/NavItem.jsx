import { Link } from "react-router-dom";

export default function NavItem({ to, children }) {
  return <Link to={to}>{children}</Link>;
}