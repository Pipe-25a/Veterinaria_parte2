// Átomo: lista desplegable.
// "options" acepta objetos { value, label, disabled? } o valores simples
// (['Perro', 'Gato']), y también se pueden pasar <option> como children.
// Cualquier otra prop (id, name, value, onChange, onBlur, required, disabled...)
// pasa directo al <select>.
const SIZES = {
  sm: 'form-select-sm',
  lg: 'form-select-lg',
}

const toOption = (option) =>
  typeof option === 'object' && option !== null
    ? option
    : { value: option, label: option }

export function Select(props) {
  const {
    options = [],
    placeholder,
    size = null,
    invalid = false,
    className = '',
    children,
    ...rest
  } = props

  const classes = ['form-select', size && SIZES[size], invalid && 'is-invalid', className]
    .filter(Boolean)
    .join(' ')

  return (
    <select
      id={props.id}

      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={disabled}
      required={required}
      className={classes}
      aria-invalid={invalid}
    >
      {props.placeholder && <option value="">{props.placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  )
}
