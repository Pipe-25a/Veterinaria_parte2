import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
    it('llama a onClick al hacer clic y aplica la variante correcta', async () => {
        const onClick = vi.fn()
        render(<Button variant="success" onClick={onClick}>Guardar</Button>)

        const boton = screen.getByRole('button', { name: 'Guardar' })
        expect(boton).toHaveClass('btn', 'btn-success')

        await userEvent.click(boton)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('se deshabilita cuando recibe disabled=true', () => {
        render(<Button disabled>Guardar</Button>)
        expect(screen.getByRole('button', { name: 'Guardar' })).toBeDisabled()
    })
})