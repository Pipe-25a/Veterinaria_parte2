// Contacto del dueño: aporta los datos y el envío del correo; el layout lo pone el template.
import { useAuth } from '../../context/AuthContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { sendMessage } from '../../services/messageService'
import contactItems from '../../data/contacto.json'
import { ContactTemplate } from '../../components/templates/ContactTemplate'
import { ContactInfo } from '../../components/organisms/ContactInfo'
import { EmailForm } from '../../components/organisms/EmailForm'

export default function Contact() {
  const { user } = useAuth()
  useTituloPagina('Contacto')

  return (
    <ContactTemplate
      title="Contacto"
      subtitle="Escríbenos o visítanos, con gusto te ayudamos."
      info={<ContactInfo items={contactItems} />}
      form={
        <EmailForm
          onSubmit={sendMessage}
          initialValues={{ name: user?.name ?? '', email: user?.email ?? '' }}
        />
      }
    />
  )
}
