// Molécula: encabezado de una página = título (Heading) + subtítulo opcional (Text).
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export function PageHeader(props) {
  const { title, subtitle, className = '' } = props
  const classes = ['mb-4', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <Heading level={1} className="h2 mb-1">
        {title}
      </Heading>
      {subtitle && (
        <Text tone="muted" className="mb-0">
          {subtitle}
        </Text>
      )}
    </header>
  )
}
