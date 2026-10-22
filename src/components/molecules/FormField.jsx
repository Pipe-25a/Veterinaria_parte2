// Molécula: campo de formulario = Label + (Input | Textarea) + mensaje de error.
// Sirve para cualquier formulario: login, registro, contacto, citas...
// "as" elige el control ('input' por defecto o 'textarea').
// Si no recibe "name", usa el "id" (así los handlers con e.target.name funcionan).
// Cualquier otra prop (type, value, onChange, placeholder, rows...) pasa al control.
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import { Textarea } from '../atoms/TextArea'

export function FormField(props) {
  const { id, label, as = 'input', name, error, required = false, className = '', ...rest } = props

  const Control = as === 'textarea' ? Textarea : Input
  const classes = ['mb-3', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <Control id={id} name={name ?? id} required={required} invalid={Boolean(error)} {...rest} />
      {error && (
        <div className="invalid-feedback d-block" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
