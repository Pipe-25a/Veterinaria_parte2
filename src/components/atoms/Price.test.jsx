import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Price } from './Price'

describe('Price', () => {
    it('muestra el precio formateado cuando el valor es válido', () => {
        render(<Price value={12990} />)
        expect(screen.getByText('$12.990')).toBeInTheDocument()
    })

    it('muestra emptyText cuando el valor no es numérico', () => {
        render(<Price value="" emptyText="Sin precio" />)
        expect(screen.getByText('Sin precio')).toBeInTheDocument()
    })
})