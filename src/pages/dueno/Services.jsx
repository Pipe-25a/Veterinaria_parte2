// Servicios del dueño: aporta los datos y las columnas; el layout lo pone el template.
import { usePageTitle } from '../../hooks/usePageTitle'
import services from '../../data/services.json'
import medications from '../../data/medications.json'
import { Price } from '../../components/atoms/Price'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CatalogTable } from '../../components/organisms/CatalogTable'

const renderPrice = (value) => <Price value={value} />

const SERVICE_COLUMNS = [
  { key: 'category', header: 'Categoría' },
  { key: 'service', header: 'Servicio' },
  { key: 'price', header: 'Precio desde', className: 'text-end', render: renderPrice },
]

const MEDICATION_COLUMNS = [
  { key: 'name', header: 'Producto' },
  { key: 'category', header: 'Categoría' },
  { key: 'presentation', header: 'Presentación' },
  { key: 'price', header: 'Precio', className: 'text-end', render: renderPrice },
]

export function Services() {
  usePageTitle('Servicios y productos')

  return (
    <CatalogTemplate
      title="Servicios y productos"
      subtitle="Catálogo de consulta. Para reservar una hora usa la opción Agendar cita."
    >
      <CatalogTable
        title="Servicios"
        description="Valores referenciales, pueden variar según la mascota."
        columns={SERVICE_COLUMNS}
        rows={services}
      />
      <CatalogTable
        title="Medicamentos y productos"
        description="Disponibilidad sujeta a stock."
        columns={MEDICATION_COLUMNS}
        rows={medications}
      />
    </CatalogTemplate>
  )
}
