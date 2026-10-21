// Organismo: sección de catálogo de solo lectura = título + descripción + tabla.
// Sirve para cualquier lista (servicios, medicamentos...):
// columns = [{ key, header, render?, className? }], rows = [{ id, ... }]
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Table } from '../atoms/Tables'

export function CatalogTable(props) {
  const { title, description, columns, rows, emptyText } = props

  return (
    <section className="mb-5">
      <Heading level={2} className="h4">
        {title}
      </Heading>
      {description && <Text tone="muted">{description}</Text>}
      <Table columns={columns} rows={rows} emptyText={emptyText} striped hover responsive />
    </section>
  )
}
