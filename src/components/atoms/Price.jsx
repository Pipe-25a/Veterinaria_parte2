import { formatPrice } from '../../../utils/formatPrice'

// Átomo: muestra un precio. Si hay un precio anterior mayor, lo muestra tachado.
export function Price(props) {
  const previous = props.previous ?? null
  const onSale = previous !== null && previous > props.value
  const className = props.className ?? ''

  return (
    <span className={className}>
      <span className="fw-bold">{formatPrice(props.value)}</span>
      {onSale && (
        <span className="text-muted ms-2" aria-label="Precio anterior">
          <s>{formatPrice(previous)}</s>
        </span>
      )}
    </span>
  )
}