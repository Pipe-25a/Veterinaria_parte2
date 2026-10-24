import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../../components/organisms/Sidebar'
import { DashboardTemplate } from '../../components/templates/DashboardTemplate'

import VetHomePage from './VetHomePage'
import VetCitasPage from './VetCitasPage'
import VetHistorialPage from './VetHistorialPage'
import VetFichasPage from './VetFichasPage'
import VetReportesPage from './VetReportesPage'

const LINKS = [
    { to: '/vet', label: 'Inicio', end: true },
    { to: '/vet/citas', label: 'Citas' },
    { to: '/vet/historial', label: 'Historial' },
    { to: '/vet/fichas', label: 'Fichas' },
    { to: '/vet/reportes', label: 'Reportes' },
]

const VetDashboard = () => (
    <DashboardTemplate sidebar={<Sidebar links={LINKS} />}>
        <Routes>
            <Route index element={<VetHomePage />} />
            <Route path="citas" element={<VetCitasPage />} />
            <Route path="historial" element={<VetHistorialPage />} />
            <Route path="fichas" element={<VetFichasPage />} />
            <Route path="reportes" element={<VetReportesPage />} />
            <Route path="*" element={<Navigate to="/vet" replace />} />
        </Routes>
    </DashboardTemplate>
)

export default VetDashboard
