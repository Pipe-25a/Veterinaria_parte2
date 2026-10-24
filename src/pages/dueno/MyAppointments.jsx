// src/pages/dueno/MisCitas.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Table } from '../../components/atoms/Tables'
import { AppointmentStatusBadge } from '../../components/atoms/AppointmentStatusBadge'
import { SpeciesBadge } from '../../components/atoms/SpeciesBadge'
import { Button } from '../../components/atoms/Button'
import { Text } from '../../components/atoms/Text'
import { formatDate } from '../../utils/formatDate'
import { RescheduleModal } from '../../components/molecules/RescheduleModal' // <-- NUEVO
import {
    getAppointmentsByDueno,
    updateAppointmentStatus,
    rescheduleAppointment, // <-- NUEVO
} from '../../services/appointmentService'
import { getPetById } from '../../services/petService'

export function MyAppointments() {
    usePageTitle('Mis Citas')

    const { user } = useAuth()
    const [appointments, setAppointments] = useState([])
    const [error, setError] = useState('')

    // Estados para el Modal de Reagendar
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleConfirm = (id) => {
        const result = updateAppointmentStatus(id, 'confirmed')
        if (!result.ok) {
            setError(result.error)
            return
        }
        setError('')
        refresh()
    }

    const handleCancel = (id) => {
        if (!window.confirm('¿Cancelar esta cita?')) return
        const result = updateAppointmentStatus(id, 'cancelled')
        if (!result.ok) {
            setError(result.error)
            return
        }
        setError('')
        refresh()
    }

    // --- Lógica para Reagendar ---
    const openReschedule = (app) => {
        setSelectedApp(app)
        setShowReschedule(true)
    }

    const handleRescheduleConfirm = (id, newDate, newTime) => {
        const result = rescheduleAppointment(id, newDate, newTime)
        if (!result.ok) {
            setError(result.error)
            return
        }
        setShowReschedule(false)
        setError('')
        refresh()
    }

    const COLUMNS = [
        {
            key: 'petName',
            header: 'Mascota',
            render: (value, row) => (
                <>
                    {value} {row.petSpecies && <SpeciesBadge species={row.petSpecies} />}
                </>
            ),
        },
        { key: 'type', header: 'Servicio' },
        {
            key: 'date',
            header: 'Fecha',
            render: (value, row) => `${formatDate(value)} ${row.time}`,
        },
        {
            key: 'status',
            header: 'Estado',
            render: (value) => <AppointmentStatusBadge status={value} />,
        },
        {
            key: 'actions',
            header: 'Acciones',
            render: (_, row) => {
                const isClosed = row.status === 'cancelled' || row.status === 'cancelada'
                const isConfirmed = row.status === 'confirmed' || row.status === 'confirmada'

                if (isClosed) {
                    return <Text as="span" tone="muted">—</Text>
                }

                return (
                    <div className="d-flex flex-wrap gap-1">
                        {!isConfirmed && (
                            <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleConfirm(row.id)}
                            >
                                Confirmar
                            </Button>
                        )}

                        {/* NUEVO BOTÓN REAGENDAR */}
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => openReschedule(row)}
                        >
                            Reagendar
                        </Button>

                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleCancel(row.id)}
                        >
                            Cancelar
                        </Button>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <PageHeader
                title="Mis Citas"
                subtitle="Historial de tus citas agendadas."
            />

            {error && <div className="alert alert-danger">{error}</div>}

            <Table
                columns={COLUMNS}
                rows={appointments}
                emptyText="Aún no tienes citas agendadas."
                striped
                hover
                responsive
            />

            {/* Modal de Reagendar */}
            <RescheduleModal
                show={showReschedule}
                onHide={() => setShowReschedule(false)}
                onConfirm={handleRescheduleConfirm}
                appointment={selectedApp}
            />
        </>
    )
}