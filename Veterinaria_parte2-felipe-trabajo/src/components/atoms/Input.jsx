// Átomo: campo de una línea (text, email, password, number, date, time...).
export function Input(props) {
  const type = props.type ?? 'text'
  const invalid = props.invalid ?? false
  const disabled = props.disabled ?? false
  const required = props.required ?? false
  const className = props.className ?? ''

  const classes = ['form-control', invalid && 'is-invalid', className]
    .filter(Boolean)
    .join(' ')

  return (
    <input
      id={props.id}
      name={props.name}
      type={type}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      disabled={disabled}
      required={required}
      className={classes}
      aria-invalid={invalid}
    />
  )
}