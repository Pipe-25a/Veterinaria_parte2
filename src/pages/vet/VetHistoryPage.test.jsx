import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VetHistoryPage } from './VetHistoryPage'
import { MemoryRouter } from 'react-router-dom'

// Mockeamos los servicios
vi.mock('../../services/vetService', () => ({
    getVetHistory: vi.fn(() => []),
    saveVetHistory: vi.fn(),
}))
vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ user: { name: 'Dra. Test' } })
}))

describe('VetHistoryPage', () => {
    it('registra una atención manual sin crashear (regresión de formData.owner)', async () => {
        render(<MemoryRouter><VetHistoryPage /></MemoryRouter>)

        // Llenamos el formulario
        await userEvent.type(screen.getByLabelText(/Mascota/i), 'Rex')
        await userEvent.selectOptions(screen.getByLabelText(/Especie/i), 'Perro')
        await userEvent.type(screen.getByLabelText(/Dueño/i), 'Juan Perez')
        await userEvent.selectOptions(screen.getByLabelText(/Tipo de atención/i), 'Consulta')

        // Fecha (el input de HTML type="date" se setea directo)
        const dateInput = screen.getByLabelText(/Fecha/i)
        await userEvent.type(dateInput, '2026-10-25')

        // Click en guardar
        const submitBtn = screen.getByRole('button', { name: /Guardar en historial/i })
        await userEvent.click(submitBtn)

        // Si no crashea y guarda bien, debería salir el mensaje de éxito
        await waitFor(() => {
            expect(screen.getByText('Atención registrada correctamente.')).toBeInTheDocument()
        })
    })
})