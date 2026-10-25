import { AuthTemplate } from '../components/templates/AuthTemplate'
import { RegisterForm } from '../components/organisms/RegisterForm'

export function RegisterPage() {
  return (
    // Animación solo en Registro (estilos en App.css)
    <div className="register-animation">
      <AuthTemplate
        title="Registro Clínica San Marcos"
        subtitle="Regístrate usando tu nombre y correo"
        footerLinkText="¿Ya tienes cuenta?"
        footerLinkLabel="Inicia sesión"
        footerLinkTo="/login"
      >
        <RegisterForm />
      </AuthTemplate>
    </div>
  )
}
