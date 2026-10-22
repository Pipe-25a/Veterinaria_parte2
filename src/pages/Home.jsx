import MainLayout from '../components/templates/MainLayout'
import { useTituloPagina } from '../hooks/useTituloPagina'

function HomePage() {
  useTituloPagina('Inicio')
  return (
    <MainLayout>
      <h1>Bienvenido a la Veterinaria San Marcos</h1>
    </MainLayout>
  )
}
export default HomePage;