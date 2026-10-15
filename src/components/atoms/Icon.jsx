// Atomo: Muestra una imagen de icono segun el nombre y tamano
function Icon({ name, size }) {
  const handleError = (e) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <img
      src={`/icons/${name}.png`}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size, verticalAlign: 'middle' }}
      onError={handleError}
    />
  );
}

export default Icon;
