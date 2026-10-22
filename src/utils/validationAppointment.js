// src/utils/validacionAppointment.js

export const validationAppointment = ({ petName, date, time, service }) => {
    const errors = {};

    // 1. Validar nombre de la mascota
    if (!petName || !petName.trim()) {
        errors.petName = 'El nombre de la mascota es obligatorio';
    } else if (petName.trim().length < 2) {
        errors.petName = 'El nombre debe tener al menos 2 caracteres';
    }

    // 2. Validar fecha (que no sea anterior a hoy)
    if (!date) {
        errors.date = 'La fecha de la cita es obligatoria';
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Omitir hora para comparar solo fechas

        if (selectedDate < today) {
            errors.date = 'La fecha no puede ser en el pasado';
        }
    }

    // 3. Validar hora
    if (!time) {
        errors.time = 'La hora de la cita es obligatoria';
    }

    // 4. Validar servicio
    if (!service || !service.trim()) {
        errors.service = 'Debes seleccionar un servicio';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

export default validationAppointment