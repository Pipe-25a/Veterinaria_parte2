import { useState, useEffect } from 'react'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Table } from '../../components/atoms/Tables'
import { Card, Alert } from 'react-bootstrap'
import { AppointmentRow } from '../../components/molecules/AppointmentRow'
import { ConfirmModal } from '../../components/molecules/ConfirmModal' // <-- NUEVO IMPORT
import { getAllAppointments, updateAppointmentStatus } from '../../services/appointmentService'
import { getPetById } from '../../services/petService'
import { sendToHistory } from '../../services/vetService'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useAuth } from '../../context/AuthContext'

export function VetAppointmentPage(props) {
    usePageTitle('Gestión de Citas')
    const { user } = useAuth()

    const [appointments, setAppointments] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [message, setMessage] = useState({ text: '', type: '' })

    // --- NUEVOS ESTADOS PARA EL MODAL DE CANCELACIÓN ---
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [appToCancel, setAppToCancel] = useState(null)

    const loadAppointments = () => {
        if (props.appointments || props.citas) {
            setAppointments(props.appointments || props.citas)
            return
        }
        const raw = getAllAppointments()
        setAppointments(raw.map((app) => ({ ...app, pet: getPetById(app.petId) })))
    }

    useEffect(() => {
        loadAppointments()
    }, [props.appointments, props.citas])

    const handleConfirm = (id) => {
        const r = updateAppointmentStatus(id, 'confirmed')
        if (!r.ok) return setMessage({ text: r.error, type: 'danger' })
        setMessage({ text: 'Cita confirmada.', type: 'success' })
        loadAppointments()
    }

    // --- NUEVA LÓGICA DE CANCELACIÓN ---
    const handleCancelClick = (id) => {
        setAppToCancel(id)
        setShowCancelModal(true)
    }

    const confirmCancel = () => {
        if (appToCancel) {
            const r = updateAppointmentStatus(appToCancel, 'cancelled')
            if (!r.ok) {
                setMessage({ text: r.error, type: 'danger' })
            } else {
                setMessage({ text: 'Cita cancelada.', type: 'success' })
                loadAppointments()
            }
        }
        setShowCancelModal(false)
        setAppToCancel(null)
    }

    const handleAttend = (app) => {
        // Traducimos especie (inglés a español) si viene del flujo del dueño
        const speciesMap = {
            dog: 'Perro',
            cat: 'Gato',
            rabbit: 'Conejo',
            bird: 'Ave',
            turtle: 'Tortuga',
            others: 'Otro'
        }
        const rawSpecies = app.pet?.species ?? ''
        const speciesEs = speciesMap[rawSpecies.toLowerCase()] || rawSpecies

        sendToHistory(
            {
                pet: app.pet?.name ?? '—',
                species: speciesEs, // Usamos la traducida
                duenoName: app.duenoEmail,
                type: app.type,
                date: app.date,
            },
            user?.name
        )
        updateAppointmentStatus(app.id, 'confirmed')
        setMessage({ text: 'Cita enviada al historial.', type: 'success' })
        loadAppointments()
    }

    const filtered = statusFilter === 'all'
        ? appointments
        : appointments.filter((a) => a.status === statusFilter)

    return (
        <div>
            <PageHeader
                title={props.title ?? 'Agenda Médica'}
                subtitle={props.subtitle ?? 'Citas agendadas por los dueños.'}
            />
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <Card.Title className="h5 m-0">Citas registradas</Card.Title>
                        <select
                            className="form-select form-select-sm w-auto"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="pending">Pendiente</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="rescheduled">Reagendada</option>
                            <option value="cancelled">Cancelada</option>
                        </select>
                    </div>

                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Dueño</th>
                                <th>Mascota</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-body-secondary py-4">
                                        No hay citas registradas.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((app) => (
                                    <AppointmentRow
                                        key={app.id}
                                        appointment={app}
                                        pet={app.pet}
                                        showOwner={true}
                                        onConfirm={handleConfirm}
                                        onAttend={handleAttend}
                                        onCancel={handleCancelClick} // <-- Ahora abre el Modal
                                    />
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* --- NUEVO MODAL DE CANCELAR (Usando props) --- */}
            <ConfirmModal
                show={showCancelModal}
                onHide={() => setShowCancelModal(false)}
                onConfirm={confirmCancel}
                title="Cancelar Cita"
                message="¿Estás seguro de que deseas cancelar la cita de este paciente? El horario quedará libre."
                variant="warning"
                confirmText="Sí, cancelar cita"
            />
        </div>
    )
}