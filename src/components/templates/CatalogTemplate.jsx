// Template: pantalla de catálogo = encabezado + secciones una bajo otra.
// Las secciones llegan como "children" (por ejemplo varios <CatalogTable />).
import { PageHeader } from '../molecules/PageHeader'

export function CatalogTemplate(props) {
  const { title, subtitle, children } = props

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {children}
    </>
  )
}
