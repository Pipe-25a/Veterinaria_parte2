// Átomo: input de una línea (texto, email, password, number, date...)
export function TextField(props) {
  return (
    <input
      id={props.id}
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      min={props.min}
      className={`form-control ${props.isInvalid ? "is-invalid" : ""}`}
    />
  );
}

