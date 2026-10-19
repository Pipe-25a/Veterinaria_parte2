// Átomo: casilla de verificación con su etiqueta.
export function Checkbox(props) {
  const disabled = props.disabled ?? false
  const className = props.className ?? ''
  return (
    <div className={`form-check ${className}`.trim()}>
      <input
        id={props.id}
        name={props.name}
        type="checkbox"
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