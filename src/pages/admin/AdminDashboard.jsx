import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '../../components/organisms/Sidebar'
import { DashboardTemplate } from '../../components/templates/DashboardTemplate'

import {AdminHomePage} from './AdminHomePage'
import {AdminUsersPage} from './AdminUsersPage'
import {AdminCatalogPage} from './AdminCatalogPage'
import {AdminReportsPage} from './AdminReportsPage' 

const LINKS = [
    { to: '/admin', label: 'Inicio', end: true },
    { to: '/admin/usuarios', label: 'Gestión de Usuarios' },
    { to: '/admin/catalogo', label: 'Catálogo y Stock' },
    { to: '/admin/reportes', label: 'Reportes' }, 
]

export const AdminDashboard = () => (
    <DashboardTemplate sidebar={<Sidebar links={LINKS} />}>
        <Routes>
            <Route index element={<AdminHomePage />} />
            <Route path="usuarios" element={<AdminUsersPage />} />
            <Route path="catalogo" element={<AdminCatalogPage />} />
            <Route path="reportes" element={<AdminReportsPage />} /> 
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    </DashboardTemplate>
)
