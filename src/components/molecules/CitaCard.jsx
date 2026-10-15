import Badge from '../atoms/Badge';

const CitaCard = ({ cita, nombreMascota }) => (
  <div className="card mb-3">
    <div className="card-body d-flex justify-content-between align-items-center">
      <div>
        <h6 className="mb-1">{cita.tipo} · {nombreMascota}</h6>
        <small className="text-muted">{cita.fecha} a las {cita.hora}</small>
      </div>
      <Badge estado={cita.estado} />
    </div>
  </div>
);

export default CitaCard;