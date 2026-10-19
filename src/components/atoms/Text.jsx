// Átomo: texto corrido. "as" cambia la etiqueta (p, span, small).
const TONES = {
  default: '',
  muted: 'text-muted',
  success: 'text-success',
  danger: 'text-danger',
}
const ALIGNS = {
  center: 'text-center',
  end: 'text-end',
}
export function Text(props) {
  const Tag = props.as ?? 'p'
  const tone = props.tone ?? 'default'
  const align = props.align ?? null
  const className = props.className ?? ''

  const classes = [TONES[tone], align && ALIGNS[align], className]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{props.children}</Tag>
}