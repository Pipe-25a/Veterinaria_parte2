import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../context/AuthContext'

// Mockeamos el hook useAuth
vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn()
}))

describe('ProtectedRoute', () => {
    it('redirige a /login si no hay usuario', () => {
        useAuth.mockReturnValue({ user: null })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={<ProtectedRoute roles={['admin']}><div>Admin Panel</div></ProtectedRoute>} />
                    <Route path="/login" element={<div>Página de Login</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Página de Login')).toBeInTheDocument()
        expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument()
    })

    it('redirige a / si el rol no está permitido', () => {
        useAuth.mockReturnValue({ user: { role: 'dueno' } })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={<ProtectedRoute roles={['admin']}><div>Admin Panel</div></ProtectedRoute>} />
                    <Route path="/" element={<div>Home Público</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Home Público')).toBeInTheDocument()
    })

    it('renderiza el children si el usuario tiene el rol correcto', () => {
        useAuth.mockReturnValue({ user: { role: 'admin' } })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/admin" element={<ProtectedRoute roles={['admin']}><div>Admin Panel</div></ProtectedRoute>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Admin Panel')).toBeInTheDocument()
    })
})