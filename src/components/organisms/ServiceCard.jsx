// src/components/organisms/ServiceCard.jsx
import { Link as RouterLink } from 'react-router-dom'
import { Text } from '../atoms/Text'
import TableCell from '../atoms/TableCell'
import ServiceRow from '../molecules/ServiceRow'

function ServicesCard(props) {
  return (
    <section id="servicios">
      <Text>Información sobre los servicios que se ofrecen:</Text>
      <table className="table">
        <thead>
          <tr>
            <TableCell as="th">Categoría</TableCell>
            <TableCell as="th">Servicio</TableCell>
            <TableCell as="th">Precio desde</TableCell>
          </tr>
        </thead>
        <tbody>
          {props.servicios.map((s) => (
            <ServiceRow
              key={s.servicio}
              categoria={s.categoria}
              servicio={s.servicio}
              precio={s.precio}
            />
          ))}
        </tbody>
      </table>
      <RouterLink to="/servicios" className="btn btn-outline-primary">
        Catálogo
      </RouterLink>
    </section>
  )
}

export default ServicesCard