import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { agregarMascota } from '../../services/mascotaService';
import { ESPECIES } from '../../constants/especies';
import MascotaForm from '../../components/organisms/MascotaForm';

const AgregarMascota = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (form) => {
    const result = agregarMascota({ ...form, duenoEmail: user.email });
    if (result.ok) navigate('/dueno/mascotas');
    return result;
  };

  return (
    <>
      <h2 className="mb-4">Agregar mascota</h2>
      <MascotaForm especies={ESPECIES} onSubmit={handleSubmit} />
    </>
  );
};

export default AgregarMascota;