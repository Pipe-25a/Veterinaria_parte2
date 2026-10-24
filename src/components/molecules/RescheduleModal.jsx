import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FormField } from './FormField'
import { Button } from '../atoms/Button'

export function RescheduleModal({ show, onHide, onConfirm, appointment }) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    // Cuando se abre el modal, precargamos la fecha y hora actual de la cita
    useEffect(() => {
        if (show && appointment) {
            setDate(appointment.date || '')
            setTime(appointment.time || '')
        }
    }, [show, appointment])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!date || !time) return
        onConfirm(appointment.id, date, time)
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Reagendar Cita</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <p className="text-muted mb-3">
                        Selecciona la nueva fecha y hora para la cita de <strong>{appointment?.petName}</strong>.
                    </p>
                    <FormField
                        id="reschedule-date"
                        label="Nueva fecha"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <FormField
                        id="reschedule-time"
                        label="Nueva hora"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}