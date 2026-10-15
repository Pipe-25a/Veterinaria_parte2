import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMascotasByDueno } from '../../services/mascotaService';
import { agendarCita } from '../../services/citaService';
import { TIPOS_CONSULTA } from '../../constants/tiposConsulta';
import CitaForm from '../../components/organisms/CitaForm';

const AgendarCita = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const mascotas = getMascotasByDueno(user.correo);

  const handleSubmit = (form) => {
    const result = agendarCita({ ...form, duenoEmail: user.correo });
    if (result.ok) navigate('/dueno');
    return result;
  };

  return (
    <>
      <h2 className="mb-4">Agendar cita</h2>
      {mascotas.length === 0 ? (
        <p className="text-muted">Necesitas una mascota registrada para agendar.</p>
      ) : (
        <CitaForm mascotas={mascotas} tipos={TIPOS_CONSULTA} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default AgendarCita;