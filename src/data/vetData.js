export const INITIAL_RECORDS = [
    { id: 1, pet: "Rex", species: "Perro", dueno: "María Pérez", breed: "Golden Retriever", age: 4, weight: 28, condition: "Saludable", notes: "Seguimiento anual" },
    { id: 2, pet: "Michi", species: "Gato", dueno: "Juan Torres", breed: "Común Europeo", age: 2, weight: 4.2, condition: "Saludable", notes: "Vacunación al día" },
]

export const INITIAL_HISTORY = [
    { id: 1, pet: "Rex", species: "Perro", dueno: "María Pérez", type: "Consulta", date: "2026-08-20", vet: "Dra. Carolina Soto", diagnosis: "Chequeo general sin hallazgos", treatment: "Ninguno" },
    { id: 2, pet: "Michi", species: "Gato", dueno: "Juan Torres", type: "Vacunación", date: "2026-07-15", vet: "Dr. Miguel Ángel Rojas", diagnosis: "Vacunación anual", treatment: "Vacuna pentavalente" },
]

export const ATTENTION_PRICES = {
    Consulta: 17000,
    Control: 17000,
    Vacunación: 15000,
    Exámenes: 14000,
    Desparasitación: 9000,
    Cirugía: 22000,
    Estética: 20000,
    Urgencia: 25000,
}