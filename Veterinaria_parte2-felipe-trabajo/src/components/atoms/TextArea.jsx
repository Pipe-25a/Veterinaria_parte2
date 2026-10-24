// Átomo: campo de varias líneas (motivo de la cita, observaciones).
// Átomo: campo de varias líneas (motivo de la cita, observaciones).
// Cualquier otra prop (id, name, value, onChange, onBlur, placeholder, required,
// disabled, maxLength...) pasa directo al <textarea>.
const SIZES = {
  sm: 'form-control-sm',
  lg: 'form-control-lg',
}

export function TextArea(props) {
  const { rows = 3, size = null, invalid = false, className = '', ...rest } = props

  const classes = ['form-control', size && SIZES[size], invalid && 'is-invalid', className]
    .filter(Boolean)
    .join(' ')

  return (
    <textarea
      {...rest}
      rows={rows}
      className={classes}
      aria-invalid={invalid || undefined}
    />
  )
}
