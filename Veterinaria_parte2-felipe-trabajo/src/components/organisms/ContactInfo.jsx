// Organismo: tarjeta con los datos de contacto de la clínica.
// items = [{ id, label, value, href? }]
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { ContactItem } from '../molecules/ContactItem'

export function ContactInfo(props) {
  const { title = 'Información de contacto', description, items = [] } = props

  return (
    <section className="card h-100 shadow-sm">
      <div className="card-body">
        <Heading level={2} className="h5">
          {title}
        </Heading>
        {description && <Text tone="muted">{description}</Text>}
        <ul className="list-group list-group-flush">
          {items.map((item) => (
            <ContactItem key={item.id ?? item.label} label={item.label} value={item.value} href={item.href} />
          ))}
        </ul>
      </div>
    </section>
  )
}
