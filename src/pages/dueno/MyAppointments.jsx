import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Table } from '../../components/atoms/Tables'
import { RescheduleModal } from '../../components/molecules/RescheduleModal'
import { AppointmentRow } from '../../components/molecules/AppointmentRow'
import { ConfirmModal } from '../../components/molecules/ConfirmModal' // <-- IMPORTAMOS
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

    // --- ESTADOS PARA EL MODAL DE CANCELACIÓN ---
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [appToCancel, setAppToCancel] = useState(null)

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

    // --- NUEVA LÓGICA DE CANCELACIÓN CON MODAL ---
    const handleCancelClick = (id) => {
        setAppToCancel(id)
        setShowCancelModal(true)
    }

    const confirmCancel = () => {
        if (appToCancel) {
            const result = updateAppointmentStatus(appToCancel, 'cancelled')
            if (!result.ok) {
                setError(result.error)
            } else {
                setError('')
                refresh()
            }
        }
        setShowCancelModal(false)
        setAppToCancel(null)
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
                                onReschedule={openReschedule}
                                onCancel={handleCancelClick} // <-- Ahora llama a handleCancelClick
                            />
                        ))
                    )}
                </tbody>
            </Table>

            {/* Modal de Reagendar */}
            <RescheduleModal
                show={showReschedule}
                onHide={() => setShowReschedule(false)}
                onConfirm={handleRescheduleConfirm}
                appointment={selectedApp}
            />

            {/* NUEVO Modal de Cancelar (Reutilizando el componente con Props) */}
            <ConfirmModal
                show={showCancelModal}
                onHide={() => setShowCancelModal(false)}
                onConfirm={confirmCancel}
                title="Cancelar Cita"
                message="¿Estás seguro de que deseas cancelar esta cita? El horario quedará libre."
                variant="warning"
                confirmText="Sí, cancelar"
            />
        </>
    )
}