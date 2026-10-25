import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyAppointments } from './MyAppointments'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ user: { email: 'test@correo.com' } })
}))
vi.mock('../../services/appointmentService', () => ({
    getAppointmentsByDueno: vi.fn(() => [
        { id: 1, duenoEmail: 'test@correo.com', petId: 1, date: '2026-10-25', time: '10:00', type: 'Control', status: 'pending' }
    ]),
    updateAppointmentStatus: vi.fn(() => ({ ok: true })),
    rescheduleAppointment: vi.fn(() => ({ ok: true }))
}))
vi.mock('../../services/petService', () => ({
    getPetById: vi.fn(() => ({ id: 1, name: 'Luna', species: 'dog' }))
}))

describe('MyAppointments', () => {
    it('muestra las citas del dueño y permite confirmar', async () => {
        render(<MemoryRouter><MyAppointments /></MemoryRouter>)

        // Verifica que pinte los datos
        expect(screen.getByText('Luna')).toBeInTheDocument()
        expect(screen.getByText('Control')).toBeInTheDocument()
        expect(screen.getByText('Pendiente')).toBeInTheDocument()

        // Botón de confirmar
        const btnConfirm = screen.getByRole('button', { name: /Confirmar/i })
        await userEvent.click(btnConfirm)

        // Como mockeamos el update a true, debería refrescar sin errores.
        expect(screen.queryByText('Cita no encontrada')).not.toBeInTheDocument()
    })
})