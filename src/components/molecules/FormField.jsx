// Molécula: campo de formulario = Label + (Input | Textarea) + mensaje de error.
// Sirve para cualquier formulario: login, registro, contacto, citas...
// "as" elige el control ('input' por defecto o 'textarea').
// Si no recibe "name", usa el "id" (así los handlers con e.target.name funcionan).
// Cualquier otra prop (type, value, onChange, placeholder, rows...) pasa al control.
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import { TextArea } from '../atoms/TextArea'

export function FormField(props) {
  const as = props.as ?? 'input'
  const name = props.name ?? props.id
  const required = props.required ?? false
  const className = props.className ?? ''
  const Control = as === 'textarea' ? TextArea : Input
  const classes = ['mb-3', className].filter(Boolean).join(' ')

  // Forwarding al <Control>: type, value, onChange, placeholder, rows, etc.
  const {
    id,
    label,
    as: _as,
    name: _name,
    error,
    required: _r,
    className: _c,
    ...rest
  } = props

  return (
    <div className={classes}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <Control
        id={id}
        name={name}
        required={required}
        invalid={Boolean(error)}
        {...rest}
      />
      {error && (
        <div className="invalid-feedback d-block" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}