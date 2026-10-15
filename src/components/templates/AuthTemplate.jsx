import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AuthTemplate({ title, subtitle, footerLinkText, footerLinkTo, children }) {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4 p-md-5">
                            {title && <h2 className="text-center mb-2">{title}</h2>}
                            {subtitle && <p className="text-center text-muted mb-4">{subtitle}</p>}

                            {/* Inyección del Organismo (LoginForm o RegisterForm) */}
                            {children}

                            {footerLinkText && (
                                <p className="text-center mt-3 mb-0">
                                    {footerLinkText} <Link to={footerLinkTo}>Haz clic aquí</Link>
                                </p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthTemplate;

