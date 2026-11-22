export const ROLES = { ADMIN: 'admin', VET: 'vet', DUENO: 'dueno' }
export const ROLE_HOME = { admin: '/admin', vet: '/vet', dueno: '/dueno' }

const BACKEND_TO_FRONTEND = {
  ADMIN: 'admin',
  VETERINARIO: 'vet',
  CLIENTE: 'dueno',
}

export function normalizeRole(raw) {
  if (!raw) return null
  return BACKEND_TO_FRONTEND[raw] ?? raw.toLowerCase()
}