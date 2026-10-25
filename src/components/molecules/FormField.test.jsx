import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormField } from './FormField'

describe('FormField', () => {
    it('renderiza label, input y propaga onChange', async () => {
        const onChange = vi.fn()
        render(
            <FormField
                id="email"
                label="Correo"
                type="email"
                value=""
                onChange={onChange}
            />
        )

        expect(screen.getByLabelText('Correo')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Correo'), 'a')
        expect(onChange).toHaveBeenCalled()
    })

    it('muestra el mensaje de error cuando recibe la prop error', () => {
        render(<FormField id="email" label="Correo" error="Correo inválido" />)
        expect(screen.getByRole('alert')).toHaveTextContent('Correo inválido')
    })
})