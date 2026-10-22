// Molécula: una fila de la tabla de citas.
// Los botones de acción solo aparecen si llegan los handlers por props.
import TableCell from '../atoms/TableCell'
import { Button } from '../atoms/Button'
import SpeciesBadge from '../atoms/SpeciesBadge'
import AppointmentStatusBadge from '../atoms/AppointmentStatusBadge'
import { formatDate } from '../../utils/format'

function AppointmentRow(props) {
    const appointment = props.appointment
    const hasActions = props.onConfirm || props.onReschedule || props.onCancel
    const isClosed = appointment.status === 'cancelled'

    return (
        <tr>
            {props.showOwner && <TableCell>{appointment.ownerName}</TableCell>}
            <TableCell>
                {appointment.petName} <SpeciesBadge species={appointment.species} />
            </TableCell>
            <TableCell>{props.serviceName}</TableCell>
            <TableCell>
                {formatDate(appointment.date)} {appointment.time}
            </TableCell>
            <TableCell>
                <AppointmentStatusBadge status={appointment.status} />
            </TableCell>
            {hasActions && (
                <TableCell className="text-nowrap">
                    {!isClosed && (
                        <div className="d-flex flex-wrap gap-1">
                            {appointment.status !== 'confirmed' && (
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

export default AppointmentRow