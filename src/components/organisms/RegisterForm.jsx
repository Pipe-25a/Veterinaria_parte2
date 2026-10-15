import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';

function RegisterForm({ onSubmit, error, loading }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recargar la página
        //  Importante: Las claves del objeto deben llamarse nombre, email y password
        onSubmit({ nombre, email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <FormField
                id="nombre"
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
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
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </SubmitButton>
        </form>
    );
}

export default RegisterForm;