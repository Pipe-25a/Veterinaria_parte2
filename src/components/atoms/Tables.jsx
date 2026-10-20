//correcion de la tabla es necesario que traiga props.
//la tabla debe ser un componete flexible que pueda contener cualquier dato

export function Table(props) {
  const className = props.className ?? ''
  const classes = ['table', className].filter(Boolean).join(' ')

  return (
    <table className={classes}>
      {props.children}
    </table>
  )
}