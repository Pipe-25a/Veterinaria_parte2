import { useState, useEffect } from 'react'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { FormField } from '../../components/molecules/FormField'
import { Button } from '../../components/atoms/Button'
import Select from '../../components/atoms/Select'
import { Table } from '../../components/atoms/Tables'
import { getVetFichas, saveVetFichas } from '../../services/vetService'
import { validationVetFicha } from '../../utils/validationVet'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { Card, Form, Row, Col, Alert } from 'react-bootstrap'

const ESPECIE_OPTIONS = ['Perro', 'Gato', 'Hamster', 'Tortuga', 'Pájaro', 'Otro']
const CONDICION_OPTIONS = ['Saludable', 'En tratamiento', 'Crítico', 'Recuperación']

export default function VetFichasPage() {
    useTituloPagina('Gestión de Fichas Clínicas')

    const [fichas, setFichas] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [editandoId, setEditandoId] = useState(null)
    const [formData, setFormData] = useState({
        mascota: '',
        dueno: '',
        especie: '',
        raza: '',
        edad: '',
        peso: '',
        condicion: '',
        observaciones: ''
    })
    const [errors, setErrors] = useState({})
    const [mensaje, setMensaje] = useState({ text: '', type: '' })

    useEffect(() => {
        setFichas(getVetFichas())
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

        const validation = validationVetFicha(formData)
        if (!validation.isValid) {
            setErrors(validation.errors)
            setMensaje({ text: 'Revisa los campos resaltados en rojo.', type: 'danger' })
            return
        }

        const fichaData = {
            mascota: formData.mascota.trim(),
            dueno: formData.dueno.trim(),
            especie: formData.especie,
            raza: formData.raza.trim(),
            edad: formData.edad !== '' ? Number(formData.edad) : '',
            peso: formData.peso !== '' ? Number(formData.peso) : '',
            condicion: formData.condicion,
            observaciones: formData.observaciones.trim()
        }

        let actualizadas = [...fichas]
        if (editandoId !== null) {
            actualizadas = actualizadas.map((f) => f.id === editandoId ? { ...f, ...fichaData } : f)
            setMensaje({ text: 'Ficha actualizada correctamente.', type: 'success' })
        } else {
            const nueva = { id: Date.now(), ...fichaData }
            actualizadas.push(nueva)
            setMensaje({ text: 'Ficha creada correctamente.', type: 'success' })
        }

        setFichas(actualizadas)
        saveVetFichas(actualizadas)
        limpiarFormulario()
    }

    const limpiarFormulario = () => {
        setEditandoId(null)
        setFormData({
            mascota: '',
            dueno: '',
            especie: '',
            raza: '',
            edad: '',
            peso: '',
            condicion: '',
            observaciones: ''
        })
        setErrors({})
    }

    const handleEditar = (ficha) => {
        setEditandoId(ficha.id)
        setFormData({
            mascota: ficha.mascota || '',
            dueno: ficha.dueno || '',
            especie: ficha.especie || '',
            raza: ficha.raza || '',
            edad: ficha.edad !== undefined && ficha.edad !== null ? ficha.edad : '',
            peso: ficha.peso !== undefined && ficha.peso !== null ? ficha.peso : '',
            condicion: ficha.condicion || '',
            observaciones: ficha.observaciones || ''
        })
        setMensaje({ text: '', type: '' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleEliminar = (id, mascota) => {
        if (window.confirm(`¿Eliminar la ficha de ${mascota}?`)) {
            const actualizadas = fichas.filter((f) => f.id !== id)
            setFichas(actualizadas)
            saveVetFichas(actualizadas)
            setMensaje({ text: 'Ficha eliminada.', type: 'success' })
        }
    }

    const termino = searchTerm.trim().toLowerCase()
    const filtradas = termino
        ? fichas.filter(
            (f) =>
                f.mascota.toLowerCase().includes(termino) ||
                f.dueno.toLowerCase().includes(termino) ||
                f.especie.toLowerCase().includes(termino)
        )
        : fichas

    const COLUMNS = [
        { key: 'mascota', header: 'Mascota' },
        { key: 'especie', header: 'Especie' },
        { key: 'dueno', header: 'Dueño' },
        { key: 'raza', header: 'Raza', render: (val) => val || '-' },
        { key: 'edad', header: 'Edad', render: (val) => (val !== '' && val !== null && val !== undefined) ? `${val} años` : '-' },
        { key: 'peso', header: 'Peso', render: (val) => (val !== '' && val !== null && val !== undefined) ? `${val} kg` : '-' },
        {
            key: 'condicion',
            header: 'Condición',
            render: (val) => {
                const map = {
                    'Saludable': 'success',
                    'En tratamiento': 'warning',
                    'Crítico': 'danger',
                    'Recuperación': 'info'
                }
                return <span className={`badge bg-${map[val] || 'secondary'}`}>{val}</span>
            }
        },
        {
            key: 'acciones',
            header: 'Acciones',
            render: (_, row) => (
                <div className="d-flex gap-1">
                    <Button size="sm" variant="outline-primary" onClick={() => handleEditar(row)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleEliminar(row.id, row.mascota)}>Eliminar</Button>
                </div>
            )
        }
    ]

    return (
        <CatalogTemplate
            title="Gestión de Fichas Clínicas"
            subtitle="Crea, edita y administra las fichas de tus pacientes."
        >
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title className="h5 mb-3">
                        {editandoId !== null ? `Editar ficha de ${formData.mascota}` : 'Nueva ficha clínica'}
                    </Card.Title>
                    {mensaje.text && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
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
                            <Col md={6}>
                                <FormField
                                    id="dueno"
                                    name="dueno"
                                    label="Nombre del dueño"
                                    placeholder="Nombre del dueño"
                                    value={formData.dueno}
                                    onChange={handleChange}
                                    error={errors.dueno}
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
                            <Col md={6}>
                                <FormField
                                    id="raza"
                                    name="raza"
                                    label="Raza"
                                    placeholder="Raza (opcional)"
                                    value={formData.raza}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <FormField
                                    id="edad"
                                    name="edad"
                                    label="Edad (años)"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Edad"
                                    value={formData.edad}
                                    onChange={handleChange}
                                    error={errors.edad}
                                />
                            </Col>
                            <Col md={4}>
                                <FormField
                                    id="peso"
                                    name="peso"
                                    label="Peso (kg)"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Peso"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    error={errors.peso}
                                />
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <label htmlFor="condicion" className="form-label fw-medium">Condición de salud <span className="text-danger">*</span></label>
                                    <Select
                                        id="condicion"
                                        name="condicion"
                                        placeholder="Selecciona"
                                        options={CONDICION_OPTIONS}
                                        value={formData.condicion}
                                        onChange={handleChange}
                                        invalid={Boolean(errors.condicion)}
                                        required
                                    />
                                    {errors.condicion && <div className="invalid-feedback d-block">{errors.condicion}</div>}
                                </div>
                            </Col>
                        </Row>

                        <FormField
                            as="textarea"
                            id="observaciones"
                            name="observaciones"
                            label="Observaciones"
                            rows={3}
                            placeholder="Notas relevantes"
                            value={formData.observaciones}
                            onChange={handleChange}
                        />

                        <div className="d-flex gap-2">
                            <Button type="submit" variant="success">
                                {editandoId !== null ? 'Actualizar ficha' : 'Guardar ficha'}
                            </Button>
                            {editandoId !== null && (
                                <Button type="button" variant="secondary" onClick={limpiarFormulario}>
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <Card.Title className="h5 m-0">Fichas clínicas</Card.Title>
                        <div style={{ width: '250px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Buscar ficha..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Table
                        columns={COLUMNS}
                        rows={filtradas}
                        rowKey="id"
                        striped
                        hover
                        responsive
                        emptyText="No hay fichas registradas."
                    />
                </Card.Body>
            </Card>
        </CatalogTemplate>
    )
}
