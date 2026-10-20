//agregar Prop.
//atomos: label, link

export function NavItem(props) {
  const { label, link, className = '', children } = props
  const classes = ['nav-item', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {label && <span>{label}</span>}
      {link && <a href={link}>Go to link</a>}
      {children}
    </div>
  )
}