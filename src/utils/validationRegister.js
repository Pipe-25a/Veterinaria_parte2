// Función helper para validar un formulario de Registro completo
import { validateName, validateEmail, validatePassword } from './rules';

// Valida el formulario de Registro completo
export const validationRegister = ({ name, email, password }) => {
    const errors = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};