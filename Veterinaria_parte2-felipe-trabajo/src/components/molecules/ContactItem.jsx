// Molécula: un dato de contacto = etiqueta (Text) + valor (Text o Link).
// Si recibe "href" (mailto:, tel:, https://...) el valor se muestra como enlace.
// Va dentro de un <ul>.
import { Text } from '../atoms/Text'
import { Link } from '../atoms/Link'

export function ContactItem(props) {
  const { label, value, href, className = '' } = props
  const classes = ['list-group-item', className].filter(Boolean).join(' ')

  return (
    <li className={classes}>
      <Text as="small" tone="muted" className="d-block">
        {label}
      </Text>
      {href ? <Link href={href}>{value}</Link> : <Text as="span">{value}</Text>}
    </li>
  )
}
