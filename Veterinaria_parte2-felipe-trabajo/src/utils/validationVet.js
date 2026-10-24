export const validationVetCita = ({ nombreDueno, mascota, especie, tipo, fecha, hora }) => {
    const errors = {}

    if (!nombreDueno || !nombreDueno.trim()) {
        errors.nombreDueno = 'El nombre del dueño es obligatorio.'
    } else if (nombreDueno.trim().length < 3) {
        errors.nombreDueno = 'Debe tener al menos 3 caracteres.'
    }

    if (!mascota || !mascota.trim()) {
        errors.mascota = 'El nombre de la mascota es obligatorio.'
    } else if (mascota.trim().length < 2) {
        errors.mascota = 'Debe tener al menos 2 caracteres.'
    }

    if (!especie) {
        errors.especie = 'Selecciona una especie.'
    }

    if (!tipo) {
        errors.tipo = 'Selecciona un tipo de atención.'
    }

    if (!fecha) {
        errors.fecha = 'La fecha es obligatoria.'
    } else {
        const selectedDate = new Date(fecha)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
            errors.fecha = 'La fecha no puede ser anterior a hoy.'
        }
    }

    if (!hora) {
        errors.hora = 'La hora es obligatoria.'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validationVetHistorial = ({ mascota, especie, dueno, tipo, fecha }) => {
    const errors = {}

    if (!mascota || !mascota.trim()) {
        errors.mascota = 'El nombre de la mascota es obligatorio.'
    } else if (mascota.trim().length < 2) {
        errors.mascota = 'Debe tener al menos 2 caracteres.'
    }

    if (!especie) {
        errors.especie = 'Selecciona una especie.'
    }

    if (!dueno || !dueno.trim()) {
        errors.dueno = 'El nombre del dueño es obligatorio.'
    } else if (dueno.trim().length < 3) {
        errors.dueno = 'Debe tener al menos 3 caracteres.'
    }

    if (!tipo) {
        errors.tipo = 'Selecciona un tipo de atención.'
    }

    if (!fecha) {
        errors.fecha = 'La fecha es obligatoria.'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validationVetFicha = ({ mascota, dueno, especie, condicion, edad, peso }) => {
    const errors = {}

    if (!mascota || !mascota.trim()) {
        errors.mascota = 'El nombre de la mascota es obligatorio.'
    } else if (mascota.trim().length < 2) {
        errors.mascota = 'Debe tener al menos 2 caracteres.'
    }

    if (!dueno || !dueno.trim()) {
        errors.dueno = 'El nombre del dueño es obligatorio.'
    } else if (dueno.trim().length < 3) {
        errors.dueno = 'Debe tener al menos 3 caracteres.'
    }

    if (!especie) {
        errors.especie = 'Selecciona una especie.'
    }

    if (!condicion) {
        errors.condicion = 'Selecciona una condición de salud.'
    }

    if (edad !== '' && edad !== undefined && edad !== null) {
        const numEdad = Number(edad)
        if (isNaN(numEdad) || numEdad < 0 || numEdad >= 100) {
            errors.edad = 'La edad debe estar entre 0 y 99 años.'
        }
    }

    if (peso !== '' && peso !== undefined && peso !== null) {
        const numPeso = Number(peso)
        if (isNaN(numPeso) || numPeso <= 0 || numPeso >= 500) {
            errors.peso = 'El peso debe ser mayor a 0 y hasta 499 kg.'
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
