
import AuthTemplate from '../components/templates/AuthTemplate';
import RegisterForm from '../components/organisms/RegisterForm';


function RegisterPage({ onSubmit, error, loading }) {
  return (
    <AuthTemplate
      title="Registro Clínica San Marcos"
      subtitle="Regístrate usando tu nombre y correo"
      footerLinkText="¿Ya tienes cuenta?"
      footerLinkLabel="Inicia sesión"
      footerLinkTo="/login"
    >
      <RegisterForm onSubmit={onSubmit} error={error} loading={loading} />
    </AuthTemplate>
  );
}

export default RegisterPage;