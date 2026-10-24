import { Badge } from './Badge'

// El mapa de estados se mantiene en español y con los mismos textos.
// Solo cambiamos "color" (que era una clase suelta de Bootstrap) por "tone"
// (que es lo que entiende el átomo Badge).
const STATUS = {
  pending: { text: 'Pendiente', tone: 'warning' },
  confirmed: { text: 'Confirmada', tone: 'success' },
  rescheduled: { text: 'Reagendada', tone: 'info' },
  cancelled: { text: 'Cancelada', tone: 'neutral' }, // antes 'secondary'
}

export function AppointmentStatusBadge(props) {
  const info = STATUS[props.status] || STATUS.pending
  return <Badge tone={info.tone}>{info.text}</Badge>
}