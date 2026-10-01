//regresa un texto
function Text({ children, variant }) {
  return <p className={`text ${variant ?? ""}`}>{children}</p>;
}