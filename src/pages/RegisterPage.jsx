
import AuthTemplate from '../components/templates/AuthTemplate';
import RegisterForm from '../components/organisms/RegisterForm';


function RegisterPage({ props }) {
  return (
    <AuthTemplate
      title="Registro Clínica San Marcos"
      subtitle="Regístrate usando tu nombre y correo"
      footerLinkText="¿Ya tienes cuenta?"
      footerLinkLabel="Inicia sesión"
      footerLinkTo="/login"
    >
      <RegisterForm onSubmit={props.onSubmit} error={props.error} loading={props.loading} />
    </AuthTemplate>
  );
}

export default RegisterPage;