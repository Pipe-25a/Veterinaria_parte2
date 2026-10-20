import Text from "../atoms/Text";
import Link from "../atoms/Link";
import TableCell from "../atoms/TableCell";
import ServiceRow from "../molecules/ServiceRow";

function ServicesCard({ servicios }) {
  return (
    <section id="servicios">
      <Text>Información sobre los servicios que se ofrecen:</Text>
      <table>
        <thead>
          <tr>
            <TableCell as="th">Categoría</TableCell>
            <TableCell as="th">Servicio</TableCell>
            <TableCell as="th">Precio desde</TableCell>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <ServiceRow
              key={s.servicio}
              categoria={s.categoria}
              servicio={s.servicio}
              precio={s.precio}
            />
          ))}
        </tbody>
      </table>
      <Link to="/servicios" variant="nav">Catalogo</Link>
    </section>
  );
}
export default ServicesCard;