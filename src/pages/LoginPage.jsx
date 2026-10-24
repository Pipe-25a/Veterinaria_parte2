import { AuthTemplate } from '../components/templates/AuthTemplate'
import  { LoginForm }  from '../components/organisms/LoginForm'

export function LoginPage() {
  return (
    <AuthTemplate
      title="Bienvenido"
      subtitle="Ingresa tus credenciales para continuar"
      footerLinkText="¿No tienes cuenta?"
      footerLinkLabel="Regístrate"
      footerLinkTo="/register"
    >
      <LoginForm />
    </AuthTemplate>
  )
}
