//Esto es para la tabla
function TableCell(props) {
  const Tag = props.as ?? 'td'
  const className = props.className ?? ''
  const classes = ['table-cell', className].filter(Boolean).join(' ')

  // Forwarding: colSpan, scope, onClick, etc.
  const { as: _as, className: _c, children, ...rest } = props

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default TableCell;