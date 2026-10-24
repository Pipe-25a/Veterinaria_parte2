export const CITAS_INICIALES = [
    { id: 1, nombreDueno: "María Pérez", mascota: "Rex", especie: "Perro", tipo: "Consulta", fecha: "2026-09-08", hora: "10:00", estado: "Pendiente", motivo: "Chequeo general" },
    { id: 2, nombreDueno: "Juan Torres", mascota: "Michi", especie: "Gato", tipo: "Vacunación", fecha: "2026-09-08", hora: "11:30", estado: "Pendiente", motivo: "Vacuna antirrábica" },
    { id: 3, nombreDueno: "Ana Ríos", mascota: "Copito", especie: "Perro", tipo: "Cirugía", fecha: "2026-09-09", hora: "09:00", estado: "Pendiente", motivo: "Esterilización" }
];

export const FICHAS_INICIALES = [
    { id: 1, mascota: "Rex", especie: "Perro", dueno: "María Pérez", raza: "Golden Retriever", edad: 4, peso: 28, condicion: "Saludable", observaciones: "Seguimiento anual" },
    { id: 2, mascota: "Michi", especie: "Gato", dueno: "Juan Torres", raza: "Común Europeo", edad: 2, peso: 4.2, condicion: "Saludable", observaciones: "Vacunación al día" }
];

export const HISTORIAL_INICIAL = [
    { id: 1, mascota: "Rex", especie: "Perro", dueno: "María Pérez", tipo: "Consulta", fecha: "2026-08-20", veterinario: "Dra. Carolina Soto", diagnostico: "Chequeo general sin hallazgos", tratamiento: "Ninguno" },
    { id: 2, mascota: "Michi", especie: "Gato", dueno: "Juan Torres", tipo: "Vacunación", fecha: "2026-07-15", veterinario: "Dr. Miguel Ángel Rojas", diagnostico: "Vacunación anual", tratamiento: "Vacuna pentavalente" }
];

export const PRECIOS_ATENCION = {
    "Consulta": 17000,
    "Vacunación": 15000,
    "Desparasitación": 9000,
    "Cirugía": 22000,
    "Urgencia": 25000
};
