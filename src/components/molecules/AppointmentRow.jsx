// Molécula: una fila de la tabla de citas.
// Los botones de acción solo aparecen si llegan los handlers por props.
// Molécula: una fila de la tabla de citas.
// Recibe la cita en el esquema real del servicio (fecha/hora/tipo/estado/duenoEmail)
// y la mascota ya resuelta por prop (nombre/especie). No consulta servicios.
// Los botones de acción solo aparecen si llegan los handlers por props.
import { TableCell } from '../atoms/TableCell'
import { Button } from '../atoms/Button'
import { SpeciesBadge } from '../atoms/SpeciesBadge'
import { AppointmentStatusBadge } from '../atoms/AppointmentStatusBadge'
import { formatDate } from '../../utils/formatDate'

export function AppointmentRow(props) {
    const appointment = props.appointment
    const pet = props.pet ?? props.mascota
    const hasActions = props.onConfirm || props.onReschedule || props.onCancel
    const status = appointment?.status ?? appointment?.estado
    const isClosed = status === 'cancelled' || status === 'cancelada'
    const petName = pet?.name ?? pet?.nombre ?? '—'
    const petSpecies = pet?.species ?? pet?.especie
    const appointmentType = appointment?.type ?? appointment?.tipo
    const appointmentDate = appointment?.date ?? appointment?.fecha
    const appointmentTime = appointment?.time ?? appointment?.hora

    return (
        <tr>
            {props.showOwner && <TableCell>{appointment?.duenoEmail}</TableCell>}
            <TableCell>
                {petName}{' '}
                {petSpecies && <SpeciesBadge species={petSpecies} />}
            </TableCell>
            <TableCell>{appointmentType}</TableCell>
            <TableCell>
                {formatDate(appointmentDate)} {appointmentTime}
            </TableCell>
            <TableCell>
                <AppointmentStatusBadge status={status} />
            </TableCell>
            {hasActions && (
                <TableCell className="text-nowrap">
                    {!isClosed && (
                        <div className="d-flex flex-wrap gap-1">
                            {status !== 'confirmed' && status !== 'confirmada' && (
                                <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => props.onConfirm(appointment.id)}
                                >
                                    Confirmar
                                </Button>
                            )}
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => props.onReschedule(appointment.id)}
                            >
                                Reagendar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => props.onCancel(appointment.id)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </TableCell>
            )}
        </tr>
    )
}