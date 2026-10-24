import { CITAS_INICIALES, FICHAS_INICIALES, HISTORIAL_INICIAL } from '../data/vetData'

const KEY_CITAS = 'vet_citas'
const KEY_FICHAS = 'vet_fichas'
const KEY_HISTORIAL = 'vet_historial'

function cargar(clave, inicial) {
    const datos = localStorage.getItem(clave)
    if (datos) {
        try {
            return JSON.parse(datos)
        } catch {
            return inicial
        }
    }
    localStorage.setItem(clave, JSON.stringify(inicial))
    return inicial
}

function guardar(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos))
}

export function getVetCitas() {
    return cargar(KEY_CITAS, CITAS_INICIALES)
}

export function saveVetCitas(citas) {
    guardar(KEY_CITAS, citas)
}

export function getVetFichas() {
    return cargar(KEY_FICHAS, FICHAS_INICIALES)
}

export function saveVetFichas(fichas) {
    guardar(KEY_FICHAS, fichas)
}

export function getVetHistorial() {
    return cargar(KEY_HISTORIAL, HISTORIAL_INICIAL)
}

export function saveVetHistorial(historial) {
    guardar(KEY_HISTORIAL, historial)
}

export function enviarAHistorial(cita, vetNombre = 'Veterinario') {
    const historial = getVetHistorial()
    const fichas = getVetFichas()

    const registro = {
        id: Date.now(),
        mascota: cita.mascota,
        especie: cita.especie,
        dueno: cita.nombreDueno,
        tipo: cita.tipo,
        fecha: cita.fecha,
        veterinario: vetNombre,
        diagnostico: 'Pendiente de diagnóstico en la ficha',
        tratamiento: ''
    }

    historial.push(registro)
    saveVetHistorial(historial)

    if (!fichas.some((f) => f.mascota.toLowerCase() === cita.mascota.toLowerCase())) {
        fichas.push({
            id: Date.now(),
            mascota: cita.mascota,
            especie: cita.especie,
            dueno: cita.nombreDueno,
            raza: '',
            edad: '',
            peso: '',
            condicion: 'En tratamiento',
            observaciones: 'Ficha creada desde una cita atendida'
        })
        saveVetFichas(fichas)
    }
}
