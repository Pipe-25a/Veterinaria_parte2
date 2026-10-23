// Molécula: Grupo de navegación para el footer.
// Compuesta por átomos: Heading, Link y Text.
// Recibe el título de la sección y la lista de enlaces por props.
import { Heading } from '../atoms/Heading'
import { Link } from 'react-router-dom'

export function FooterNavGroup(props) {
  return (
    <div className={props.className ?? 'mb-4'}>
      {props.title && (
        <Heading level={5} className="text-uppercase mb-3 fw-bold">
          {props.title}
        </Heading>
      )}
      <ul className="list-unstyled">
        {props.links.map((link, index) => (
          <li key={index} className="mb-2">
            <Link to={link.to} className="text-decoration-none text-white-50">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}