import { useState } from 'react';
import Select from '../atoms/Select';

const CitaForm = ({ mascotas, tipos, onSubmit }) => {
  const [form, setForm] = useState({ mascotaId: '', fecha: '', hora: '', tipo: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onSubmit(form);
    if (!result.ok) setError(result.error);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="mascotaId" className="form-label">Mascota</label>
        <Select
          id="mascotaId"
          name="mascotaId"
          value={form.mascotaId}
          onChange={handleChange}
          options={mascotas.map((m) => ({ value: m.id, label: m.nombre }))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de consulta</label>
        <Select
          id="tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          options={tipos.map((t) => ({ value: t, label: t }))}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input id="fecha" name="fecha" type="date" className="form-control"
            value={form.fecha} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="hora" className="form-label">Hora</label>
          <input id="hora" name="hora" type="time" className="form-control"
            value={form.hora} onChange={handleChange} />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary">Agendar cita</button>
    </form>
  );
};

export default CitaForm;