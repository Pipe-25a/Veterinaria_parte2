
//nivel de h
function Heading({ level = 2, children, variant }) {
  const Tag = `h${level}`;
  return <Tag className={`heading ${variant ?? ""}`}>{children}</Tag>;
}
