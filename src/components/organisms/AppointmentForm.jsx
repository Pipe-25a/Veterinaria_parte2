import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton'; // O tu átomo de botón

function AppointmentForm({ onSubmit, error, loading, services = [] }) {
    const [formData, setFormData] = useState({
        petName: '',
        species: 'perro',
        serviceId: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <FormField
                id="petName"
                label="Nombre de la Mascota"
                placeholder="Ej: Bucky"
                value={formData.petName}
                onChange={handleChange}
            />

            <FormField
                id="species"
                label="Especie"
                options={[
                    { value: 'perro', label: 'Perro' },
                    { value: 'gato', label: 'Gato' },
                    { value: 'otro', label: 'Otro' }
                ]}
                value={formData.species}
                onChange={handleChange}
            />

            {services.length > 0 && (
                <FormField
                    id="serviceId"
                    label="Servicio"
                    options={services.map((s) => ({ value: s.id, label: s.name }))}
                    placeholder="Seleccione un servicio"
                    value={formData.serviceId}
                    onChange={handleChange}
                />
            )}

            <FormField
                id="date"
                label="Fecha de la Cita"
                type="date"
                value={formData.date}
                onChange={handleChange}
            />

            <FormField
                id="time"
                label="Hora de la Cita"
                type="time"
                value={formData.time}
                onChange={handleChange}
            />

            <SubmitButton disabled={loading}>
                {loading ? 'Agendando...' : 'Confirmar Cita'}
            </SubmitButton>
        </form>
    );
}

export default AppointmentForm;