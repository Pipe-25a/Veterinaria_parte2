import { useAuth } from '../../context/AuthContext'
import { PageHeader } from '../../components/molecules/PageHeader'
import { QuickActions } from '../../components/organisms/QuickActions'
import { useNavigate } from 'react-router-dom'
import { useTituloPagina } from '../../hooks/useTituloPagina'

const ACTIONS = [
    {
        title: 'Citas',
        description: 'Agendar, ver, confirmar y registrar citas médicas.',
        actionLabel: 'Ver Citas',
        href: '/vet/citas'
    },
    {
        title: 'Historial Clínico',
        description: 'Consulta el historial completo de atenciones de cada mascota.',
        actionLabel: 'Ver Historial',
        href: '/vet/historial'
    },
    {
        title: 'Gestión de Fichas',
        description: 'Crear, editar y administrar las fichas clínicas de los pacientes.',
        actionLabel: 'Ver Fichas',
        href: '/vet/fichas'
    },
    {
        title: 'Reportes',
        description: 'Estadísticas de atenciones, especies atendidas e ingresos.',
        actionLabel: 'Ver Reportes',
        href: '/vet/reportes'
    },
]

export default function VetHomePage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    useTituloPagina('Panel de Veterinaria')

    return (
        <div>
            <PageHeader
                title={`Bienvenido: ${user?.name ?? 'Veterinario'}`}
                subtitle="Selecciona un módulo para comenzar a trabajar."
            />

            <QuickActions actions={ACTIONS} onNavigate={navigate} />
        </div>
    )
}
