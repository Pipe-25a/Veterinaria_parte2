import { AuthTemplate } from '../components/templates/AuthTemplate'
import  { LoginForm }  from '../components/organisms/LoginForm'

export function LoginPage() {
  return (
    // Animación solo en Login (estilos en App.css)
    <div className="login-animation">
      <AuthTemplate
        title="Bienvenido"
        subtitle="Ingresa tus credenciales para continuar"
        footerLinkText="¿No tienes cuenta?"
        footerLinkLabel="Regístrate"
        footerLinkTo="/register"
      >
        <LoginForm />
      </AuthTemplate>
    </div>
  )
}