import { Text } from '../atoms/Text'
import { Table } from '../atoms/Tables'

export function ServiceCard(props) {
  const columns = [
    { key: 'category', header: 'Categoría' },
    { key: 'service', header: 'Servicio' },
    {
      key: 'price',
      header: 'Precio desde',
      render: (value) => typeof value === 'number' ? `$${value.toLocaleString('es-CL')}` : value
    }
  ]

  const services = props.services ?? props.servicios ?? []

  return (
    <section id="servicios" className="mb-4">
      <Text className="mb-3">Información sobre los servicios que se ofrecen:</Text>

      <Table
        columns={columns}
        rows={services}
        bordered
        hover
        className="mb-4"
        emptyText="No hay servicios disponibles"
      />
    </section>
  )
}