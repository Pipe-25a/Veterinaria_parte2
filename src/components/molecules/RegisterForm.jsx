import { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';


function RegisterForm({ onSubmit, loading }) {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ nombre,email, password });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                controlId="formNombre"
                label="Nombre Completo"
                type="text"
                placeholder="Ingrese su Nombre Completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
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
            <SubmitButton disabled={loading}>
                {loading ? 'Registrando Usuario...' : 'Registrarse'}
            </SubmitButton>
        </Form>
    );
}

export default RegisterForm