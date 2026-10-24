import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Link } from '../atoms/Link'

export function ActionCard(props) {
  const { title, description, actionLabel, href, onNavigate, className = '', bgClass = '' } = props

  // Añadimos bgClass para permitir los fondos verdes de Bootstrap
  const classes = ['card h-100 shadow-sm', bgClass, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="card-body d-flex flex-column text-center"> {/* text-center para el home */}
        <Heading level={1} className="text-center">{props.title}</Heading>

        {description && (
          <Text tone="muted" className="flex-grow-1 mt-2">
            {description}
          </Text>
        )}

        {/* Solo renderiza el botón si le pasamos un actionLabel */}
        {actionLabel && href && (
          <Link href={href} variant="button" onNavigate={onNavigate} className="align-self-center mt-3">
            {actionLabel}
          </Link>
        )}

        {/* Por si queremos pasarle contenido extra */}
        {props.children}
      </div>
    </div>
  )
}