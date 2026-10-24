import { usePageTitle } from '../../hooks/usePageTitle'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CatalogTable } from '../../components/organisms/CatalogTable'
import { Price } from '../../components/atoms/Price'
import servicesData from '../../data/services.json'
import medicationsData from '../../data/medications.json'

const renderPrice = (value) => <Price value={value} />

const SERVICE_COLUMNS = [
    { key: 'category', header: 'Categoría' },
    { key: 'service', header: 'Servicio' },
    { key: 'price', header: 'Precio', className: 'text-end', render: renderPrice },
]

const MEDICATION_COLUMNS = [
    { key: 'name', header: 'Producto' },
    { key: 'category', header: 'Categoría' },
    { key: 'presentation', header: 'Presentación' },
    { key: 'price', header: 'Precio', className: 'text-end', render: renderPrice },
]

export function AdminCatalogPage() {
    usePageTitle('Gestión de Catálogo')

    return (
        <CatalogTemplate
            title="Gestión de Catálogo"
            subtitle="Administra los servicios y medicamentos en stock de la clínica."
        >
            <CatalogTable
                title="Catálogo de Servicios"
                description="Servicios ofrecidos a los clientes."
                columns={SERVICE_COLUMNS}
                rows={servicesData}
            />

            <CatalogTable
                title="Medicamentos y Vacunas en Stock"
                description="Inventario actual de la clínica."
                columns={MEDICATION_COLUMNS}
                rows={medicationsData}
            />
        </CatalogTemplate>
    )
}