import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { PageHeader } from '../../components/molecules/PageHeader'
import { FormField } from '../../components/molecules/FormField'
import { Button } from '../../components/atoms/Button'
import Select from '../../components/atoms/Select'
import { Table } from '../../components/atoms/Tables'
import { getVetHistorial, saveVetHistorial } from '../../services/vetService'
import { validationVetHistorial } from '../../utils/validationVet'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { Card, Form, Row, Col, Alert } from 'react-bootstrap'

const ESPECIE_OPTIONS = ['Perro', 'Gato', 'Hamster', 'Tortuga', 'Pájaro', 'Otro']
const TIPO_OPTIONS = ['Consulta', 'Vacunación', 'Desparasitación', 'Cirugía', 'Urgencia']

export default function VetHistorialPage() {
    useTituloPagina('Historial Clínico')
    const { user } = useAuth()

    const [historial, setHistorial] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [formData, setFormData] = useState({
        mascota: '',
        especie: '',
        dueno: '',
        tipo: '',
        fecha: '',
        diagnostico: '',
        tratamiento: ''
    })
    const [errors, setErrors] = useState({})
    const [mensaje, setMensaje] = useState({ text: '', type: '' })

    useEffect(() => {
        setHistorial(getVetHistorial())
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

        const validation = validationVetHistorial(formData)
        if (!validation.isValid) {
            setErrors(validation.errors)
            setMensaje({ text: 'Revisa los campos resaltados.', type: 'danger' })
            return
        }

        const nuevoRegistro = {
            id: Date.now(),
            mascota: formData.mascota.trim(),
            especie: formData.especie,
            dueno: formData.dueno.trim(),
            tipo: formData.tipo,
            fecha: formData.fecha,
            veterinario: user?.name ?? 'Veterinario',
            diagnostico: formData.diagnostico.trim(),
            tratamiento: formData.tratamiento.trim()
        }

        const actualizados = [...historial, nuevoRegistro]
        setHistorial(actualizados)
        saveVetHistorial(actualizados)

        setFormData({
            mascota: '',
            especie: '',
            dueno: '',
            tipo: '',
            fecha: '',
            diagnostico: '',
            tratamiento: ''
        })
        setErrors({})
        setMensaje({ text: 'Atención registrada en el historial.', type: 'success' })
    }

    const termino = searchTerm.trim().toLowerCase()
    const filtrados = termino
        ? historial.filter(
            (r) =>
                r.mascota.toLowerCase().includes(termino) ||
                r.dueno.toLowerCase().includes(termino)
        )
        : historial

    const COLUMNS = [
        { key: 'mascota', header: 'Mascota' },
        { key: 'especie', header: 'Especie' },
        { key: 'dueno', header: 'Dueño' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'fecha', header: 'Fecha' },
        { key: 'veterinario', header: 'Veterinario', render: (val) => val || '-' },
        { key: 'diagnostico', header: 'Diagnóstico', render: (val) => val || '-' },
        { key: 'tratamiento', header: 'Tratamiento', render: (val) => val || '-' }
    ]

    return (
        <div>
            <PageHeader
                title="Historial Clínico"
                subtitle="Consulta las atenciones registradas de cada paciente."
            />

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Buscar paciente</Card.Title>
                    <Form.Group>
                        <Form.Label className="small text-muted">Filtrar por mascota o dueño</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por mascota o dueño..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Registrar atención manual</Card.Title>
                    {mensaje.text && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col md={6}>
                                <FormField
                                    id="mascota"
                                    name="mascota"
                                    label="Mascota"
                                    placeholder="Nombre de la mascota"
                                    value={formData.mascota}
                                    onChange={handleChange}
                                    error={errors.mascota}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label htmlFor="especie" className="form-label fw-medium">Especie <span className="text-danger">*</span></label>
                                    <Select
                                        id="especie"
                                        name="especie"
                                        placeholder="Selecciona"
                                        options={ESPECIE_OPTIONS}
                                        value={formData.especie}
                                        onChange={handleChange}
                                        invalid={Boolean(errors.especie)}
                                        required
                                    />
                                    {errors.especie && <div className="invalid-feedback d-block">{errors.especie}</div>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormField
                                    id="dueno"
                                    name="dueno"
                                    label="Dueño"
                                    placeholder="Nombre del dueño"
                                    value={formData.dueno}
                                    onChange={handleChange}
                                    error={errors.dueno}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label fw-medium">Tipo de atención <span className="text-danger">*</span></label>
                                    <Select
                                        id="tipo"
                                        name="tipo"
                                        placeholder="Selecciona"
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
                                    label="Fecha"
                                    type="date"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    error={errors.fecha}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <FormField
                                    id="diagnostico"
                                    name="diagnostico"
                                    label="Diagnóstico"
                                    placeholder="Diagnóstico principal"
                                    value={formData.diagnostico}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <FormField
                            as="textarea"
                            id="tratamiento"
                            name="tratamiento"
                            label="Tratamiento"
                            rows={2}
                            placeholder="Tratamiento indicado"
                            value={formData.tratamiento}
                            onChange={handleChange}
                        />

                        <Button type="submit" variant="success">Guardar en historial</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">Historial de atenciones</Card.Title>
                    <Table
                        columns={COLUMNS}
                        rows={filtrados}
                        rowKey="id"
                        striped
                        hover
                        responsive
                        emptyText="No hay registros en el historial."
                    />
                </Card.Body>
            </Card>
        </div>
    )
}
