import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Link } from '../atoms/Link'

export function ActionCard(props) {
  const { title, description, actionLabel, href, onNavigate, className = '', bgClass = '', headingLevel = 1 } = props

  // Añadimos bgClass para permitir los fondos verdes de Bootstrap
  const classes = ['card h-100 shadow-sm', bgClass, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="card-body d-flex flex-column text-center">
        <Heading level={headingLevel} className="text-center">{title}</Heading>

        {description && (
          <Text tone="muted" className="flex-grow-1 mt-2">
            {description}
          </Text>
        )}

        {actionLabel && href && (
          <Link href={href} variant="button" onNavigate={onNavigate} className="align-self-center mt-3">
            {actionLabel}
          </Link>
        )}

        {props.children}
      </div>
    </div>
  )
}