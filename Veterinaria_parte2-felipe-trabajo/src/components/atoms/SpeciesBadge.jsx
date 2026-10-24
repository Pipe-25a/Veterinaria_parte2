//import Icon from "./Icon";

// Átomo: etiqueta con la especie de la mascota
const SPECIES = {
  dog: "Perro",
  cat: "Gato",
  rabbit: "Conejo",
  bird: "Ave",
};

function SpeciesBadge(props) {
  return (
    <span className="badge rounded-pill text-bg-light border">
      {SPECIES[props.species] || props.species}
    </span>
  )
}

export default SpeciesBadge