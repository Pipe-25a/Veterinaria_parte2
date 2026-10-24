export const validationAppointment = ({ petName, species, date, time, service }) => {
    const errors = {}

    if (!petName || !petName.trim()) {
        errors.petName = 'El nombre de la mascota es obligatorio'
    } else if (petName.trim().length < 2) {
        errors.petName = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!species) {
        errors.species = 'Debes seleccionar una especie'
    }

    if (!date) {
        errors.date = 'La fecha de la cita es obligatoria'
    } else {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
            errors.date = 'La fecha no puede ser en el pasado'
        }
    }

    if (!time) {
        errors.time = 'La hora de la cita es obligatoria'
    }

    if (!service || !service.trim()) {
        errors.service = 'Debes seleccionar un servicio'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}