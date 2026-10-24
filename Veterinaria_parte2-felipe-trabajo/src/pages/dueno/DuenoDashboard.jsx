import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../../components/organisms/Sidebar'
import { DashboardTemplate } from '../../components/templates/DashboardTemplate'
import HomeDueno from './HomeDueno'
import Contact from './Contact'
import Services from './Services'
import AppointmentPage from '../AppointmentPage'

const LINKS = [
  { to: '/dueno', label: 'Inicio', end: true },
  { to: '/dueno/citas/nueva', label: 'Agendar cita' },
  { to: '/dueno/contacto', label: 'Contacto' },
  { to: '/dueno/servicios', label: 'Servicios y productos' },
]

const DuenoDashboard = () => (
  <DashboardTemplate sidebar={<Sidebar links={LINKS} />}>
    <Routes>
      <Route index element={<HomeDueno />} />
      <Route path="citas/nueva" element={<AppointmentPage />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="servicios" element={<Services />} />
      <Route path="*" element={<Navigate to="/dueno" replace />} />
    </Routes>
  </DashboardTemplate>
)

export default DuenoDashboard