export function Table(props) {
  const {
    columns,
    rows = [],
    rowKey = 'id',
    caption,
    emptyText = 'No hay datos para mostrar',
    striped = false,
    hover = false,
    bordered = false,
    small = false,
    responsive = false,
    className = '',
    children,
    ...rest
  } = props

  const classes = [
    'table',
    striped && 'table-striped',
    hover && 'table-hover',
    bordered && 'table-bordered',
    small && 'table-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const keyOf = (row, index) =>
    typeof rowKey === 'function' ? rowKey(row, index) : (row[rowKey] ?? index)

  const content = Array.isArray(columns) ? (
    <>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" className={column.className}>
              {column.header ?? column.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center text-body-secondary">
              {emptyText}
            </td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr key={keyOf(row, index)}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </>
  ) : (
    <>
      {caption && <caption>{caption}</caption>}
      {children}
    </>
  )

  const table = (
    <table {...rest} className={classes}>
      {content}
    </table>
  )

  return responsive ? <div className="table-responsive">{table}</div> : table
}
