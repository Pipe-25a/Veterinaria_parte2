import { useEffect, useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CrudSection } from '../../components/organisms/CrudSection'
import {getAllUsers,registerUser,updateUser,deleteUser,} from '../../services/userService'

const COLUMNS = [
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Correo' },
    { key: 'role', header: 'Rol' },
]

const FIELDS = [
    { name: 'name', label: 'Nombre', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
        name: 'role',
        label: 'Rol',
        required: true,
        options: [ 
            { value: 'dueno', label: 'Dueño' },
            { value: 'vet', label: 'Veterinario' },
            { value: 'admin', label: 'Administrador' },
        ]
    },
]

export function AdminUsersPage() {
    usePageTitle('Gestión de Usuarios')

    const [users, setUsers] = useState([])
    const [error, setError] = useState('')

    const refresh = () => setUsers(getAllUsers())

    useEffect(() => {
        refresh()
    }, [])

    const handleCreate = (formData) => {
        const result = registerUser({
            name: formData.name,
            email: formData.email,
            password: '123456',
        })
        if (!result.ok) {
            setError(result.error)
            return
        }
        if (formData.role && formData.role !== 'dueno') {
            updateUser(result.user.id, { role: formData.role })
        }
        setError('')
        refresh()
    }

    const handleUpdate = (id, formData) => {
        const result = updateUser(id, {
            name: formData.name,
            email: formData.email,
            role: formData.role,
        })
        if (!result.ok) {
            setError(result.error)
            return
        }
        setError('')
        refresh()
    }

    const handleDelete = (id) => {
        const result = deleteUser(id)
        if (!result.ok) {
            setError(result.error)
            return
        }
        setError('')
        refresh()
    }

    return (
        <CatalogTemplate title="Gestión de Usuarios" subtitle="Administra a los usuarios del sistema.">
            {error && <div className="alert alert-danger">{error}</div>}
            <CrudSection
                title="Tabla de Usuarios"
                columns={COLUMNS}
                rows={users}
                idKey="id"
                fields={FIELDS}
                actions={['create', 'edit', 'delete']}
                labels={{ create: 'Crear Usuario', edit: 'Editar Usuario' }}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </CatalogTemplate>
    )
}