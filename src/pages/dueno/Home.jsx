// Inicio del dueño: aporta los datos (accesos y usuario) y deja el layout al template.
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { HomeTemplate } from '../../components/templates/HomeTemplate'
import { QuickActions } from '../../components/organisms/QuickActions'

const ACTIONS = [
  {
    title: 'Agendar cita',
    description: 'Reserva una hora para tu mascota completando el formulario.',
    actionLabel: 'Agendar cita',
    href: '/dueno/citas/nueva',
  },
  {
    title: 'Información de contacto',
    description: 'Revisa nuestros datos de contacto y envíanos un correo.',
    actionLabel: 'Ver contacto',
    href: '/dueno/contacto',
  },
  {
    title: 'Productos disponibles',
    description: 'Consulta el catálogo de servicios y medicamentos.',
    actionLabel: 'Ver catálogo',
    href: '/dueno/servicios',
  },
]

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  useTituloPagina('Inicio')

  return (
    <HomeTemplate
      title={user?.name ? `Hola, ${user.name}` : 'Bienvenido/a'}
      subtitle="Bienvenido/a a la clínica veterinaria San Marcos. ¿Qué necesitas hoy?"
      actions={<QuickActions actions={ACTIONS} onNavigate={navigate} />}
    />
  )
}
