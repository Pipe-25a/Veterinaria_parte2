const KEY = 'mensajes';

const readMessages = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

// Devuelve un objeto { campo: 'mensaje de error' }. Vacío = formulario válido.
export const validateMessage = ({ name = '', email = '', subject = '', message = '' }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'El nombre es obligatorio';
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'El correo no tiene un formato válido';
  if (subject.trim().length < 3) errors.subject = 'El asunto debe tener al menos 3 caracteres';
  if (subject.trim().length > 100) errors.subject = 'El asunto no puede superar los 100 caracteres';
  if (message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres';
  if (message.trim().length > 1000) errors.message = 'El mensaje no puede superar los 1000 caracteres';
  return errors;
};

// Simula el envío del correo: valida y guarda el mensaje en localStorage.
export const sendMessage = (form) => {
  const errors = validateMessage(form);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const message = {
    id: Date.now(),
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    subject: form.subject.trim(),
    message: form.message.trim(),
    date: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([...readMessages(), message]));
  return { ok: true, message };
};
