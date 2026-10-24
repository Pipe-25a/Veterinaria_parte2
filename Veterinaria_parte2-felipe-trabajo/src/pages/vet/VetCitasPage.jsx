import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { PageHeader } from '../../components/molecules/PageHeader'
import { FormField } from '../../components/molecules/FormField'
import { Button } from '../../components/atoms/Button'
import Select from '../../components/atoms/Select'
import { Table } from '../../components/atoms/Tables'
import { getVetCitas, saveVetCitas, enviarAHistorial } from '../../services/vetService'
import { validationVetCita } from '../../utils/validationVet'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { Card, Form, Row, Col, Alert } from 'react-bootstrap'

const ESPECIE_OPTIONS = ['Perro', 'Gato', 'Hamster', 'Tortuga', 'Pájaro', 'Otro']
const TIPO_OPTIONS = ['Consulta', 'Vacunación', 'Desparasitación', 'Cirugía', 'Urgencia']
const ESTADO_OPTIONS = ['Todos', 'Pendiente', 'Confirmada', 'Atendida', 'Cancelada']

export default function VetCitasPage() {
    useTituloPagina('Gestión de Citas')
    const { user } = useAuth()

    const [citas, setCitas] = useState([])
    const [filtroEstado, setFiltroEstado] = useState('Todos')
    const [formData, setFormData] = useState({
        nombreDueno: '',
        mascota: '',
        especie: '',
        tipo: '',
        fecha: '',
        hora: '',
        motivo: ''
    })
    const [errors, setErrors] = useState({})
    const [mensaje, setMensaje] = useState({ text: '', type: '' })

    useEffect(() => {
        setCitas(getVetCitas())
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMensaje({ text: '', type: '' })

        const validation = validationVetCita(formData)
        if (!validation.isValid) {
            setErrors(validation.errors)
            setMensaje({ text: 'Revisa los campos resaltados.', type: 'danger' })
            return
        }

        const nuevaCita = {
            id: Date.now(),
            nombreDueno: formData.nombreDueno.trim(),
            mascota: formData.mascota.trim(),
            especie: formData.especie,
            tipo: formData.tipo,
            fecha: formData.fecha,
            hora: formData.hora,
            estado: 'Pendiente',
            motivo: formData.motivo.trim()
        }

        const actualizadas = [...citas, nuevaCita]
        setCitas(actualizadas)
        saveVetCitas(actualizadas)

        setFormData({
            nombreDueno: '',
            mascota: '',
            especie: '',
            tipo: '',
            fecha: '',
            hora: '',
            motivo: ''
        })
        setErrors({})
        setMensaje({ text: 'Cita agendada correctamente.', type: 'success' })
    }

    const manejarAccion = (cita, accion) => {
        const actualizadas = citas.map((c) => {
            if (c.id === cita.id) {
                if (accion === 'confirmar') return { ...c, estado: 'Confirmada' }
                if (accion === 'cancelar') return { ...c, estado: 'Cancelada' }
                if (accion === 'atender') {
                    enviarAHistorial(c, user?.name ?? 'Veterinario')
                    return { ...c, estado: 'Atendida' }
                }
            }
            return c
        })
        setCitas(actualizadas)
        saveVetCitas(actualizadas)
    }

    const filtradas = filtroEstado === 'Todos'
        ? citas
        : citas.filter((c) => c.estado === filtroEstado)

    const COLUMNS = [
        { key: 'nombreDueno', header: 'Dueño' },
        { key: 'mascota', header: 'Mascota' },
        { key: 'especie', header: 'Especie' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'fecha', header: 'Fecha' },
        { key: 'hora', header: 'Hora' },
        {
            key: 'estado',
            header: 'Estado',
            render: (val) => {
                const variantMap = {
                    Pendiente: 'warning',
                    Confirmada: 'primary',
                    Atendida: 'success',
                    Cancelada: 'danger'
                }
                return <span className={`badge bg-${variantMap[val] || 'secondary'}`}>{val}</span>
            }
        },
        {
            key: 'acciones',
            header: 'Acciones',
            render: (_, row) => (
                <div className="d-flex gap-1 flex-wrap">
                    {row.estado === 'Pendiente' && (
                        <>
                            <Button size="sm" variant="success" onClick={() => manejarAccion(row, 'confirmar')}>Confirmar</Button>
                            <Button size="sm" variant="danger" onClick={() => manejarAccion(row, 'cancelar')}>Cancelar</Button>
                        </>
                    )}
                    {row.estado === 'Confirmada' && (
                        <>
                            <Button size="sm" variant="primary" onClick={() => manejarAccion(row, 'atender')}>Registrar atención</Button>
                            <Button size="sm" variant="danger" onClick={() => manejarAccion(row, 'cancelar')}>Cancelar</Button>
                        </>
                    )}
                    {row.estado !== 'Pendiente' && row.estado !== 'Confirmada' && (
                        <span className="text-muted small">Sin acciones</span>
                    )}
                </div>
            )
        }
    ]

    return (
        <div>
            <PageHeader
                title="Gestión de Citas"
                subtitle="Agenda, confirma y registra las atenciones de tus pacientes."
            />

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Agendar nueva cita</Card.Title>
                    {mensaje.text && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col md={6}>
                                <FormField
                                    id="nombreDueno"
                                    name="nombreDueno"
                                    label="Nombre del dueño"
                                    placeholder="Nombre completo"
                                    value={formData.nombreDueno}
                                    onChange={handleChange}
                                    error={errors.nombreDueno}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <FormField
                                    id="mascota"
                                    name="mascota"
                                    label="Nombre de la mascota"
                                    placeholder="Nombre de la mascota"
                                    value={formData.mascota}
                                    onChange={handleChange}
                                    error={errors.mascota}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label htmlFor="especie" className="form-label fw-medium">Especie <span className="text-danger">*</span></label>
                                    <Select
                                        id="especie"
                                        name="especie"
                                        placeholder="Selecciona una opción"
                                        options={ESPECIE_OPTIONS}
                                        value={formData.especie}
                                        onChange={handleChange}
                                        invalid={Boolean(errors.especie)}
                                        required
                                    />
                                    {errors.especie && <div className="invalid-feedback d-block">{errors.especie}</div>}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label fw-medium">Tipo de atención <span className="text-danger">*</span></label>
                                    <Select
                                        id="tipo"
                                        name="tipo"
                                        placeholder="Selecciona una opción"
                                        options={TIPO_OPTIONS}
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        invalid={Boolean(errors.tipo)}
                                        required
                                    />
                                    {errors.tipo && <div className="invalid-feedback d-block">{errors.tipo}</div>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormField
                                    id="fecha"
                                    name="fecha"
                                    label="Fecha deseada"
                                    type="date"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    error={errors.fecha}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <FormField
                                    id="hora"
                                    name="hora"
                                    label="Hora deseada"
                                    type="time"
                                    value={formData.hora}
                                    onChange={handleChange}
                                    error={errors.hora}
                                    required
                                />
                            </Col>
                        </Row>

                        <FormField
                            as="textarea"
                            id="motivo"
                            name="motivo"
                            label="Motivo (opcional)"
                            rows={2}
                            placeholder="Motivo de la consulta"
                            value={formData.motivo}
                            onChange={handleChange}
                        />

                        <Button type="submit" variant="success">Agendar cita</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <Card.Title className="h5 m-0">Citas registradas</Card.Title>
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="filtro-estado" className="form-label m-0 small fw-semibold">Filtrar:</label>
                            <select
                                id="filtro-estado"
                                className="form-select form-select-sm"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                            >
                                {ESTADO_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Table
                        columns={COLUMNS}
                        rows={filtradas}
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
