// Átomo: botón reutilizable. Cada tamaño se traduce a una clase de Bootstrap.
// Agregar un tamaño nuevo es agregar una línea en SIZES.
const SIZES = {
  sm: 'btn-sm',
  lg: 'btn-lg',
}

export function Button(props) {
  const variant = props.variant ?? 'primary'
  const type = props.type ?? 'button'
  const disabled = props.disabled ?? false
  const size = props.size ?? null
  const fullWidth = props.fullWidth ?? false
  const className = props.className ?? ''

  // filter(Boolean) descarta los valores vacíos, así no quedan espacios sobrantes.
  const classes = [
    'btn',
    `btn-${variant}`,
    size && SIZES[size],
    fullWidth && 'w-100',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={props.onClick}
      disabled={disabled}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </button>
  )
}