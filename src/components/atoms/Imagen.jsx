// Átomo: imagen. "alt" por defecto es vacío (imagen decorativa);
// si la imagen aporta información, pásale siempre un alt descriptivo.
// Cualquier otra prop (src, width, height, loading, onError...) pasa directo al <img>.
export function Image(props) {
  const {
    rounded = false,
    circle = false,
    thumbnail = false,
    fluid = true,
    alt = '',
    className = '',
    ...rest
  } = props

  const classes = [
    fluid && 'img-fluid',
    rounded && 'rounded',
    circle && 'rounded-circle',
    thumbnail && 'img-thumbnail',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <img {...rest} alt={alt} className={classes} />
}

