//Esto es un componente de React que representa una insignia (badge) que muestra el estado de algo, como una tarea o un pedido. El componente recibe una propiedad llamada `estado`, que determina el color de la insignia según un conjunto predefinido de colores asociados a diferentes estados.
const COLORES = {
  pendiente: 'warning',
  confirmada: 'success',
  cancelada: 'danger',
  atendida: 'secondary',
};

const Badge = ({ estado }) => (
  <span className={`badge text-bg-${COLORES[estado] ?? 'light'}`}>{estado}</span>
);

export default Badge;