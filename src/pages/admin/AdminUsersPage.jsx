import { useTituloPagina } from '../../hooks/useTituloPagina'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CrudSection } from '../../components/organisms/CrudSection'
import { useStoredList } from '../../hooks/useStoredList'
import { getAllUsers, deleteUser } from '../../services/userService' // Usamos tu servicio

const COLUMNS = [
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Correo' },
    { key: 'role', header: 'Rol' },
]

const FIELDS = [
    { name: 'name', label: 'Nombre', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Rol', required: true }, // Aquí podrías usar el Select
]

export function AdminUsersPage() {
    useTituloPagina('Gestión de Usuarios')

    // Nota: Aquí idealmente usarías un getAllUsers en tiempo real. 
    // Como usamos el hook, le pasamos los usuarios base.
    const users = useStoredList('admin_users', getAllUsers(), 'id')

    return (
        <CatalogTemplate title="Gestión de Usuarios" subtitle="Administra a los usuarios del sistema.">
            <CrudSection
                title="Tabla de Usuarios"
                columns={COLUMNS}
                rows={users.items}
                idKey="id"
                fields={FIELDS}
                actions={['create', 'edit', 'delete']}
                labels={{ create: 'Crear Usuario', edit: 'Editar Usuario' }}
                onCreate={users.add}
                onUpdate={users.update}
                onDelete={users.remove}
            />
        </CatalogTemplate>
    )
}