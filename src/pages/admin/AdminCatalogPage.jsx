import { useTituloPagina } from '../../hooks/useTituloPagina'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CatalogTable } from '../../components/organisms/CatalogTable'
import { Price } from '../../components/atoms/Price'
import serviciosData from '../../data/servicios.json'
import medicamentosData from '../../data/medicamentos.json'

// Formateador de precios usando tu átomo
const renderPrice = (value) => <Price value={value} />

const SERVICE_COLUMNS = [
    { key: 'categoria', header: 'Categoría' },
    { key: 'servicio', header: 'Servicio' },
    { key: 'precio', header: 'Precio', className: 'text-end', render: renderPrice },
]

const MEDICATION_COLUMNS = [
    { key: 'nombre', header: 'Producto' },
    { key: 'categoria', header: 'Categoría' },
    { key: 'presentacion', header: 'Presentación' },
    { key: 'precio', header: 'Precio', className: 'text-end', render: renderPrice },
]

export default function AdminCatalogPage() {
    useTituloPagina('Gestión de Catálogo')

    return (
        <CatalogTemplate
            title="Gestión de Catálogo"
            subtitle="Administra los servicios y medicamentos en stock de la clínica."
        >
            <CatalogTable
                title="Catálogo de Servicios"
                description="Servicios ofrecidos a los clientes."
                columns={SERVICE_COLUMNS}
                rows={serviciosData}
            />

            <CatalogTable
                title="Medicamentos y Vacunas en Stock"
                description="Inventario actual de la clínica."
                columns={MEDICATION_COLUMNS}
                rows={medicamentosData}
            />
        </CatalogTemplate>
    )
}