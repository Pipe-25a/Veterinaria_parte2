import appointmentsMock from '../data/appointments.json'
import { getPetById } from './petService'

const KEY = 'appointments'

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  RESCHEDULED: 'rescheduled',
  CANCELLED: 'cancelled',
}

// Compatibilidad con código previo
export const ESTADOS = {
  PENDIENTE: 'pending',
  CONFIRMADA: 'confirmed',
  REAGENDADA: 'rescheduled',
  CANCELADA: 'cancelled',
}

const migrateLegacyVetAppointments = () => {
  const legacy = localStorage.getItem('vet_appointments')
  if (!legacy) return
  try {
    const old = JSON.parse(legacy)
    if (!Array.isArray(old)) return

    const current = readAppointments()
    const existingIds = new Set(current.map((a) => a.id))

    const migrated = old
      .map(normalizeAppointment)
      .filter((a) => a && !existingIds.has(a.id))

    if (migrated.length > 0) {
      saveAppointments([...current, ...migrated])
    }
    // Borramos la key legacy para no volver a migrar
    localStorage.removeItem('vet_appointments')
  } catch {
    localStorage.removeItem('vet_appointments')
  }
}

migrateLegacyVetAppointments()

const readAppointments = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('citas'))
    return Array.isArray(saved) ? saved : appointmentsMock
  } catch {
    return appointmentsMock
  }
}

const saveAppointments = (appointments) =>
  localStorage.setItem(KEY, JSON.stringify(appointments))

export const getAppointmentsByDueno = (email) =>
  readAppointments().filter((appointment) => appointment.duenoEmail === email)

export const bookAppointment = (data) => {
  const duenoEmail = data.duenoEmail
  const petId = data.petId ?? data.mascotaId
  const date = data.date ?? data.fecha
  const time = data.time ?? data.hora
  const type = data.type ?? data.tipo

  if (!duenoEmail) return { ok: false, error: 'Sesión no válida' }
  if (!petId || !date || !time || !type)
    return { ok: false, error: 'Completa todos los campos' }
  if (!getPetById(petId))
    return { ok: false, error: 'Mascota no encontrada' }

  const appointments = readAppointments()
  const isOccupied = appointments.some((app) => {
    const appDate = app.date ?? app.fecha
    const appTime = app.time ?? app.hora
    const appStatus = app.status ?? app.estado
    return (
      appDate === date &&
      appTime === time &&
      appStatus !== APPOINTMENT_STATUS.CANCELLED &&
      appStatus !== 'cancelada'
    )
  })
  if (isOccupied) return { ok: false, error: 'Ese horario ya está ocupado' }

  const newAppointment = {
    id: Date.now(),
    duenoEmail,
    petId: Number(petId),
    date,
    time,
    type,
    status: APPOINTMENT_STATUS.PENDING,
  }
  saveAppointments([...appointments, newAppointment])
  return { ok: true, appointment: newAppointment, cita: newAppointment }
}

export const updateAppointmentStatus = (id, newStatus) => {
  const appointments = readAppointments()
  const index = appointments.findIndex((app) => app.id === id)
  if (index === -1) return { ok: false, error: 'Cita no encontrada' }
  appointments[index] = { ...appointments[index], status: newStatus }
  saveAppointments(appointments)
  return { ok: true, appointment: appointments[index], cita: appointments[index] }
}

// función específica para reagendar (cambia fecha, hora y estado)
export const rescheduleAppointment = (id, newDate, newTime) => {
  const appointments = readAppointments()
  const index = appointments.findIndex((app) => app.id === id)

  if (index === -1) return { ok: false, error: 'Cita no encontrada' }

  // Actualizamos la fecha, hora y el estado
  appointments[index] = {
    ...appointments[index],
    date: newDate,
    time: newTime,
    status: APPOINTMENT_STATUS.RESCHEDULED // o 'rescheduled'
  }

  saveAppointments(appointments)
  return { ok: true, appointment: appointments[index] }
}

export const getAllAppointments = () => {
  const appointments = readAppointments()
  // Las ordenamos por fecha y hora
  return appointments.sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
  )
}

export const normalizeAppointment = (raw) => {
  if (!raw || typeof raw !== 'object') return null

  // 1. Resolver petId: si viene petId/mascotaId → usar; si viene pet/petName → buscar por nombre
  let petId = raw.petId ?? raw.mascotaId
  if (!petId && (raw.pet || raw.petName)) {
    const petName = String(raw.pet ?? raw.petName).trim().toLowerCase()
    const pets = readPetsSafe() // helper abajo
    const found = pets.find(
      (p) => (p.name || p.nombre || '').toLowerCase() === petName
    )
    if (found) petId = found.id
  }

  return {
    id: raw.id,
    duenoEmail: raw.duenoEmail ?? raw.duenoName ?? raw.nombreDueno ?? '',
    petId: petId ?? null,
    date: raw.date ?? raw.fecha ?? '',
    time: raw.time ?? raw.hora ?? '',
    type: raw.type ?? raw.tipo ?? '',
    status: normalizeStatus(raw.status ?? raw.estado),
    reason: raw.reason ?? raw.motivo ?? '',
  }
}

const normalizeStatus = (status) => {
  const map = {
    pendiente: APPOINTMENT_STATUS.PENDING,
    confirmada: APPOINTMENT_STATUS.CONFIRMED,
    reagendada: APPOINTMENT_STATUS.RESCHEDULED,
    cancelada: APPOINTMENT_STATUS.CANCELLED,
  }
  return map[status] ?? status ?? APPOINTMENT_STATUS.PENDING
}

// Import para evitar dependencia circular con petService
const readPetsSafe = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('pets') || localStorage.getItem('mascotas'))
    if (Array.isArray(saved)) return saved
  } catch { /* noop */ }
  return []
}