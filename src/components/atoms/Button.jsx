import { Button as BsButton } from 'react-bootstrap';

// Atomo: Boton que envuelve el componente Button de react-bootstrap
function Button({ children, variant = 'primary', size, onClick, type = 'button', disabled = false }) {
  return (
    <BsButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </BsButton>
  );
}

export default Button;
