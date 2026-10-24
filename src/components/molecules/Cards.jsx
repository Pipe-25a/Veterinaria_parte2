//card reutilizable que debe de recibir props y atomos para su creacion
//debe de ser un componente flexible que pueda contener cualquier dato
//debe de traer el atomo de lable, text y image para su creacion
import { Text } from '../atoms/Text'
import { Image } from '../atoms/Image'
import { Label } from '../atoms/Label'

export function Card(props) {
  const { label, text, image, className = '', children } = props
  const title = props.title ?? ''
  const subtitle = props.subtitle ?? ''
  const imageSrc = props.imageSrc ?? ''
  const imageAlt = props.imageAlt ?? ''
  const content = props.content ?? ''
  const footer = props.footer ?? ''
  const classes = ['card', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}