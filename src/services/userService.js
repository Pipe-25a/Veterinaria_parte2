import { ROLES } from '../data/roles'

const USERS_KEY = 'users'

const SEED_USERS = [
  { name: 'Admin', email: 'admin@test.com', password: '123456', role: ROLES.ADMIN },
  { name: 'Veterinario', email: 'vet@test.com', password: '123456', role: ROLES.VET },
  { name: 'Dueño', email: 'dueno@test.com', password: '123456', role: ROLES.DUENO },
]

const loadRegistered = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const getAllUsers = () => [...SEED_USERS, ...loadRegistered()]

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

  const user = { name: name.trim(), email: cleanEmail, password, role: ROLES.DUENO }
  localStorage.setItem(USERS_KEY, JSON.stringify([...loadRegistered(), user]))
  return { ok: true, user }
}