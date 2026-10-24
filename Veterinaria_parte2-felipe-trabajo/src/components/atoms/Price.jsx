import { formatPrice } from '../../utils/formatPrice'

// Átomo: muestra un precio. Si hay un precio anterior mayor, lo muestra tachado.
// Acepta números o textos numéricos ("12990"). Si el valor no sirve (vacío, undefined,
// texto), muestra "emptyText" en vez de romper toda la pantalla.
const toNumber = (value) =>
  value === null || value === undefined || value === '' ? NaN : Number(value)

export function Price(props) {
  const { value, previous = null, emptyText = '—', className = '', ...rest } = props

  const current = toNumber(value)
  if (!Number.isFinite(current)) {
    return (
      <span {...rest} className={className}>
        {emptyText}
      </span>
    )
  }

  const old = toNumber(previous)
  const onSale = Number.isFinite(old) && old > current

  return (
    <span {...rest} className={className}>
      <span className="fw-bold">{formatPrice(current)}</span>
      {onSale && (
        <span className="text-body-secondary ms-2">
          <span className="visually-hidden">Precio anterior: </span>
          <s>{formatPrice(old)}</s>
        </span>
      )}
    </span>
  )
}
