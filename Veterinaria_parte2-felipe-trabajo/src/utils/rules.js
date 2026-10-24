// Reglas de validación reutilizables. Cada una devuelve '' si está bien
// o el mensaje de error si falla. Login y registro las importan desde aquí.
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) return 'El correo electrónico es obligatorio';
    if (!emailRegex.test(email.trim())) return 'Ingresa un correo electrónico válido';
    return '';
};

export const validatePassword = (password) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
};

export const validateName = (name) => {
    if (!name || !name.trim()) return 'El nombre completo es obligatorio';
    if (name.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
    return '';
};