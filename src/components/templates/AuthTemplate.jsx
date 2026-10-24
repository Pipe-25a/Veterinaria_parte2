import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link as RouterLink } from 'react-router-dom'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export function AuthTemplate(props) {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4 p-md-5">
                            {props.title && (
                                <Heading level={2} className="text-center mb-2">
                                    {props.title}
                                </Heading>
                            )}
                            {props.subtitle && (
                                <Text tone="muted" align="center" className="mb-4">
                                    {props.subtitle}
                                </Text>
                            )}
                            {props.children}
                            {props.footerLinkText && (
                                <Text align="center" className="mt-3 mb-0">
                                    {props.footerLinkText}{' '}
                                    <RouterLink to={props.footerLinkTo}>
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



