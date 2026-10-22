import citasMock from '../data/citas.json'
import { getMascotaById } from './mascotaService'

const KEY = 'citas'

export const ESTADOS = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  REAGENDADA: 'reagendada',
  CANCELADA: 'cancelada',
}

const leerCitas = () => {
  try {
    const guardadas = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(guardadas) ? guardadas : citasMock
  } catch {
    return citasMock
  }
}
const guardarCitas = (citas) => localStorage.setItem(KEY, JSON.stringify(citas))

export const getCitasByDueno = (email) =>
  leerCitas().filter((c) => c.duenoEmail === email)

export const agendarCita = (data) => {
  if (!data.duenoEmail) return { ok: false, error: 'Sesión no válida' }
  if (!data.mascotaId || !data.fecha || !data.hora || !data.tipo)
    return { ok: false, error: 'Completa todos los campos' }
  if (!getMascotaById(data.mascotaId))
    return { ok: false, error: 'Mascota no encontrada' }

  const citas = leerCitas()
  const ocupada = citas.some(
    (c) => c.fecha === data.fecha && c.hora === data.hora && c.estado !== ESTADOS.CANCELADA
  )
  if (ocupada) return { ok: false, error: 'Ese horario ya está ocupado' }

  const nueva = {
    id: Date.now(),
    duenoEmail: data.duenoEmail,
    mascotaId: Number(data.mascotaId),
    fecha: data.fecha,
    hora: data.hora,
    tipo: data.tipo,
    estado: ESTADOS.PENDIENTE,
  }
  guardarCitas([...citas, nueva])
  return { ok: true, cita: nueva }
}

export const actualizarEstadoCita = (id, nuevoEstado) => {
  const citas = leerCitas()
  const idx = citas.findIndex((c) => c.id === id)
  if (idx === -1) return { ok: false, error: 'Cita no encontrada' }
  citas[idx] = { ...citas[idx], estado: nuevoEstado }
  guardarCitas(citas)
  return { ok: true, cita: citas[idx] }
}