import AuthTemplate from '../components/templates/AuthTemplate';
import AppointmentForm from '../components/organisms/AppointmentForm';
import Button from '../components/atoms/Button';

function AppointmentPage(props) {
    return (
        <AuthTemplate
            title={`Bienvenido/a ${props.user?.name || ''}`}
            subtitle="Ingrese los datos para agendar su cita"
        >
            <AppointmentForm
                onSubmit={props.onSubmit}
                error={props.error}
                success={props.success}
                loading={props.loading}
            />
            {/* Botón funcional de Cerrar Sesión */}
            {props.onLogout && (
                <div className="text-center mt-3">
                    <Button variant="link" size="sm" className="text-danger text-decoration-none fw-bold" onClick={props.onLogout}>
                        Cerrar sesión
                    </Button>
                </div>
            )}
        </AuthTemplate>
    );
}

export default AppointmentPage;