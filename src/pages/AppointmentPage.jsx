// src/pages/AppointmentPage.jsx
import AuthTemplate from '../components/templates/AuthTemplate';
import AppointmentForm from '../components/organisms/AppointmentForm';

function AppointmentPage({ user, onSubmit, error, loading, onLogout }) {
    return (
        <AuthTemplate
            title={`Bienvenido/a ${user?.name || ''}`}
            subtitle="Ingrese los datos para agendar su cita"
        >
            <AppointmentForm
                onSubmit={onSubmit}
                error={error}
                loading={loading}
            />

            {/* Botón funcional de Cerrar Sesión */}
            {onLogout && (
                <div className="text-center mt-3">
                    <button
                        type="button"
                        className="btn btn-link text-danger btn-sm text-decoration-none fw-bold"
                        onClick={onLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </AuthTemplate>
    );
}

export default AppointmentPage;