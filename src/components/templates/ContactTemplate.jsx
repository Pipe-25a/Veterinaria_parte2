// Template: pantalla de contacto = encabezado + dos columnas.
// "info" va a la izquierda (datos de contacto) y "form" a la derecha (formulario).
// En pantallas chicas las columnas se apilan.
import { PageHeader } from '../molecules/PageHeader'

export function ContactTemplate(props) {
  const { title, subtitle, info, form } = props

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="row g-4">
        <div className="col-12 col-lg-5">{info}</div>
        <div className="col-12 col-lg-7">{form}</div>
      </div>
    </>
  )
}
