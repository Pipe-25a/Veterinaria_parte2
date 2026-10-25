import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'

describe('Select', () => {
    it('renderiza las opciones y el placeholder', () => {
        render(
            <Select
                id="test"
                placeholder="Elige uno"
                options={[{ value: '1', label: 'Uno' }, 'Dos']}
            />
        )

        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Elige uno' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Uno' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Dos' })).toBeInTheDocument()
    })

    it('aplica la clase is-invalid si invalid es true', () => {
        render(<Select invalid={true} options={[]} />)
        expect(screen.getByRole('combobox')).toHaveClass('is-invalid')
    })
})