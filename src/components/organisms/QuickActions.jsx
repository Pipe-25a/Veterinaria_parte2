// Organismo: cuadrícula de ActionCard. Recibe la lista de acciones por props:
// actions = [{ title, description, actionLabel, href }]
import { ActionCard } from '../molecules/ActionCard'

export function QuickActions(props) {
  const { actions = [], onNavigate } = props

  return (
    <div className="row g-3">
      {actions.map((action) => (
        <div className="col-12 col-md-6 col-xl-4" key={action.href}>
          <ActionCard {...action} onNavigate={onNavigate} />
        </div>
      ))}
    </div>
  )
}
