import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
    it('muestra el título y el subtítulo cuando se reciben por props', () => {
        render(<PageHeader title="Mis Citas" subtitle="Revisa tus próximas citas" />)

        expect(screen.getByRole('heading', { level: 1, name: 'Mis Citas' })).toBeInTheDocument()
        expect(screen.getByText('Revisa tus próximas citas')).toBeInTheDocument()
    })

    it('no renderiza subtítulo si no se pasa la prop', () => {
        render(<PageHeader title="Mis Citas" />)
        expect(screen.queryByText(/Revisa tus próximas citas/i)).not.toBeInTheDocument()
    })
})