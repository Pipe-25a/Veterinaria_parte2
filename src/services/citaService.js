import citasMock from '../data/citas.json';

const KEY = 'citas';

const leerCitas = () => {
  try {
    const guardadas = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(guardadas) ? guardadas : citasMock;
  } catch {
    return citasMock;
  }
};
const guardarCitas = (citas) => localStorage.setItem(KEY, JSON.stringify(citas));
export const getCitasByDueno = (email) =>
  leerCitas().filter((c) => c.duenoEmail === email);

export const agendarCita = ({ duenoEmail, mascotaId, fecha, hora, tipo }) => {
  if (!mascotaId || !fecha || !hora || !tipo) {
    return { ok: false, error: 'Completa todos los campos' };
  }
  const citas = leerCitas();
  const ocupada = citas.some((c) => c.fecha === fecha && c.hora === hora && c.estado !== 'cancelada');
  if (ocupada) {
    return { ok: false, error: 'Ese horario ya está ocupado' };
  }
  const nueva = {
    id: Date.now(),
    duenoEmail,
    mascotaId: Number(mascotaId),
    fecha,
    hora,
    tipo,
    estado: 'pendiente',
  };
  guardarCitas([...citas, nueva]);
  return { ok: true, cita: nueva };
};