//Esto es para la tabla
function TableCell({ as: Tag = "td", children }) {
  return <Tag className="table-cell">{children}</Tag>;
}