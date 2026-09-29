import { Card } from 'react-bootstrap';
import LoginForm from '../molecules/LoginForm';

function LoginCard({ onSubmit }) {
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-2">Bienvenido</h2>
                <p className="text-center text-muted mb-4">
                    Ingresa tus credenciales para continuar
                </p>
                <LoginForm onSubmit={onSubmit} />
            </Card.Body>
        </Card>
    );
}

export default LoginCard