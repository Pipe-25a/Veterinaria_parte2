import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Table } from '../../components/atoms/Tables'
import { Button } from '../../components/atoms/Button'
import { Text } from '../../components/atoms/Text'
import { RescheduleModal } from '../../components/molecules/RescheduleModal'
import { AppointmentRow } from '../../components/molecules/AppointmentRow'
import {
    getAppointmentsByDueno,
    updateAppointmentStatus,
    rescheduleAppointment,
} from '../../services/appointmentService'
import { getPetById } from '../../services/petService'

export function MyAppointments() {
    usePageTitle('Mis Citas')

    const { user } = useAuth()
    const [appointments, setAppointments] = useState([])
    const [error, setError] = useState('')

    const [showReschedule, setShowReschedule] = useState(false)
    const [selectedApp, setSelectedApp] = useState(null)

    const refresh = () => {
        const list = getAppointmentsByDueno(user.email)
        const enriched = list.map((app) => {
            const pet = getPetById(app.petId)
            return {
                ...app,
                petName: pet?.name ?? pet?.nombre ?? '—',
                petSpecies: pet?.species ?? pet?.especie ?? '',
            }
        })
        enriched.sort((a, b) =>
            `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
        )
        setAppointments(enriched)
    }

    useEffect(() => {
        refresh()
    }, [])

    const handleConfirm = (id) => {
        const result = updateAppointmentStatus(id, 'confirmed')
        if (!result.ok) return setError(result.error)
        setError('')
        refresh()
    }

    const handleCancel = (id) => {
        if (!window.confirm('¿Cancelar esta cita?')) return
        const result = updateAppointmentStatus(id, 'cancelled')
        if (!result.ok) return setError(result.error)
        setError('')
        refresh()
    }

    const openReschedule = (app) => {
        setSelectedApp(app)
        setShowReschedule(true)
    }

    const handleRescheduleConfirm = (id, newDate, newTime) => {
        const result = rescheduleAppointment(id, newDate, newTime)
        if (!result.ok) return setError(result.error)
        setShowReschedule(false)
        setError('')
        refresh()
    }

    return (
        <>
            <PageHeader title="Mis Citas" subtitle="Historial de tus citas agendadas." />

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Tabla controlada con children y AppointmentRow */}
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Mascota</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-body-secondary py-4">
                                Aún no tienes citas agendadas.
                            </td>
                        </tr>
                    ) : (
                        appointments.map((app) => (
                            <AppointmentRow
                                key={app.id}
                                appointment={app}
                                pet={getPetById(app.petId)}
                                onConfirm={handleConfirm}
                                onReschedule={openReschedule} /* Nota: le pasamos el objeto, no el id */
                                onCancel={handleCancel}
                            />
                        ))
                    )}
                </tbody>
            </Table>

            <RescheduleModal
                show={showReschedule}
                onHide={() => setShowReschedule(false)}
                onConfirm={handleRescheduleConfirm}
                appointment={selectedApp}
            />
        </>
    )
}