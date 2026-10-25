import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'

describe('AppointmentStatusBadge', () => {
    it('muestra "Pendiente" con tone warning para status pending', () => {
        render(<AppointmentStatusBadge status="pending" />)
        const badge = screen.getByText('Pendiente')
        expect(badge).toHaveClass('text-bg-warning')
    })

    it('muestra "Cancelada" con tone neutral para status cancelled', () => {
        render(<AppointmentStatusBadge status="cancelled" />)
        const badge = screen.getByText('Cancelada')
        expect(badge).toHaveClass('text-bg-secondary')
    })
})