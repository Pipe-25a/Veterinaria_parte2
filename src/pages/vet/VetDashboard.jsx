import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '../../components/organisms/Sidebar'
import { DashboardTemplate } from '../../components/templates/DashboardTemplate'

import { VetHomePage } from './VetHomePage'
import { VetAppointmentPage } from './VetAppointmentPage'
import { VetHistoryPage } from './VetHistoryPage'
import { VetRecordsPage } from './VetRecordsPage'
import { VetReportsPage } from './VetReportsPage'

const LINKS = [
    { to: '/vet', label: 'Inicio', end: true },
    { to: '/vet/citas', label: 'Citas' },
    { to: '/vet/historial', label: 'Historial' },
    { to: '/vet/fichas', label: 'Fichas' },
    { to: '/vet/reportes', label: 'Reportes' },
]

export function VetDashboard() {
    return (
        <DashboardTemplate sidebar={<Sidebar links={LINKS} />}>
            <Routes>
                <Route index element={<VetHomePage />} />
                <Route path="citas" element={<VetAppointmentPage />} />
                <Route path="historial" element={<VetHistoryPage />} />
                <Route path="fichas" element={<VetRecordsPage />} />
                <Route path="reportes" element={<VetReportsPage />} />
                <Route path="*" element={<Navigate to="/vet" replace />} />
            </Routes>
        </DashboardTemplate>
    )
}
