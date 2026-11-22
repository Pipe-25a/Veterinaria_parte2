import { useEffect, useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CrudSection } from '../../components/organisms/CrudSection'
import { getAllUsers, getAllRoles, createUser, updateUser, deactivateUser } from '../../services/userService'
import { obtenerMensajeError } from '../../services/api'

// Definimos las columnas (incluimos el estado Activo y Rol)
const COLUMNS = [
    { key: 'username', header: 'Nombre' },
    { key: 'email', header: 'Correo' },
    { key: 'roleName', header: 'Rol' },
    { key: 'active', header: 'Estado', render: (val) => val ? 'Activo' : 'Inactivo' },
]

export function AdminUsersPage() {
    usePageTitle('Gestión de Usuarios')

    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        setLoading(true)
        try {
            const [usersData, rolesData] = await Promise.all([getAllUsers(), getAllRoles()])

            // Filtramos solo los que tienen active === true 
            const activeUsers = usersData.filter(u => u.active === true)

            // Cruzamos los usuarios activos con los roles para mostrar el nombre del rol
            const usersWithRoles = activeUsers.map(u => {
                const roleObj = rolesData.find(r => r.idRole === u.roleId)
                return {
                    ...u,
                    roleName: roleObj ? roleObj.name : 'Sin Rol'
                }
            })

            setUsers(usersWithRoles)
            setRoles(rolesData)
        } catch (err) {
            setError(obtenerMensajeError(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Generamos dinámicamente las opciones del Select de roles
    const FIELDS = [
        { name: 'username', label: 'Nombre de Usuario', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        {
            name: 'password',
            label: 'Contraseña (solo para crear)',
            type: 'password',
            required: false // Al editar no es obligatoria
        },
        {
            name: 'roleId',
            label: 'Rol',
            required: true,
            options: roles.map(r => ({ value: r.idRole, label: r.name }))
        },
    ]

    const handleCreate = async (formData) => {
        setError('')

        if (!formData.password || formData.password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.')
            return { ok: false }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('El correo electrónico no es válido. Ejemplo: usuario@dominio.com')
            return { ok: false }
        }

        // Buscamos el ID del rol CLIENTE por defecto
        const clienteRole = roles.find(r => r.name === 'CLIENTE')
        const finalRoleId = formData.roleId || (clienteRole ? clienteRole.idRole : null)

        try {
            await createUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                roleId: finalRoleId
            })
            setError('')
            loadData()
            return { ok: true }
        } catch (err) {
            setError(obtenerMensajeError(err))
            return { ok: false }
        }
    }

    const handleUpdate = async (id, formData) => {
        setError('')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('El correo electrónico no es válido. Ejemplo: usuario@dominio.com')
            return { ok: false }
        }

        // Si por alguna razón el rol viene vacío en la edición, forzamos CLIENTE
        const clienteRole = roles.find(r => r.name === 'CLIENTE')
        const finalRoleId = formData.roleId || (clienteRole ? clienteRole.idRole : null)

        try {
            await updateUser(id, {
                username: formData.username,
                email: formData.email,
                roleId: finalRoleId
            })
            setError('')
            loadData()
            return { ok: true }
        } catch (err) {
            setError(obtenerMensajeError(err))
            return { ok: false }
        }
    }

    const handleDelete = async (id) => {
        try {
            await deactivateUser(id)
            setError('')
            loadData() // Al recargar, el usuario desactivado ya no pasará el filtro
            return { ok: true }
        } catch (err) {
            setError(obtenerMensajeError(err))
            return { ok: false }
        }
    }

    return (
        <CatalogTemplate title="Gestión de Usuarios" subtitle="Administra a los usuarios del sistema.">

            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <CrudSection
                    title="Tabla de Usuarios"
                    columns={COLUMNS}
                    rows={users}
                    idKey="idUser"
                    fields={FIELDS}
                    actions={['create', 'edit', 'delete']}
                    labels={{ create: 'Crear Usuario', edit: 'Editar Usuario' }}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    error={error}
                />
            )}
        </CatalogTemplate>
    )
}