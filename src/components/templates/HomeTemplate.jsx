import { usePageTitle } from "../../hooks/usePageTitle"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"

export function HomeTemplate(props) {
  usePageTitle(props.title || 'Inicio')

  return (
    <div>
      {/* Título y subtítulo dinámicos usando los átomos */}
      <div className="mb-4">
        <Heading level={1} className="h2 fw-bold mb-1">
          {props.title}
        </Heading>
        {props.subtitle && (
          <Text tone="muted" className="fs-5 mb-0">
            {props.subtitle}
          </Text>
        )}
      </div>

      {/* Aquí se renderiza lo que le pasen en la prop actions */}
      <div className="mt-4">
        {props.actions}
      </div>
    </div>
  )
}