const STATUS = {
  pending: { text: 'Pendiente', color: 'warning' },
  confirmed: { text: 'Confirmada', color: 'success' },
  rescheduled: { text: 'Reagendada', color: 'info' },
  cancelled: { text: 'Cancelada', color: 'secondary' },
}

export function AppointmentStatusBadge(props) {
  const info = STATUS[props.status] || STATUS.pending
  return <span className={`badge text-bg-${info.color}`}>{info.text}</span>
}
