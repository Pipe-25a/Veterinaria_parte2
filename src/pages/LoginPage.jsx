import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/organisms/LoginForm';

function LoginPage({ onSubmit, error, loading }) {
  return (
    <AuthTemplate
      title="Bienvenido"
      subtitle="Ingresa tus credenciales para continuar"
      footerLinkText="¿No tienes cuenta?"
      footerLinkLabel="Regístrate"
      footerLinkTo="/register"
    >
      {/* ⚠️ Aquí debes pasarle onSubmit, error y loading al Organismo */}
      <LoginForm onSubmit={onSubmit} error={error} loading={loading} />
    </AuthTemplate>
  );
}

export default LoginPage;