import { useState, useEffect } from 'react'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Button } from '../../components/atoms/Button'
import { Table } from '../../components/atoms/Tables'
import { getVetRecords, getVetHistory } from '../../services/vetService'
import { getAllAppointments } from '../../services/appointmentService'
import { getPetById } from '../../services/petService'
import { ATTENTION_PRICES } from '../../data/vetData'
import { usePageTitle } from '../../hooks/usePageTitle'
import { Card, Row, Col } from 'react-bootstrap'

export function VetReportsPage() {
    usePageTitle('Reportes')

    const [appointments, setAppointments] = useState([])
    const [records, setRecords] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        const real = getAllAppointments().map((app) => ({
            ...app,
            pet: getPetById(app.petId),
        }))
        setAppointments(real)
        setRecords(getVetRecords())
        setHistory(getVetHistory())
    }, [])

    const attentionCount = history.length
    const speciesSet = new Set(records.map((r) => r.species))

    // 1. Atenciones por tipo
    const byType = {}
    history.forEach((r) => {
        byType[r.type] = (byType[r.type] || 0) + 1
    })

    let totalCount = 0
    let totalIncome = 0

    const typeRows = Object.keys(byType).map((type) => {
        const count = byType[type]
        const price = ATTENTION_PRICES[type] || 15000
        const income = count * price
        totalCount += count
        totalIncome += income
        return { type, count, income: `$${income.toLocaleString('es-CL')}` }
    })

    const TYPE_COLUMNS = [
        { key: 'type', header: 'Tipo de atención' },
        { key: 'count', header: 'Cantidad' },
        { key: 'income', header: 'Ingreso estimado' },
    ]

    // 2. Especies atendidas
    const bySpecies = {}
    history.forEach((r) => {
        bySpecies[r.species] = (bySpecies[r.species] || 0) + 1
    })

    const speciesRows = Object.keys(bySpecies).map((species) => ({
        species,
        count: bySpecies[species],
    }))

    const SPECIES_COLUMNS = [
        { key: 'species', header: 'Especie' },
        { key: 'count', header: 'Cantidad de atenciones' },
    ]

    // 3. Próximas citas (datos reales)
    const upcoming = appointments
        .filter((c) => c.status !== 'cancelled' && c.status !== 'confirmed')
        .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
        .slice(0, 10)
        .map((c) => ({
            id: c.id,
            pet: c.pet?.name || '—',
            duenoName: c.duenoEmail,
            type: c.type,
            date: c.date,
            time: c.time,
            status: c.status === 'pending' ? 'Pendiente' : 'Confirmada',
        }))

    const UPCOMING_COLUMNS = [
        { key: 'pet', header: 'Mascota' },
        { key: 'duenoName', header: 'Dueño' },
        { key: 'type', header: 'Tipo' },
        { key: 'date', header: 'Fecha' },
        { key: 'time', header: 'Hora' },
        {
            key: 'status',
            header: 'Estado',
            render: (val) => {
                const map = { Pendiente: 'warning', Confirmada: 'primary' }
                return <span className={`badge bg-${map[val] || 'secondary'}`}>{val}</span>
            },
        },
    ]

    return (
        <div>
            <PageHeader title="Reportes" subtitle="Estadísticas de atención, especies e ingresos del consultorio." />

            <Row className="mb-4 g-3 text-center">
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-primary mb-1">{appointments.length}</h2>
                            <p className="text-muted m-0 small fw-semibold">Citas totales</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-success mb-1">{attentionCount}</h2>
                            <p className="text-muted m-0 small fw-semibold">Atenciones realizadas</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-info mb-1">{records.length}</h2>
                            <p className="text-muted m-0 small fw-semibold">Fichas clínicas</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-warning mb-1">{speciesSet.size}</h2>
                            <p className="text-muted m-0 small fw-semibold">Especies distintas</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Atenciones por tipo</Card.Title>
                    <Table columns={TYPE_COLUMNS} rows={typeRows} rowKey="type" striped hover responsive emptyText="No hay atenciones registradas." />
                    {typeRows.length > 0 && (
                        <div className="d-flex justify-content-between fw-bold p-2 bg-light border-top">
                            <span>Total</span>
                            <span>{totalCount} atenciones</span>
                            <span>${totalIncome.toLocaleString('es-CL')}</span>
                        </div>
                    )}
                </Card.Body>
            </Card>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Especies atendidas</Card.Title>
                    <Table columns={SPECIES_COLUMNS} rows={speciesRows} rowKey="species" striped hover responsive emptyText="No hay datos de especies." />
                </Card.Body>
            </Card>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Próximas citas</Card.Title>
                    <Table columns={UPCOMING_COLUMNS} rows={upcoming} rowKey="id" striped hover responsive emptyText="No hay citas próximas." />
                </Card.Body>
            </Card>

            <Button variant="dark" onClick={() => window.print()} className="mb-4">
                Exportar reporte a impresión
            </Button>
        </div>
    )
}