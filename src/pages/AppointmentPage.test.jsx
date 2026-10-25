import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppointmentPage } from './AppointmentPage'
import { MemoryRouter } from 'react-router-dom'

// Mocks
vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({ user: { email: 'test@correo.com', name: 'Test' } })
}))
vi.mock('../services/petService', () => ({
    getPetsByDueno: vi.fn(() => []), // Simulamos que no tiene mascotas
    addPet: vi.fn(() => ({ ok: true, pet: { id: 99, name: 'Firulais' } }))
}))
vi.mock('../services/appointmentService', () => ({
    bookAppointment: vi.fn(() => ({ ok: true }))
}))

describe('AppointmentPage', () => {
    it('crea mascota y agenda la cita correctamente', async () => {
        render(<MemoryRouter><AppointmentPage /></MemoryRouter>)

        await userEvent.type(screen.getByLabelText(/Nombre de la mascota/i), 'Firulais')
        await userEvent.selectOptions(screen.getByLabelText(/Especie/i), 'dog')
        await userEvent.type(screen.getByLabelText(/Fecha de la cita/i), '2026-11-01')
        await userEvent.type(screen.getByLabelText(/Hora de la cita/i), '10:00')
        await userEvent.selectOptions(screen.getByLabelText(/Servicio/i), 'Control')

        await userEvent.click(screen.getByRole('button', { name: /Agendar Cita/i }))

        await waitFor(() => {
            expect(screen.getByText(/Cita agendada para Firulais/i)).toBeInTheDocument()
        })
    })
})