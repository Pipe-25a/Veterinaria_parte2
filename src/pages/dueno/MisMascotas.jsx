import { useAuth } from '../../context/AuthContext';
import { getMascotasByDueno } from '../../services/mascotaService';
import MascotaCard from '../../components/molecules/MascotaCard';

const MisMascotas = () => {
  const { user } = useAuth();
  const mascotas = getMascotasByDueno(user.correo);

  return (
    <>
      <h2 className="mb-4">Mis mascotas</h2>
      {mascotas.length === 0 ? (
        <p className="text-muted">Aún no tienes mascotas registradas.</p>
      ) : (
        <div className="row g-3">
          {mascotas.map((m) => (
            <div className="col-md-4" key={m.id}>
              <MascotaCard mascota={m} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MisMascotas;