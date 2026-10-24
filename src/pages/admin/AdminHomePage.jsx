import { useAuth } from '../../context/AuthContext'
import { PageHeader } from '../../components/molecules/PageHeader'
import { QuickActions } from '../../components/organisms/QuickActions'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'

const ACTIONS = [
    {
        title: 'Gestión de Usuarios',
        description: 'Revisa los usuarios registrados en el sistema.',
        actionLabel: 'Ir a Usuarios',
        href: '/admin/usuarios'
    },
    {
        title: 'Catálogo y Stock',
        description: 'Administra los servicios y medicamentos disponibles.',
        actionLabel: 'Ver Catálogo',
        href: '/admin/catalogo'
    },
    {
        title: 'Reportes',
        description: 'Visualiza los reportes y métricas de la clínica.',
        actionLabel: 'Ver Reportes',
        href: '/admin/reportes'
    },
]

export function AdminHomePage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    usePageTitle('Panel de Administración')

    return (
        <div>
            <PageHeader
                title={`Bienvenido: ${user?.name ?? 'Administrador'}`}
                subtitle="Opciones de Administración de la Clínica"
            />

            <QuickActions actions={ACTIONS} onNavigate={navigate} />
        </div>
    )
}