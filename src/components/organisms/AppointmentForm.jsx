import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';
import { validationAppointment } from '../../utils/validationAppointment';

function AppointmentForm({ onSubmit, error: apiError, loading }) {
    const [petName, setPetName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const { errors: newErrors, isValid } = validationAppointment({
            petName,
            date,
            time,
            service,
        });

        setErrors(newErrors);

        if (isValid) {
            onSubmit({ petName, date, time, service });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {apiError && <div className="alert alert-danger mb-3">{apiError}</div>}

            <FormField
                id="petName"
                label="Nombre de la mascota"
                type="text"
                placeholder="Ej: Bucky"
                value={petName}
                onChange={(e) => {
                    setPetName(e.target.value);
                    if (errors.petName) setErrors((prev) => ({ ...prev, petName: '' }));
                }}
                error={errors.petName}
            />

            <FormField
                id="date"
                label="Fecha de la cita"
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                }}
                error={errors.date}
            />

            <FormField
                id="time"
                label="Hora de la cita"
                type="time"
                value={time}
                onChange={(e) => {
                    setTime(e.target.value);
                    if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                }}
                error={errors.time}
            />

            <SubmitButton disabled={loading}>
                {loading ? 'Agendando...' : 'Confirmar Cita'}
            </SubmitButton>
        </form>
    );
}

export default AppointmentForm;