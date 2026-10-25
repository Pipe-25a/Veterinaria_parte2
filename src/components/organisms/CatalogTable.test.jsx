import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CatalogTable } from './CatalogTable'

describe('CatalogTable', () => {
    const columns = [
        { key: 'nombre', header: 'Nombre' },
        { key: 'precio', header: 'Precio' },
    ]

    it('renderiza una fila por cada elemento de rows', () => {
        const rows = [
            { id: 1, nombre: 'Consulta', precio: 20000 },
            { id: 2, nombre: 'Vacuna', precio: 15000 },
        ]
        render(<CatalogTable title="Servicios" columns={columns} rows={rows} />)

        expect(screen.getByRole('heading', { name: 'Servicios' })).toBeInTheDocument()
        const filas = screen.getAllByRole('row')
        // 1 fila de header + 2 de datos
        expect(filas).toHaveLength(3)
        expect(screen.getByText('Consulta')).toBeInTheDocument()
        expect(screen.getByText('Vacuna')).toBeInTheDocument()
    })

    it('muestra el texto vacío cuando rows está vacío', () => {
        render(
            <CatalogTable
                title="Servicios"
                columns={columns}
                rows={[]}
                emptyText="Sin servicios"
            />
        )
        expect(screen.getByText('Sin servicios')).toBeInTheDocument()
    })
})