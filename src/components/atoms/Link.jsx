// Átomo: enlace. No conoce el router: si recibe "onNavigate", evita la recarga
// y le avisa a quien lo usa (la página decide con useNavigate).
const VARIANTS = {
  text: 'link-primary',
  button: 'btn btn-outline-primary',
}
export function Link(props) {
  const variant = props.variant ?? 'text'
  const active = props.active ?? false
  const className = props.className ?? ''

export default Link;

  function handleClick(event) {
    if (props.onNavigate) {
      event.preventDefault()
      props.onNavigate(props.href)
    }
  }
  const classes = [VARIANTS[variant], active && 'active', className]
    .filter(Boolean)
    .join(' ')
  return (
    <a
      href={props.href}
      className={classes}
      onClick={handleClick}
      aria-current={active ? 'page' : undefined}
    >
      {props.children}
    </a>
  )
}
