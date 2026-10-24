const STATUS = {
  pendiente: { text: 'Pendiente', color: 'warning' },
  confirmada: { text: 'Confirmada', color: 'success' },
  reagendada: { text: 'Reagendada', color: 'info' },
  cancelada: { text: 'Cancelada', color: 'secondary' },
}

export function AppointmentStatusBadge(props) {
  const info = STATUS[props.status] || STATUS.pendiente
  return <span className={`badge text-bg-${info.color}`}>{info.text}</span>
}
