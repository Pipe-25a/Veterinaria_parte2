import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../molecules/LoginForm';

function LoginCard({ onSubmit, error, loading }) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <h2 className="text-center mb-2">Bienvenido</h2>
        <p className="text-center text-muted mb-4">
          Ingresa tus credenciales para continuar
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <LoginForm onSubmit={onSubmit} loading={loading} />

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;