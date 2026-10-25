import { TableCell } from '../atoms/TableCell'
import { Button } from '../atoms/Button'
import { SpeciesBadge } from '../atoms/SpeciesBadge'
import { AppointmentStatusBadge } from '../atoms/AppointmentStatusBadge'
import { formatDate } from '../../utils/formatDate'

export function AppointmentRow(props) {
    const appointment = props.appointment
    const pet = props.pet ?? props.mascota
    const status = appointment?.status ?? appointment?.estado

    // Si el estado está cerrado, no mostramos acciones
    const isClosed = status === 'cancelled' || status === 'cancelada'
    const isConfirmed = status === 'confirmed' || status === 'confirmada'

    // Datos de la mascota
    const petName = pet?.name ?? pet?.nombre ?? appointment?.petName ?? '—'
    const petSpecies = pet?.species ?? pet?.especie ?? appointment?.petSpecies

    return (
        <tr>
            {/* Mostrar dueño solo si se pide explícitamente (útil para la vista del Vet) */}
            {props.showOwner && <TableCell>{appointment?.duenoEmail ?? appointment?.duenoName}</TableCell>}

            <TableCell>
                {petName}{' '}
                {petSpecies && <SpeciesBadge species={petSpecies} />}
            </TableCell>

            <TableCell>{appointment?.type ?? appointment?.tipo}</TableCell>

            <TableCell>
                {formatDate(appointment?.date ?? appointment?.fecha)} {appointment?.time ?? appointment?.hora}
            </TableCell>

            <TableCell>
                <AppointmentStatusBadge status={status} />
            </TableCell>

            {/* Columna de acciones (solo si hay handlers) */}
            {(props.onConfirm || props.onReschedule || props.onCancel || props.onAttend) && (
                <TableCell className="text-nowrap">
                    {isClosed ? (
                        <span className="text-muted">—</span>
                    ) : (
                        <div className="d-flex flex-wrap gap-1">
                            {/* Botón Confirmar */}
                            {props.onConfirm && !isConfirmed && (
                                <Button size="sm" variant="success" onClick={() => props.onConfirm(appointment.id)}>
                                    Confirmar
                                </Button>
                            )}

                            {/* Botón Atender (Exclusivo del Vet) */}
                            {props.onAttend && (
                                <Button size="sm" variant="outline-primary" onClick={() => props.onAttend(appointment)}>
                                    Atender
                                </Button>
                            )}

                            {/* Botón Reagendar */}
                            {props.onReschedule && (
                                <Button size="sm" variant="outline-primary" onClick={() => props.onReschedule(appointment)}>
                                    Reagendar
                                </Button>
                            )}

                            {/* Botón Cancelar */}
                            {props.onCancel && (
                                <Button size="sm" variant="outline-danger" onClick={() => props.onCancel(appointment.id)}>
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    )}
                </TableCell>
            )}
        </tr>
    )
}