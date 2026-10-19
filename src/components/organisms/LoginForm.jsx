import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';
import { validationLogin } from '../../utils/validationLogin';

// Organismo: formulario de login.
// Recibe por props: onSubmit, error (mensaje de la API) y loading.
function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const { errors: newErrors, isValid } = validationLogin({ email, password });
        setErrors(newErrors);

        if (isValid) {
            props.onSubmit({ email, password });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {props.error && <div className="alert alert-danger mb-3">{props.error}</div>}

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
                {props.loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </SubmitButton>
        </form>
    );
}

export default LoginForm;