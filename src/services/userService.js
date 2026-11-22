import { api } from './api'

// Obtener todos los usuarios
export async function getAllUsers() {
  const { data } = await api.get('/users')
  return data
}

// Obtener todos los roles (para el select del formulario)
export async function getAllRoles() {
  const { data } = await api.get('/roles')
  return data
}

// Crear un usuario nuevo (POST)
export async function createUser({ username, email, password, roleId }) {
  const { data } = await api.post('/users', { username, email, password, roleId, active: true })
  return data
}

// Actualizar un usuario (PUT)
export async function updateUser(id, { username, email, roleId }) {
  // Ojo: si no mandamos password, el backend solo actualiza los otros campos
  const { data } = await api.put(`/users/${id}`, { username, email, roleId })
  return data
}

// Desactivar un usuario (El profe pidió "eliminar o desactivar", y el backend recomienda desactivar)
export async function deactivateUser(id) {
  const { data } = await api.patch(`/users/${id}/desactivar`)
  return data
}