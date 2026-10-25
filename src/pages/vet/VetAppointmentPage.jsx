import { useState, useEffect } from 'react'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Table } from '../../components/atoms/Tables'
import { Button } from '../../components/atoms/Button'
import { AppointmentStatusBadge } from '../../components/atoms/AppointmentStatusBadge'
import { Card, Alert } from 'react-bootstrap'
import { getAllAppointments, updateAppointmentStatus } from '../../services/appointmentService'
import { getPetById } from '../../services/petService'
import { sendToHistory } from '../../services/vetService'
import { formatDate } from '../../utils/formatDate'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useAuth } from '../../context/AuthContext'

export function VetAppointmentPage(props) {
    usePageTitle('Gestión de Citas')
    const { user } = useAuth()

    const [appointments, setAppointments] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [message, setMessage] = useState({ text: '', type: '' })

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.appointments, props.citas])

    const handleConfirm = (id) => {
        const r = updateAppointmentStatus(id, 'confirmed')
        if (!r.ok) {
            setMessage({ text: r.error, type: 'danger' })
            return
        }
        setMessage({ text: 'Cita confirmada.', type: 'success' })
        loadAppointments()
    }

    const handleCancel = (id) => {
        if (!window.confirm('¿Cancelar esta cita?')) return
        const r = updateAppointmentStatus(id, 'cancelled')
        if (!r.ok) {
            setMessage({ text: r.error, type: 'danger' })
            return
        }
        setMessage({ text: 'Cita cancelada.', type: 'success' })
        loadAppointments()
    }

    const handleAttend = (app) => {
        sendToHistory(
            {
                pet: app.pet?.name ?? '—',
                species: app.pet?.species ?? '',
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

    const filtered =
        statusFilter === 'all'
            ? appointments
            : appointments.filter((a) => a.status === statusFilter)

    const COLUMNS = [
        {
            key: 'pet',
            header: 'Mascota',
            render: (pet) => pet?.name ?? '—',
        },
        { key: 'duenoEmail', header: 'Dueño' },
        { key: 'type', header: 'Tipo' },
        {
            key: 'date',
            header: 'Fecha',
            render: (val, row) => `${formatDate(val)} ${row.time}`,
        },
        {
            key: 'status',
            header: 'Estado',
            render: (val) => <AppointmentStatusBadge status={val} />,
        },
        {
            key: 'actions',
            header: 'Acciones',
            render: (_, row) => {
                const isClosed = row.status === 'cancelled' || row.status === 'cancelada'
                if (isClosed) return <span className="text-muted">—</span>
                return (
                    <div className="d-flex flex-wrap gap-1">
                        {row.status !== 'confirmed' && (
                            <Button size="sm" variant="success" onClick={() => handleConfirm(row.id)}>
                                Confirmar
                            </Button>
                        )}
                        <Button size="sm" variant="outline-primary" onClick={() => handleAttend(row)}>
                            Atender
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleCancel(row.id)}>
                            Cancelar
                        </Button>
                    </div>
                )
            },
        },
    ]

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
                    <Table
                        columns={COLUMNS}
                        rows={filtered}
                        rowKey="id"
                        striped
                        hover
                        responsive
                        emptyText="No hay citas registradas."
                    />
                </Card.Body>
            </Card>
        </div>
    )
}