// Molécula: tarjeta con un título, una descripción y un enlace de acción.
// El enlace es un <a> real (se puede abrir en otra pestaña); si recibe "onNavigate"
// navega sin recargar la página (la página le pasa useNavigate).
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Link } from '../atoms/Link'

export function ActionCard(props) {
  const { title, description, actionLabel, href, onNavigate, className = '' } = props
  const classes = ['card h-100 shadow-sm', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="card-body d-flex flex-column">
        <Heading level={2} className="h5">
          {title}
        </Heading>
        <Text tone="muted" className="flex-grow-1">
          {description}
        </Text>
        <Link href={href} variant="button" onNavigate={onNavigate} className="align-self-start">
          {actionLabel}
        </Link>
      </div>
    </div>
  )
}
