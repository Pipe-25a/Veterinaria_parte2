import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/organisms/LoginForm';

function LoginPage({ props }) {
  return (
    <AuthTemplate
      title="Bienvenido"
      subtitle="Ingresa tus credenciales para continuar"
      footerLinkText="¿No tienes cuenta?"
      footerLinkLabel="Regístrate"
      footerLinkTo="/register"
    >
      {/* ⚠️ Aquí debes pasarle onSubmit, error y loading al Organismo */}
      <LoginForm onSubmit={props.onSubmit} error={props.error} loading={props.loading} />
    </AuthTemplate>
  );
}

export default LoginPage;