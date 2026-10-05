import { Container, Row, Col } from 'react-bootstrap';
import LoginCard from '../components/organisms/LoginCard';

function LoginPage({ onSubmit, error, loading }) {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <LoginCard
              onSubmit={onSubmit}
              error={error}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginPage;