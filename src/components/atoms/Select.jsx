const Select = ({ id, name, value, onChange, options, placeholder = 'Selecciona...' }) => (
  <select
    id={id}
    name={name}
    className="form-select"
    value={value}
    onChange={onChange}
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

export default Select;