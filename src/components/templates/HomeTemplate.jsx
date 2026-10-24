import { usePageTitle } from "../../hooks/usePageTitle"

export function HomeTemplate(props) {
  usePageTitle(props.title || 'Inicio')

  return (
    <div>
      {/* Título y subtítulo dinámicos */}
      <div className="mb-4">
        <h2 className="fw-bold">{props.title}</h2>
        {props.subtitle && <p className="text-muted fs-5">{props.subtitle}</p>}
      </div>

      {/* Aquí se renderiza lo que le pasen en la prop actions */}
      <div className="mt-4">
        {props.actions}
      </div>
    </div>
  )
}