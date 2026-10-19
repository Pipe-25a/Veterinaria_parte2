//rehacer y agregar props atomos: lable,input.
//tiene que ser flexible y reutilizable para cualquier tipo de formulario
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'

export function ContactForm(props) {
  const { title, description, className = '', children } = props
  const classes = ['contact-form', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <Label text="" />
      <Input type="" placeholder="" />
      {children}
    </div>
  )
}