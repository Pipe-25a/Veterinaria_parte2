import TableCell from '../atoms/TableCell';

//esto es pa la tabla de servicios todavía no se ha implementado la funcionalidad completa, pero se puede ver que se está creando una tabla con las categorías, servicios y precios.
function ServiceTable({ categoria, servicio, precio }) {
  return (
    <tr>
      <TableCell>{categoria}</TableCell>
      <TableCell>{servicio}</TableCell>
      <TableCell>{precio}</TableCell>
    </tr>
  );
}
export default ServiceTable; 