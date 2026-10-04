import { Container, Row, Col } from 'react-bootstrap';
import RegisterCard from '../components/organisms/RegisterCard';


function RegisterPage() {
    const handleLogin = (data) => {
        console.log('Login:', data);
    };


    return (
        <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
            <Container>
                <Row className="justify-content-center">
                    {/*
            xs=12  → 1 columna en móvil (375px)
            md=8   → 8/12 columnas en tablet (768px)
            lg=5   → 5/12 columnas en desktop (1280px)
          */}
                    <Col xs={12} md={8} lg={5}>
                        <LoginCard onSubmit={handleLogin} />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}


export default RegisterPage
