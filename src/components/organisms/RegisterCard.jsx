import { Card } from 'react-bootstrap';
import RegisterForm from '../molecules/RegisterForm';

function RegisterCard({ onSubmit }) {
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-2">Registro Clinica San Marcos</h2>
                <p className="text-center text-muted mb-4">
                    Registrate usando tu nombre y correo
                </p>
                <LoginForm onSubmit={onSubmit} />
            </Card.Body>
        </Card>
    );
}

export default RegisterCard