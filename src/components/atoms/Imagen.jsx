import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function Imagen() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" rounded />
        </Col>
      </Row>
    </Container>
  );
}
export default Imagen;
/*
// Átomo: imagen. "alt" es obligatorio por accesibilidad.
export function Image(props) {
  const rounded = props.rounded ?? false
  const thumbnail = props.thumbnail ?? false
  const fluid = props.fluid ?? true
  const className = props.className ?? ''

  const classes = [
    fluid && 'img-fluid',
    rounded && 'rounded',
    thumbnail && 'img-thumbnail',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={classes}
    />
  )
}
*/