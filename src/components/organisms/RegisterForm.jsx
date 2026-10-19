import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';
import { validationRegister } from '../../utils/validationRegister';

// Organismo: formulario de registro.
// Recibe por props: onSubmit, error (mensaje de la API) y loading.
function RegisterForm(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ejecuta la validación aislada del Registro
        const { errors: newErrors, isValid } = validationRegister({ name, email, password });
        setErrors(newErrors);

        if (isValid) {
            props.onSubmit({ name, email, password });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {props.error && <div className="alert alert-danger mb-3">{props.error}</div>}

            <FormField
                id="name"
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                error={errors.name}
            />

            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                error={errors.email}
            />

            <FormField
                id="password"
                label="Contraseña"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                error={errors.password}
            />

            <SubmitButton disabled={props.loading}>
                {props.loading ? 'Registrando...' : 'Crear Cuenta'}
            </SubmitButton>
        </form>
    );
}

export default RegisterForm;