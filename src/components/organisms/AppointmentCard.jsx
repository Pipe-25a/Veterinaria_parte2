import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppointmentForm from '../molecules/AppointmentForm';

function AppointmentCard({ onSubmit, error, loading }) {
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-2">Agende su cita</h2>
                <p className="text-center text-muted mb-4">
                    Ingrese los datos solicitados
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <AppointmentForm onSubmit={onSubmit} loading={loading} />

                <p className="text-center mt-3 mb-0">
                    <Link to="/home">Agendar cita</Link>
                </p>
            </Card.Body>
        </Card>
    );
}

export default AppointmentCard