// Servicios del dueño: aporta los datos y las columnas; el layout lo pone el template.
import { useTituloPagina } from '../../hooks/useTituloPagina'
import  servicios  from '../../data/servicios.json'
import  medicamentos  from '../../data/medicamentos.json'
import { Price } from '../../components/atoms/Price'
import { CatalogTemplate } from '../../components/templates/CatalogTemplate'
import { CatalogTable } from '../../components/organisms/CatalogTable'

const renderPrice = (value) => <Price value={value} />

const SERVICE_COLUMNS = [
  { key: 'categoria', header: 'Categoría' },
  { key: 'servicio', header: 'Servicio' },
  { key: 'precio', header: 'Precio desde', className: 'text-end', render: renderPrice },
]

const MEDICATION_COLUMNS = [
  { key: 'nombre', header: 'Producto' },
  { key: 'categoria', header: 'Categoría' },
  { key: 'presentacion', header: 'Presentación' },
  { key: 'precio', header: 'Precio', className: 'text-end', render: renderPrice },
]

export function Services() {
  useTituloPagina('Servicios y productos')

  return (
    <CatalogTemplate
      title="Servicios y productos"
      subtitle="Catálogo de consulta. Para reservar una hora usa la opción Agendar cita."
    >
      <CatalogTable
        title="Servicios"
        description="Valores referenciales, pueden variar según la mascota."
        columns={SERVICE_COLUMNS}
        rows={servicios}
      />
      <CatalogTable
        title="Medicamentos y productos"
        description="Disponibilidad sujeta a stock."
        columns={MEDICATION_COLUMNS}
        rows={medicamentos}
      />
    </CatalogTemplate>
  )
}
