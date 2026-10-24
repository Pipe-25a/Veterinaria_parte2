import { Link as RouterLink } from 'react-router-dom'
import { Text } from '../atoms/Text'
import { Table } from '../atoms/Tables' // 👈 Usamos tu átomo Table

export function ServiceCard(props) {
  // 1. Definimos las columnas que tendrá la tabla
  const columns = [
    { key: 'categoria', header: 'Categoría' },
    { key: 'servicio', header: 'Servicio' },
    {
      key: 'precio',
      header: 'Precio desde',
      // Formateamos el precio con separador de miles (ej: 15000 -> $15.000)
      render: (valor) => typeof valor === 'number' ? `$${valor.toLocaleString('es-CL')}` : valor
    }
  ]

  return (
    <section id="servicios" className="mb-4">
      <Text className="mb-3">Información sobre los servicios que se ofrecen:</Text>

      {/* 2. Usamos el átomo Table pasándole las columnas y los datos por props */}
      <Table
        columns={columns}
        rows={props.servicios}
        bordered
        hover
        className="mb-4"
        emptyText="No hay servicios disponibles"
      />

      {/*<RouterLink to="/servicios" className="btn btn-outline-primary">
        Catálogo completo
      </RouterLink>*/}
    </section>
  )
}