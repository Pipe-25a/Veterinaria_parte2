import { Card, Container, Row, Col } from 'react-bootstrap';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import Link from '../atoms/Link';

// Plantilla: pantalla centrada con tarjeta (login, registro y citas).
// props: title, subtitle, footerLinkText, footerLinkLabel, footerLinkTo y children.
function AuthTemplate(props) {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4 p-md-5">
                            {props.title && (
                                <Heading level={2} className="text-center mb-2">{props.title}</Heading>
                            )}
                            {props.subtitle && (
                                <Text className="text-center text-muted mb-4">{props.subtitle}</Text>
                            )}

                            {/* Aquí se inyecta el organismo (LoginForm, RegisterForm, AppointmentForm) */}
                            {props.children}

                            {props.footerLinkText && (
                                <Text className="text-center mt-3 mb-0">
                                    {props.footerLinkText}{' '}
                                    <Link to={props.footerLinkTo}>{props.footerLinkLabel}</Link>
                                </Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthTemplate;


