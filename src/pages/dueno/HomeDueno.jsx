import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HomeTemplate } from '../../components/templates/HomeTemplate'
import { QuickActions } from '../../components/organisms/QuickActions'

const ACTIONS = [
  { title: 'Agendar cita', description: 'Reserva una hora...', actionLabel: 'Agendar cita', href: '/dueno/citas/nueva' },
  { title: 'Información de contacto', description: 'Revisa nuestros datos...', actionLabel: 'Ver contacto', href: '/dueno/contacto' },
  { title: 'Productos disponibles', description: 'Consulta el catálogo...', actionLabel: 'Ver catálogo', href: '/dueno/servicios' },
]

export function HomeDueno() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="container py-4">
      <HomeTemplate
        title={user?.name ? `Hola, ${user.name}` : 'Bienvenido/a'}
        subtitle="Bienvenido/a a la clínica veterinaria San Marcos. ¿Qué necesitas hoy?"
        actions={<QuickActions actions={ACTIONS} onNavigate={navigate} />}
      />
    </div>
  )
}