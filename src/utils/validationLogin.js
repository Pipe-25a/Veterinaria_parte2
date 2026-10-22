import { validateEmail, validatePassword } from './rules';

export function validationLogin({ email, password }) {
    const errors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
}