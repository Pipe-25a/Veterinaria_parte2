import { Badge } from './Badge'

// Átomo: etiqueta con la especie de la mascota.
const SPECIES = {
  dog: 'Perro',
  cat: 'Gato',
  rabbit: 'Conejo',
  bird: 'Ave',
}

export function SpeciesBadge(props) {
  return (
    <Badge tone="light" pill className="border">
      {SPECIES[props.species] || props.species}
    </Badge>
  )
}