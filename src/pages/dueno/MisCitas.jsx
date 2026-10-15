import { useAuth } from '../../context/AuthContext';
import { getCitasByDueno } from '../../services/citaService';
import { getMascotaById } from '../../services/mascotaService';
import CitaCard from '../../components/molecules/CitaCard';

const MisCitas = () => {
  const { user } = useAuth();
  const citas = getCitasByDueno(user.correo);

  return (
    <>
      <h2 className="mb-4">Mis citas</h2>
      {citas.length === 0 ? (
        <p className="text-muted">No tienes citas agendadas.</p>
      ) : (
        citas.map((c) => (
          <CitaCard
            key={c.id}
            cita={c}
            nombreMascota={getMascotaById(c.mascotaId)?.nombre ?? 'Mascota'}
          />
        ))
      )}
    </>
  );
};

export default MisCitas;