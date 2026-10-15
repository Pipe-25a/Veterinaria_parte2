const MascotaCard = ({ mascota }) => (
  <div className="card h-100">
    <div className="card-body">
      <h5 className="card-title">{mascota.nombre}</h5>
      <p className="card-text mb-1">{mascota.especie} · {mascota.raza}</p>
      <small className="text-muted">{mascota.edad} años</small>
    </div>
  </div>
);

export default MascotaCard;