//Rehacer , agregar props y atomos
//atomos:label, link, text
export function Service(props) {
 const { title, description, link, className = '', children } = props
 const classes = ['service', className].filter(Boolean).join(' ')
 return (
   <div className={classes}>
     {title && <h2>{title}</h2>}
     {description && <p>{description}</p>}
     {link && <a href={link}>Learn more</a>}
     {children}
   </div>
 )
}