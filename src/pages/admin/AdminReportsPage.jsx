import { usePageTitle } from '../../hooks/usePageTitle'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CrudSection } from '../../components/organisms/CrudSection'
import { useStoredList } from '../../hooks/useStoredList'
import { adminReports } from '../../data/adminReports'
import { formatDate } from '../../utils/formatDate'
import { getAllUsers, deleteUser } from '../../services/userService' 

const COLUMNS = [
    { key: 'name', header: 'Nombre del Reporte' },
    { key: 'createdAt', header: 'Fecha', render: (val) => formatDate(val) },
    { key: 'description', header: 'Descripción' },
    { key: 'reportedBy', header: 'Reportado por' },
]

const FIELDS = [
    { name: 'name', label: 'Nombre del Reporte', required: true },
    { name: 'createdAt', label: 'Fecha de Creación', type: 'date', required: true },
    { name: 'description', label: 'Descripción', required: true },
    { name: 'reportedBy', label: 'Reportado por', required: true },
]

export function AdminReportsPage() {
    usePageTitle('Reportes')
    const reports = useStoredList('admin_reports', adminReports, 'id')

    return (
        <CatalogTemplate title="Reportes" subtitle="Visualiza y gestiona los reportes de la clínica.">
            <CrudSection
                title="Tabla de Reportes"
                columns={COLUMNS}
                rows={reports.items}
                idKey="id"
                fields={FIELDS}
                actions={['create', 'edit', 'delete']}
                labels={{ create: 'Crear Reporte', edit: 'Actualizar Reporte' }}
                onCreate={reports.add}
                onUpdate={reports.update}
                onDelete={reports.remove}
            />
        </CatalogTemplate>
    )
}