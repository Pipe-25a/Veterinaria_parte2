// Molécula: Grupo de navegación para el footer.
// Compuesta por átomos: Heading, Link y Text.
// Recibe el título de la sección y la lista de enlaces por props.
import { Heading } from '../atoms/Heading'
import { Link } from '../atoms/Link'
import { Text } from '../atoms/Text'

export function FooterNavGroup(props) {
  const { title, items = [], onNavigate, className = '' } = props
  const classes = ['mb-4 mb-md-0', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {title && (
        <Heading level={4} className="h6 text-uppercase fw-bold text-white mb-3">
          {title}
        </Heading>
      )}
      <ul className="list-unstyled mb-0">
        {items.map((item, index) => (
          <li key={item.id ?? item.href ?? index} className="mb-2">
            {item.href ? (
              <Link
                href={item.href}
                onNavigate={onNavigate}
                className="text-white-50 text-decoration-none hover-white"
              >
                {item.label}
              </Link>
            ) : (
              <Text as="span" className="text-white-50">
                {item.label}
              </Text>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterNavGroup
