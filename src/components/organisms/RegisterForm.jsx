import { useState } from 'react';
import FormField from '../molecules/FormField';
import SubmitButton from '../atoms/SubmitButton';

function RegisterForm({ onSubmit, error, loading }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <FormField
                id="nombre"
                label="Nombre completo"
                type="text"
                placeholder="Ingrese su nombre completo"
                value={formData.nombre}
                onChange={handleChange}
            />

            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su correo"
                value={formData.email}
                onChange={handleChange}
            />

            <FormField
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
            />

            <SubmitButton disabled={loading}>
                {loading ? 'Registrando Usuario...' : 'Registrarse'}
            </SubmitButton>
        </form>
    );
}

export default RegisterForm;