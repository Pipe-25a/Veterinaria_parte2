import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge (prueba que falla a propósito)', () => {
    it('espera el texto "Inactivo" pero el componente dice "Activo"', () => {
        render(<Badge tone="danger">Activo</Badge>)

        // ❌ Este expect fallará porque el texto es "Activo", no "Inactivo"
        expect(screen.getByText('Inactivo')).toBeInTheDocument()
    })
})