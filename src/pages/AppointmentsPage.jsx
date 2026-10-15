import { useState, useEffect } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import AppointmentsTable from '../components/organisms/AppointmentsTable';

const DEFAULT_APPOINTMENTS = [
  { id: 1, ownerName: 'María Pérez', petName: 'Rex', species: 'dog', serviceName: 'Consulta', date: '2026-09-08', time: '10:00', status: 'pending' },
  { id: 2, ownerName: 'Juan Torres', petName: 'Michi', species: 'cat', serviceName: 'Vacunación', date: '2026-09-08', time: '11:30', status: 'pending' },
  { id: 3, ownerName: 'Ana Ríos', petName: 'Copito', species: 'dog', serviceName: 'Cirugía', date: '2026-09-09', time: '09:00', status: 'pending' }
];

// Pagina: Administracion y visualizacion de las citas veterinarias
function AppointmentsPage({ user, handleLogout, onLogout }) {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('mis_citas');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error al leer mis_citas de localStorage', err);
      }
    }
    return DEFAULT_APPOINTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('mis_citas', JSON.stringify(appointments));
  }, [appointments]);

  const handleConfirm = (id) => {
    setAppointments((prev) =>
      prev.map((cita) => (cita.id === id ? { ...cita, status: 'confirmed' } : cita))
    );
  };

  const handleReschedule = (id) => {
    setAppointments((prev) =>
      prev.map((cita) => (cita.id === id ? { ...cita, status: 'rescheduled' } : cita))
    );
  };

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((cita) => (cita.id === id ? { ...cita, status: 'cancelled' } : cita))
    );
  };

  return (
    <DashboardTemplate user={user} onLogout={handleLogout || onLogout}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Listado de Citas</h2>
        <AppointmentsTable
          appointments={appointments}
          onConfirm={handleConfirm}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />
      </div>
    </DashboardTemplate>
  );
}

export default AppointmentsPage;
