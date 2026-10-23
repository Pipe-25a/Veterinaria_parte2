// Molécula: una fila de la tabla de citas.
// Los botones de acción solo aparecen si llegan los handlers por props.
// Molécula: una fila de la tabla de citas.
// Recibe la cita en el esquema real del servicio (fecha/hora/tipo/estado/duenoEmail)
// y la mascota ya resuelta por prop (nombre/especie). No consulta servicios.
// Los botones de acción solo aparecen si llegan los handlers por props.
import TableCell from '../atoms/TableCell'
import { Button } from '../atoms/Button'
import SpeciesBadge from '../atoms/SpeciesBadge'
import AppointmentStatusBadge from '../atoms/AppointmentStatusBadge'
import { formatDate } from '../../utils/format'

function AppointmentRow(props) {
    const cita = props.appointment
    const mascota = props.mascota //  llega por prop; puede ser null
    const hasActions = props.onConfirm || props.onReschedule || props.onCancel
    const isClosed = cita.estado === 'cancelada' //  estado real

    return (
        <tr>
            {props.showOwner && <TableCell>{cita.duenoEmail}</TableCell>}
            <TableCell>
                {mascota?.nombre ?? '—'}{' '}
                {mascota?.especie && <SpeciesBadge species={mascota.especie} />}
            </TableCell>
            <TableCell>{cita.tipo}</TableCell>
            <TableCell>
                {formatDate(cita.fecha)} {cita.hora}
            </TableCell>
            <TableCell>
                <AppointmentStatusBadge status={cita.estado} />
            </TableCell>
            {hasActions && (
                <TableCell className="text-nowrap">
                    {!isClosed && (
                        <div className="d-flex flex-wrap gap-1">
                            {cita.estado !== 'confirmada' && (
                                <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => props.onConfirm(cita.id)}
                                >
                                    Confirmar
                                </Button>
                            )}
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => props.onReschedule(cita.id)}
                            >
                                Reagendar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => props.onCancel(cita.id)}
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