import mascotasMock  from '../data/mascotas.json';

const KEY = 'mascotas';

const leerMascotas = () => {
  try {
    const guardadas = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(guardadas) ? guardadas : mascotasMock;
  } catch {
    return mascotasMock;
  }
};

const guardarMascotas = (mascotas) =>
  localStorage.setItem(KEY, JSON.stringify(mascotas));

export const getMascotasByDueno = (email) =>
  leerMascotas().filter((m) => m.duenoEmail === email);

export const getMascotaById = (id) =>
  leerMascotas().find((m) => m.id === Number(id)) ?? null;

export const agregarMascota = ({ duenoEmail, nombre, especie, raza, edad }) => {
  if (!nombre.trim() || !especie) {
    return { ok: false, error: 'El nombre y la especie son obligatorios' };
  }
  const edadNum = Number(edad);
  if (edad === '' || Number.isNaN(edadNum) || edadNum < 0) {
    return { ok: false, error: 'La edad debe ser un número válido' };
  }
  const mascotas = leerMascotas();
  const repetida = mascotas.some(
    (m) =>
      m.duenoEmail === duenoEmail &&
      m.especie === especie &&
      m.nombre.toLowerCase() === nombre.trim().toLowerCase()
  );
  if (repetida) {
    return { ok: false, error: 'Ya tienes una mascota con ese nombre y especie' };
  }
  const nueva = {
    id: Date.now(),
    duenoEmail,
    nombre: nombre.trim(),
    especie,
    raza: raza.trim(),
    edad: edadNum,
  };
  guardarMascotas([...mascotas, nueva]);
  return { ok: true, mascota: nueva };
};