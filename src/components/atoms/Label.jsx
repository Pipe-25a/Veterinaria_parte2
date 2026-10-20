// Átomo: etiqueta de un campo. Si es obligatorio, agrega un asterisco.
export function Label(props) {
  const required = props.required ?? false
  const className = props.className ?? ''
  return (
    <label htmlFor={props.htmlFor} className={`form-label ${className}`.trim()}>
      {props.children}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
  )
}
