// Organismo: formulario para enviar un correo a la clínica.
// "onSubmit(form)" debe devolver { ok } o { ok: false, errors: { campo: 'mensaje' } }
// (mismo patrón que el formulario de mascotas). Los datos iniciales (nombre y correo
// del usuario) llegan por "initialValues".
import { useState } from 'react'
import { Heading } from '../atoms/Heading'
import { Button } from '../atoms/Button'
import { FormField } from '../molecules/FormField'

export function EmailForm(props) {
  const { onSubmit, initialValues = {}, title = 'Envíanos un correo' } = props

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', ...initialValues })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = onSubmit(form)
    if (result.ok) {
      setErrors({})
      setSent(true)
      setForm((prev) => ({ ...prev, subject: '', message: '' }))
    } else {
      setErrors(result.errors ?? {})
      setSent(false)
    }
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <Heading level={2} className="h5">
          {title}
        </Heading>
        {sent && (
          <div className="alert alert-success" role="status">
            Tu mensaje fue enviado. Te responderemos lo antes posible.
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <FormField id="name" label="Nombre" value={form.name} onChange={handleChange} error={errors.name} required />
          <FormField
            id="email"
            label="Correo"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            id="subject"
            label="Asunto"
            value={form.subject}
            onChange={handleChange}
            error={errors.subject}
            required
          />
          <FormField
            id="message"
            label="Mensaje"
            as="textarea"
            rows={5}
            value={form.message}
            onChange={handleChange}
            error={errors.message}
            required
          />
          <Button type="submit">Enviar correo</Button>
        </form>
      </div>
    </section>
  )
}
