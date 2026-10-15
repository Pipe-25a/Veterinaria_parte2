// Átomo: lista desplegable. props.options = [{ value, label }]
function Select(props) {
  const options = props.options || [];

  return (
    <select
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={`form-select ${props.isInvalid ? "is-invalid" : ""}`}
    >
      <option value="">{props.placeholder || "Seleccione una opción"}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
