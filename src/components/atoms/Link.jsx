import { Link as RouterLink } from "react-router-dom";

function Link({ to, children, variant = "nav" }) {
  return <RouterLink to={to} className={`link link--${variant}`}>{children}</RouterLink>;
}

