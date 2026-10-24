import { useState, useEffect } from 'react'
import { PageHeader } from '../../components/molecules/PageHeader'
import { Button } from '../../components/atoms/Button'
import { Table } from '../../components/atoms/Tables'
import { getVetCitas, getVetFichas, getVetHistorial } from '../../services/vetService'
import { PRECIOS_ATENCION } from '../../data/vetData'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { Card, Row, Col } from 'react-bootstrap'

export default function VetReportesPage() {
    useTituloPagina('Reportes')

    const [citas, setCitas] = useState([])
    const [fichas, setFichas] = useState([])
    const [historial, setHistorial] = useState([])

    useEffect(() => {
        setCitas(getVetCitas())
        setFichas(getVetFichas())
        setHistorial(getVetHistorial())
    }, [])

    const atencionesCount = historial.length
    const especiesSet = new Set(fichas.map((f) => f.especie))

    // 1. Atenciones por tipo
    const porTipo = {}
    historial.forEach((r) => {
        porTipo[r.tipo] = (porTipo[r.tipo] || 0) + 1
    })

    let totalCantidad = 0
    let totalIngresos = 0

    const tiposRows = Object.keys(porTipo).map((tipo) => {
        const cantidad = porTipo[tipo]
        const precio = PRECIOS_ATENCION[tipo] || 15000
        const ingreso = cantidad * precio
        totalCantidad += cantidad
        totalIngresos += ingreso
        return {
            tipo,
            cantidad,
            ingreso: `$${ingreso.toLocaleString('es-CL')}`
        }
    })

    const TIPOS_COLUMNS = [
        { key: 'tipo', header: 'Tipo de atención' },
        { key: 'cantidad', header: 'Cantidad' },
        { key: 'ingreso', header: 'Ingreso estimado' }
    ]

    // 2. Especies atendidas
    const porEspecie = {}
    historial.forEach((r) => {
        porEspecie[r.especie] = (porEspecie[r.especie] || 0) + 1
    })

    const especiesRows = Object.keys(porEspecie).map((especie) => ({
        especie,
        cantidad: porEspecie[especie]
    }))

    const ESPECIES_COLUMNS = [
        { key: 'especie', header: 'Especie' },
        { key: 'cantidad', header: 'Cantidad de atenciones' }
    ]

    // 3. Próximas citas
    const futuras = citas
        .filter((c) => c.estado !== 'Cancelada' && c.estado !== 'Atendida')
        .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
        .slice(0, 10)

    const PROXIMAS_COLUMNS = [
        { key: 'mascota', header: 'Mascota' },
        { key: 'nombreDueno', header: 'Dueño' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'fecha', header: 'Fecha' },
        { key: 'hora', header: 'Hora' },
        {
            key: 'estado',
            header: 'Estado',
            render: (val) => {
                const map = { Pendiente: 'warning', Confirmada: 'primary' }
                return <span className={`badge bg-${map[val] || 'secondary'}`}>{val}</span>
            }
        }
    ]

    return (
        <div>
            <PageHeader
                title="Reportes"
                subtitle="Estadísticas de atención, especies e ingresos del consultorio."
            />

            {/* Resumen general */}
            <Row className="mb-4 g-3 text-center">
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-primary mb-1">{citas.length}</h2>
                            <p className="text-muted m-0 small fw-semibold">Citas totales</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-success mb-1">{atencionesCount}</h2>
                            <p className="text-muted m-0 small fw-semibold">Atenciones realizadas</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-info mb-1">{fichas.length}</h2>
                            <p className="text-muted m-0 small fw-semibold">Fichas clínicas</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="shadow-sm h-100 py-3">
                        <Card.Body>
                            <h2 className="display-6 fw-bold text-warning mb-1">{especiesSet.size}</h2>
                            <p className="text-muted m-0 small fw-semibold">Especies distintas</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Atenciones por tipo */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Atenciones por tipo</Card.Title>
                    <Table
                        columns={TIPOS_COLUMNS}
                        rows={tiposRows}
                        rowKey="tipo"
                        striped
                        hover
                        responsive
                        emptyText="No hay atenciones registradas."
                    />
                    {tiposRows.length > 0 && (
                        <div className="d-flex justify-content-between fw-bold p-2 bg-light border-top">
                            <span>Total</span>
                            <span>{totalCantidad} atenciones</span>
                            <span>${totalIngresos.toLocaleString('es-CL')}</span>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Especies atendidas */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Especies atendidas</Card.Title>
                    <Table
                        columns={ESPECIES_COLUMNS}
                        rows={especiesRows}
                        rowKey="especie"
                        striped
                        hover
                        responsive
                        emptyText="No hay datos de especies."
                    />
                </Card.Body>
            </Card>

            {/* Próximas citas */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Próximas citas</Card.Title>
                    <Table
                        columns={PROXIMAS_COLUMNS}
                        rows={futuras}
                        rowKey="id"
                        striped
                        hover
                        responsive
                        emptyText="No hay citas próximas."
                    />
                </Card.Body>
            </Card>

            <Button variant="dark" onClick={() => window.print()} className="mb-4">
                Exportar reporte a impresión
            </Button>
        </div>
    )
}
