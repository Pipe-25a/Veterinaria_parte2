import AppointmentRow from '../molecules/AppointmentRow';

// Organismo: Tabla que muestra las citas con sus datos y acciones disponibles
function AppointmentsTable({ appointments = [], onConfirm, onReschedule, onCancel }) {
  if (!appointments || appointments.length === 0) {
    return (
      <p className="text-center text-muted my-4">
        No hay citas registradas.
      </p>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Dueño</th>
            <th>Mascota</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
              showOwner={true}
              serviceName={appointment.serviceName}
              onConfirm={onConfirm}
              onReschedule={onReschedule}
              onCancel={onCancel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable;
