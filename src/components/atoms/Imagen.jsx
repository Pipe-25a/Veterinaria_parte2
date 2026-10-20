// Átomo: imagen. "alt" es obligatorio por accesibilidad.
export function Image(props) {
  const rounded = props.rounded ?? false
  const thumbnail = props.thumbnail ?? false
  const fluid = props.fluid ?? true
  const className = props.className ?? ''

  const classes = [
    fluid && 'img-fluid',
    rounded && 'rounded',
    thumbnail && 'img-thumbnail',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={classes}
    />
  )
}
