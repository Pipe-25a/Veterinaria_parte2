// Átomo: opción de un grupo. Varios Radio con el mismo "name" forman un grupo.
export function Radio(props) {
  const disabled = props.disabled ?? false
  const className = props.className ?? ''

  return (
    <div className={`form-check ${className}`.trim()}>
      <input
        id={props.id}
        name={props.name}
        type="radio"
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        disabled={disabled}
        className="form-check-input"
      />
      <label htmlFor={props.id} className="form-check-label">
        {props.label}
      </label>
    </div>
  )
}