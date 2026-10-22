// Recibe un número y lo devuelve formateado como pesos chilenos (CLP).
export function formatPrice(price) {
  if (typeof price !== 'number' || !Number.isFinite(price)) return '—'
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)
}