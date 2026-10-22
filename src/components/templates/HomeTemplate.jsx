// Template: pantalla de inicio = encabezado + zona de accesos rápidos.
// "actions" recibe el organismo con los accesos (por ejemplo <QuickActions />).
import { PageHeader } from '../molecules/PageHeader'

export function HomeTemplate(props) {
  const { title, subtitle, actions } = props

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {actions}
    </>
  )
}
