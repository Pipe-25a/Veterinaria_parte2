import { useState } from 'react'
import { FormField } from '../molecules/FormField'
import { Select } from '../atoms/Select'
import { Button } from '../atoms/Button'
import { validationAppointment } from '../../utils/validationAppointment'

const SERVICES = [
    { value: 'Control', label: 'Control' },
    { value: 'Vacunación', label: 'Vacunación' },
    { value: 'Exámenes', label: 'Exámenes' },
    { value: 'Cirugía', label: 'Cirugía' },
    { value: 'Estética', label: 'Estética' },
]

const SPECIES = [
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' },
    { value: 'rabbit', label: 'Conejo' },
    { value: 'bird', label: 'Ave' },
    { value: 'turtle', label: 'Tortuga' },
    { value: 'others', label: 'Otros' },
]

export function AppointmentForm(props) {
    const [petName, setPetName] = useState('')
    const [species, setSpecies] = useState('')      // ← NUEVO
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [service, setService] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        // Pasamos species a la validación (extenderemos validationAppointment)
        const result = validationAppointment({ petName, species, date, time, service })
        setErrors(result.errors)
        if (!result.isValid) return

        // Incluimos species en el onSubmit para que AppointmentPage la use
        const response = props.onSubmit({ petName, species, date, time, service })

        if (response?.ok) {
            setPetName('')
            setSpecies('')
            setDate('')
            setTime('')
            setService('')
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {props.error && <div className="alert alert-danger mb-3">{props.error}</div>}
            {props.success && <div className="alert alert-success mb-3">{props.success}</div>}

            <FormField
                id="petName"
                label="Nombre de la mascota"
                type="text"
                placeholder="Ej: Bucky"
                value={petName}
                onChange={(e) => {
                    setPetName(e.target.value)
                    if (errors.petName) setErrors((prev) => ({ ...prev, petName: '' }))
                }}
                error={errors.petName}
            />

            {/* NUEVO: especie, para poder crear la mascota si no existe */}
            <div className="mb-3">
                <label htmlFor="species" className="form-label">
                    Especie <span className="text-danger ms-1">*</span>
                </label>
                <Select
                    id="species"
                    value={species}
                    onChange={(e) => {
                        setSpecies(e.target.value)
                        if (errors.species) setErrors((prev) => ({ ...prev, species: '' }))
                    }}
                    options={SPECIES}
                    placeholder="Selecciona una especie"
                    invalid={Boolean(errors.species)}
                    required
                />
                {errors.species && (
                    <div className="invalid-feedback d-block">{errors.species}</div>
                )}
            </div>

            <FormField
                id="date"
                label="Fecha de la cita"
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value)
                    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }))
                }}
                error={errors.date}
            />

            <FormField
                id="time"
                label="Hora de la cita"
                type="time"
                value={time}
                onChange={(e) => {
                    setTime(e.target.value)
                    if (errors.time) setErrors((prev) => ({ ...prev, time: '' }))
                }}
                error={errors.time}
            />

            <div className="mb-3">
                <label htmlFor="service" className="form-label">
                    Servicio <span className="text-danger ms-1">*</span>
                </label>
                <Select
                    id="service"
                    value={service}
                    onChange={(e) => {
                        setService(e.target.value)
                        if (errors.service) setErrors((prev) => ({ ...prev, service: '' }))
                    }}
                    options={SERVICES}
                    placeholder="Selecciona un servicio"
                    invalid={Boolean(errors.service)}
                    required
                />
                {errors.service && (
                    <div className="invalid-feedback d-block">{errors.service}</div>
                )}
            </div>

            <Button type="submit" disabled={props.loading}>
                {props.loading ? 'Agendando...' : 'Agendar Cita'}
            </Button>
        </form>
    )
}