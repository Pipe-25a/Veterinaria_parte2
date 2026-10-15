// src/pages/LoginPage.jsx
import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/organisms/LoginForm';

function LoginPage() {
  const handleLogin = (credentials) => {
    console.log('Enviando credenciales:', credentials);
    // Lógica para autenticar con backend
  };

  return (
    <AuthTemplate
      title="Bienvenido"
      subtitle="Ingresa tus credenciales para continuar"
      footerLinkText="¿No tienes cuenta?"
      footerLinkTo="/register"
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthTemplate>
  );

}

export default LoginPage;