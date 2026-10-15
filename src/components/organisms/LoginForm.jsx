import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';

function LoginForm({ onSubmit, loading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Importante: evita que la página se recargue
        onSubmit({ email, password }); // Llama a la prop onSubmit pasándole el objeto
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </SubmitButton>
        </form>
    );
}

export default LoginForm;
