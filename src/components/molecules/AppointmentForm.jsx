import { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputField from '../atoms/InputField';
import SelectField from '../atoms/SelectField';
import SubmitButton from '../atoms/SubmitButton';


function AppointmentForm({ onSubmit, loading }) {
    const [nombre, setNombre] = useState('');  // minúscula
    const [email, setEmail] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [tipoMascota, setTipoMascota] = useState('');
    const [tipoConsulta, setTipoConsulta] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ nombre, email, nombreMascota, tipoMascota, tipoConsulta });
    };


    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                controlId="formNombre"
                label="Nombre completo"
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
                controlId="formNombreMascota"
                label="Nombre mascota"
                type="text"
                placeholder="Ingrese el Nombre de su Mascota"
                value={nombreMascota}
                onChange={(e) => setNombreMascota(e.target.value)}
            />


            <SelectField
                controlId="formTipoMascota"
                label="Tipo de mascota"
                value={tipoMascota}
                onChange={(e) => setTipoMascota(e.target.value)}
                options={[
                    { value: '', label: 'Seleccione una opción' },
                    { value: 'perro', label: 'Perro' },
                    { value: 'gato', label: 'Gato' },
                    { value: 'ave', label: 'Ave' },
                    { value: 'otro', label: 'Otro' },
                ]}
            />


            <SelectField
                controlId="formTipoConsulta"
                label="Tipo de consulta"
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
                options={[
                    { value: '', label: 'Seleccione una opción' },
                    { value: 'general', label: 'Consulta general' },
                    { value: 'vacunacion', label: 'Vacunación' },
                    { value: 'emergencia', label: 'Emergencia' },
                    { value: 'control', label: 'Control' },
                ]}
            />

            <SubmitButton disabled={loading}>
                {loading ? 'Agendando Cita...' : 'Agendar Cita'}
            </SubmitButton>
        </Form>
    );
}


export default AppointmentForm;
