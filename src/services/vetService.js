import { INITIAL_APPOINTMENTS, INITIAL_RECORDS, INITIAL_HISTORY } from '../data/vetData'

const KEY_APPOINTMENTS = 'vet_appointments'
const KEY_RECORDS = 'vet_records'
const KEY_HISTORY = 'vet_history'

function load(key, initial) {
    const raw = localStorage.getItem(key)
    if (raw) {
        try {
            return JSON.parse(raw)
        } catch {
            return initial
        }
    }
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
}

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

// --- Appointments ---
export function getVetAppointments() {
    return load(KEY_APPOINTMENTS, INITIAL_APPOINTMENTS)
}

export function saveVetAppointments(appointments) {
    save(KEY_APPOINTMENTS, appointments)
}

// --- Records (fichas) ---
export function getVetRecords() {
    return load(KEY_RECORDS, INITIAL_RECORDS)
}

export function saveVetRecords(records) {
    save(KEY_RECORDS, records)
}

// --- History ---
export function getVetHistory() {
    return load(KEY_HISTORY, INITIAL_HISTORY)
}

export function saveVetHistory(history) {
    save(KEY_HISTORY, history)
}

// Envía una cita atendida al historial y crea ficha si no existe
export function sendToHistory(appointment, vetName = 'Veterinario') {
    const history = getVetHistory()
    const records = getVetRecords()

    const entry = {
        id: Date.now(),
        pet: appointment.pet,
        species: appointment.species,
        dueno: appointment.duenoName,
        type: appointment.type,
        date: appointment.date,
        vet: vetName,
        diagnosis: 'Pendiente de diagnóstico en la ficha',
        treatment: '',
    }

    history.push(entry)
    saveVetHistory(history)

    const exists = records.some(
        (r) => (r.pet || '').toLowerCase() === (appointment.pet || '').toLowerCase()
    )
    if (!exists) {
        records.push({
            id: Date.now(),
            pet: appointment.pet,
            species: appointment.species,
            dueno: appointment.duenoName,
            breed: '',
            age: '',
            weight: '',
            condition: 'En tratamiento',
            notes: 'Ficha creada desde una cita atendida',
        })
        saveVetRecords(records)
    }
}