import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../molecules/RegisterForm';

function RegisterCard({ onSubmit,error, loading }) {
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-2">Registro Clínica San Marcos</h2>
                <p className="text-center text-muted mb-4">
                    Regístrate usando tu nombre y correo
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <RegisterForm onSubmit={onSubmit} loading={loading} />

                <p className="text-center mt-3 mb-0">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </Card.Body>
        </Card>
    );
}

export default RegisterCard