// Átomo: lista desplegable. Recibe las opciones como arreglo de { value, label }.
export function Select(props) {
  const options = props.options ?? []
  const invalid = props.invalid ?? false
  const disabled = props.disabled ?? false
  const required = props.required ?? false
  const className = props.className ?? ''

  const classes = ['form-select', invalid && 'is-invalid', className]
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
    </select>
  )
}