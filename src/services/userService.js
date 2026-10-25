import { ROLES } from '../data/roles'

const USERS_KEY = 'users'

const SEED_USERS = [
  { id: 'admin', name: 'Admin', email: 'admin@test.com', password: '123456', role: ROLES.ADMIN },
  { id: 'vet', name: 'Veterinario', email: 'vet@test.com', password: '123456', role: ROLES.VET },
  { id: 'dueno', name: 'Dueño', email: 'dueno@test.com', password: '123456', role: ROLES.DUENO },
]

const loadRegistered = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// 1. Agregamos "export" para que AdminUsersPage pueda usarla
export const getAllUsers = () => [...SEED_USERS, ...loadRegistered()]

export const findUser = (email, password) =>
  getAllUsers().find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  ) || null

export const registerUser = ({ name, email, password }) => {
  const cleanEmail = email.trim().toLowerCase()

  if (!name?.trim()) return { ok: false, error: 'El nombre es obligatorio' }
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail))
    return { ok: false, error: 'El correo no tiene un formato válido' }
  if (password.length < 6)
    return { ok: false, error: 'La contraseña debe tener mínimo 6 caracteres' }
  if (getAllUsers().some((u) => u.email === cleanEmail))
    return { ok: false, error: 'Ese correo ya está registrado' }

  // 2. Le asignamos un ID único al usuario (usando Date.now())
  const user = { id: Date.now().toString(), name: name.trim(), email: cleanEmail, password, role: ROLES.DUENO }

  localStorage.setItem(USERS_KEY, JSON.stringify([...loadRegistered(), user]))
  return { ok: true, user }
}

// 3. Función para que el Admin pueda actualizar
// src/services/userService.js
// ... al final, después de deleteUser

export const updateUser = (id, data) => {
  if (SEED_USERS.some((u) => u.id === id)) {
    return { ok: false, error: 'No puedes editar a los usuarios base del sistema.' }
  }

  // ✅ FIX: si el email viene vacío o solo con espacios, lo tratamos como "no cambiar"
  const cleanEmail = data.email?.trim().toLowerCase() || undefined

  if (cleanEmail && getAllUsers().some((u) => u.email === cleanEmail && u.id !== id)) {
    return { ok: false, error: 'Ese correo ya está en uso' }
  }

  const registered = loadRegistered().map((u) =>
    u.id === id
      ? {
        ...u,
        ...data,
        name: data.name?.trim() ?? u.name,
        email: cleanEmail ?? u.email, // ✅ Ahora si cleanEmail es undefined, mantiene el anterior
      }
      : u
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(registered))
  return { ok: true }
}

// 4. Función para que el Admin pueda borrar (protegiendo a los usuarios base)
export const deleteUser = (id) => {
  // Verificamos que no sea uno de los usuarios base del sistema
  if (SEED_USERS.some(u => u.id === id)) {
    return { ok: false, error: 'No puedes eliminar a los usuarios base del sistema.' }
  }

  // Filtramos para dejar a todos menos al que queremos borrar
  const registered = loadRegistered().filter(u => u.id !== id)
  localStorage.setItem(USERS_KEY, JSON.stringify(registered))
  return { ok: true }
}