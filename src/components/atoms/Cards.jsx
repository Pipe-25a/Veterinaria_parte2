import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          texto
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;

/*
  // Átomo: caja contenedora (la "caja blanca con borde" de tus páginas).
export function Card(props) {
  const Tag = props.as ?? 'div'
  const className = props.className ?? ''

  return (
    <Tag className={`card shadow-sm ${className}`.trim()}>
      <div className="card-body">{props.children}</div>
    </Tag>
  )
}
*/