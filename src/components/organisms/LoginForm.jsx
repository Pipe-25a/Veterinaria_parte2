import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';

function LoginForm({ onSubmit, loading, error }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <FormField
                id="loginEmail"
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <FormField
                id="loginPassword"
                label="Contraseña"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <SubmitButton disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </SubmitButton>
        </form>
    );
}

export default LoginForm;
