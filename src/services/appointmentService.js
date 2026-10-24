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
