import { useTituloPagina } from "../../hooks/useTituloPagina"

export function HomeTemplate(props) {
  useTituloPagina(props.title || 'Inicio')

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