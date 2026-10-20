// Átomo: título. "level" define la etiqueta (1 a 6).
const ALIGNS = {
  center: 'text-center',
  end: 'text-end',
}

export function Heading(props) {
  const level = Math.min(Math.max(props.level ?? 1, 1), 6)
  const align = props.align ?? null
  const className = props.className ?? ''
  const Tag = `h${level}`

  const classes = [align && ALIGNS[align], className].filter(Boolean).join(' ')

  return <Tag className={classes}>{props.children}</Tag>
}

