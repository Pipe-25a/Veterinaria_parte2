import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link as RouterLink } from 'react-router-dom'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export function AuthTemplate(props) {
    return (
        <Container className="py-5 position-relative overflow-hidden d-flex align-items-center auth-wrapper">

            {/* Botón Volver al inicio (Ahora con clase btn-back-home) */}
            <RouterLink to="/" className="btn-back-home d-flex align-items-center gap-2">
                <span>←</span> Volver al inicio
            </RouterLink>

            {/* Huellitas de fondo */}
            <div className="paw-background paw-1">🐾</div>
            <div className="paw-background paw-2">🐾</div>
            <div className="paw-background paw-3">🐾</div>
            <div className="paw-background paw-4">🐾</div>

            <Row className="justify-content-center w-100 auth-content-z">
                <Col md={6} lg={5}>
                    {/* Tarjeta con clase para el border-radius */}
                    <Card className="shadow-lg border-0 animate-auth-card auth-card-custom">
                        <Card.Body className="p-4 p-md-5">

                            {props.title && (
                                <Heading level={2} className="text-center mb-2 fw-bold auth-heading">
                                    <span role="img" aria-label="veterinaria">🐾</span> {props.title}
                                </Heading>
                            )}

                            {props.subtitle && (
                                <Text tone="muted" align="center" className="mb-4">
                                    {props.subtitle}
                                </Text>
                            )}

                            {props.children}

                            {props.footerLinkText && (
                                <Text align="center" className="mt-4 mb-0">
                                    {props.footerLinkText}{' '}
                                    <RouterLink to={props.footerLinkTo} className="fw-bold text-success text-decoration-none">
                                        {props.footerLinkLabel}
                                    </RouterLink>
                                </Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}