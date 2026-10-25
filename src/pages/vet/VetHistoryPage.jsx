import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { FormField } from '../../components/molecules/FormField'
import { Button } from '../../components/atoms/Button'
import { Table } from '../../components/atoms/Tables'
import { getVetHistory, saveVetHistory } from '../../services/vetService'
import { validateVetHistory } from '../../utils/validationVet'
import { usePageTitle } from '../../hooks/usePageTitle'
import { formatDate } from '../../utils/formatDate'
import { Alert } from 'react-bootstrap'

const INITIAL_FORM = {
    pet: '',
    species: '',
    dueno: '',
    type: '',
    date: '',
    diagnosis: '',
    treatment: '',
}

export function VetHistoryPage(props) {
    usePageTitle('Historial Clínico')
    const { user } = useAuth()

    const [history, setHistory] = useState([])
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState({ text: '', type: '' })

    useEffect(() => {
        if (props.initialHistory || props.history) {
            setHistory(props.initialHistory || props.history)
        } else {
            setHistory(getVetHistory())
        }
    }, [props.initialHistory, props.history])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
        setMessage({ text: '', type: '' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { errors: newErrors, isValid } = validateVetHistory(formData)
        setErrors(newErrors)
        if (!isValid) return

        const newItem = {
            id: Date.now(),
            pet: formData.pet.trim(),
            species: formData.species,
            dueno: formData.dueno.trim(),
            type: formData.type,
            date: formData.date,
            vet: user?.name ?? 'Veterinario',
            diagnosis: formData.diagnosis.trim(),
            treatment: formData.treatment.trim(),
        }

        const updated = [newItem, ...history]
        setHistory(updated)
        saveVetHistory(updated)
        setMessage({ text: 'Atención registrada correctamente.', type: 'success' })
        setErrors({})
        setFormData(INITIAL_FORM)
    }

    const COLUMNS = [
        { key: 'pet', header: 'Mascota' },
        { key: 'species', header: 'Especie' },
        { key: 'dueno', header: 'Dueño' },
        { key: 'type', header: 'Tipo' },
        { key: 'date', header: 'Fecha', render: (val) => formatDate(val) },
        { key: 'diagnosis', header: 'Diagnóstico' },
    ]

    return (
        <CatalogTemplate
            title={props.title ?? 'Historial Clínico'}
            subtitle={props.subtitle ?? 'Consulta las atenciones registradas.'}
        >
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Registrar atención manual</h5>
                    {message.text && <Alert variant={message.type}>{message.text}</Alert>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id="pet"
                                    label="Mascota"
                                    value={formData.pet}
                                    onChange={handleChange}
                                    error={errors.pet}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <FormField
                                    id="species"
                                    label="Especie"
                                    options={['Perro', 'Gato', 'Otro']}
                                    placeholder="Selecciona una especie"
                                    value={formData.species}
                                    onChange={handleChange}
                                    error={errors.species}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id="dueno"
                                    label="Dueño"
                                    value={formData.dueno}
                                    onChange={handleChange}
                                    error={errors.dueno}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <FormField
                                    id="type"
                                    label="Tipo de atención"
                                    options={['Consulta', 'Vacunación', 'Cirugía', 'Urgencia']}
                                    placeholder="Selecciona un tipo"
                                    value={formData.type}
                                    onChange={handleChange}
                                    error={errors.type}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id="date"
                                    label="Fecha"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    error={errors.date}
                                    required
                                />
                            </div>
                        </div>

                        <FormField
                            id="diagnosis"
                            label="Diagnóstico"
                            as="textarea"
                            rows={3}
                            value={formData.diagnosis}
                            onChange={handleChange}
                            error={errors.diagnosis}
                        />
                        <FormField
                            id="treatment"
                            label="Tratamiento"
                            as="textarea"
                            rows={3}
                            value={formData.treatment}
                            onChange={handleChange}
                            error={errors.treatment}
                        />

                        <Button type="submit" variant="success">Guardar en historial</Button>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Historial de atenciones</h5>
                    <Table
                        columns={COLUMNS}
                        rows={history}
                        rowKey="id"
                        striped
                        hover
                        responsive
                        emptyText="No hay registros."
                    />
                </div>
            </div>
        </CatalogTemplate>
    )
}