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
  const options = props.options ?? []
  const placeholder = props.placeholder
  const size = props.size ?? null
  const invalid = props.invalid ?? false
  const className = props.className ?? ''
  const disabled = props.disabled ?? false
  const required = props.required ?? false

  const classes = ['form-select', size && SIZES[size], invalid && 'is-invalid', className]
    .filter(Boolean)
    .join(' ')

  // Forwarding al <select>: id, name, value, onChange, onBlur, data-*, aria-*
  const { options: _o, placeholder: _p, size: _s, invalid: _i,
    className: _c, children: _ch, disabled: _d, required: _r,
    ...rest } = props

  return (
    <select
      {...rest}
      disabled={disabled}
      required={required}
      className={classes}
      aria-invalid={invalid || undefined}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((raw) => {
        const opt = toOption(raw)
        return (
          <option key={opt.value} value={opt.value} disabled={opt.disabled ?? false}>
            {opt.label}
          </option>
        )
      })}
      {props.children}
    </select>
  )
}