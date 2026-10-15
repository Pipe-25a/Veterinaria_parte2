import AuthTemplate from '../components/templates/AuthTemplate';
import AppointmentForm from '../components/organisms/AppointmentForm';

function AppointmentPage() {
    const handleAppointmentSubmit = (data) => {
        console.log('Cita agendada:', data);
        // Lógica para enviar a la API
    };

    return (
        <AuthTemplate
            title="Agende su cita"
            subtitle="Ingrese los datos solicitados"
            footerLinkText="¿Quieres regresar al inicio?"
            footerLinkLabel="Ir al Home"
            footerLinkTo="/"
        >
            <AppointmentForm onSubmit={handleAppointmentSubmit} />
        </AuthTemplate>
    );
}

export default AppointmentPage;