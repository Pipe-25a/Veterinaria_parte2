import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/organisms/Sidebar';
import MisCitas from './MisCitas';
import MisMascotas from './MisMascotas';
import AgendarCita from './AgendarCita';

const LINKS = [
  { to: '/dueno', label: 'Mis citas', end: true },
  { to: '/dueno/mascotas', label: 'Mis mascotas' },
  { to: '/dueno/citas/nueva', label: 'Agendar cita' },
];

const DuenoDashboard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 col-lg-2 px-0">
        <Sidebar links={LINKS} />
      </div>
      <main className="col-md-9 col-lg-10 p-4">
        <Routes>
          <Route index element={<MisCitas />} />
          <Route path="mascotas" element={<MisMascotas />} />
          <Route path="citas/nueva" element={<AgendarCita />} />
          <Route path="*" element={<Navigate to="/dueno" replace />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default DuenoDashboard;