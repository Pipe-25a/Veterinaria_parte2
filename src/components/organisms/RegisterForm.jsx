// src/components/organisms/RegisterForm.jsx
import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';
import { validationRegister } from '../../utils/validationRegister'; // 👈 Importación aislada

function RegisterForm({ onSubmit, error: apiError, loading }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ejecuta la validación aislada del Registro
        const { errors: newErrors, isValid } = validationRegister({ nombre, email, password });
        setErrors(newErrors);

        if (isValid) {
            onSubmit({ nombre, email, password });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {apiError && <div className="alert alert-danger mb-3">{apiError}</div>}

            <FormField
                id="nombre"
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={nombre}
                onChange={(e) => {
                    setNombre(e.target.value);
                    if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: '' }));
                }}
                error={errors.nombre}
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

            <SubmitButton disabled={loading}>
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </SubmitButton>
        </form>
    );
}

export default RegisterForm;