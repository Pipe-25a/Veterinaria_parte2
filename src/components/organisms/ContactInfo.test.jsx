import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactInfo } from './ContactInfo'

describe('ContactInfo', () => {
    const items = [
        { id: 1, label: 'Teléfono', value: '+56 2 2345 6789', href: 'tel:+56223456789' },
        { id: 2, label: 'Correo', value: 'info@clinica.com', href: 'mailto:info@clinica.com' },
    ]

    it('muestra un ContactItem por cada elemento de items', () => {
        render(<ContactInfo items={items} />)
        expect(screen.getByText('Teléfono')).toBeInTheDocument()
        expect(screen.getByText('Correo')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: '+56 2 2345 6789' })).toHaveAttribute(
            'href',
            'tel:+56223456789'
        )
    })

    it('usa el título por defecto y el personalizado cuando se pasa por props', () => {
        const { rerender } = render(<ContactInfo items={items} />)
        expect(screen.getByRole('heading', { name: /información de contacto/i })).toBeInTheDocument()

        rerender(<ContactInfo title="Contáctanos" items={items} />)
        expect(screen.getByRole('heading', { name: 'Contáctanos' })).toBeInTheDocument()
    })
})