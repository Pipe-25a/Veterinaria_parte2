// Átomo: etiqueta pequeña para mostrar un estado o categoría.
// Cada "tone" se traduce a una clase de color de Bootstrap.
const TONES = {
  neutral: 'text-bg-secondary',
  brand: 'text-bg-primary',
  success: 'text-bg-success',
  warning: 'text-bg-warning',
  danger: 'text-bg-danger',
  info: 'text-bg-info',
}

export function Badge(props) {
  const tone = props.tone ?? 'neutral'
  const pill = props.pill ?? false
  const className = props.className ?? ''

  const classes = ['badge', TONES[tone], pill && 'rounded-pill', className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{props.children}</span>
}
//revisar