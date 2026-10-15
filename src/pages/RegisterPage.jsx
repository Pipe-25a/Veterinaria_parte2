// src/pages/RegisterPage.jsx
import AuthTemplate from '../components/templates/AuthTemplate';
import RegisterForm from '../components/organisms/RegisterForm';

function RegisterPage() {
  const handleRegister = (data) => {
    console.log('Datos de registro:', data);
    // Lógica para registrar usuario con backend
  };

  return (
    <AuthTemplate
      title="Registro Clínica San Marcos"
      subtitle="Regístrate usando tu nombre y correo"
      footerLinkText="¿Ya tienes cuenta?"
      footerLinkTo="/login"
    >
      <RegisterForm onSubmit={handleRegister} />
    </AuthTemplate>
  );
}

export default RegisterPage;