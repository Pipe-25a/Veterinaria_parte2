import { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ email, password });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                controlId="formEmail"
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                controlId="formPassword"
                label="Contraseña"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton>Iniciar sesión</SubmitButton>
        </Form>
    );
}

export default LoginForm