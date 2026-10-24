//agregar Prop.
//atomos: label, link
import { NavLink } from 'react-router-dom'

export function NavItem(props) {
  const className = props.className ?? ''

  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        ['nav-link', isActive && 'active', className].filter(Boolean).join(' ')
      }
    >
      {props.children ?? props.label}
    </NavLink>
  )
}