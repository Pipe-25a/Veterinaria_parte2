import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
    it('renderiza el texto de los children con tone neutral por defecto', () => {
        render(<Badge>Nuevo</Badge>)
        const badge = screen.getByText('Nuevo')
        expect(badge).toBeInTheDocument()
        expect(badge).toHaveClass('badge', 'text-bg-secondary')
    })

    it('aplica la clase de color correcta según tone y pill', () => {
        render(<Badge tone="success" pill>Activo</Badge>)
        const badge = screen.getByText('Activo')
        expect(badge).toHaveClass('badge', 'text-bg-success', 'rounded-pill')
    })
})