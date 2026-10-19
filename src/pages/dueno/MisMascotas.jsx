import { useAuth } from '../../context/AuthContext';
import { getMascotasByDueno } from '../../services/mascotaService';
import MascotaCard from '../../components/molecules/MascotaCard';
import { Link } from 'react-router-dom'

const MisMascotas = () => {
  const { user } = useAuth();
  const mascotas = getMascotasByDueno(user.email);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mis mascotas</h2>
      <Link to="/dueno/mascotas/nueva" className="btn btn-primary">Agregar mascota</Link>
    </div>
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