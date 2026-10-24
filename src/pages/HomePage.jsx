import { MainLayout } from '../components/templates/MainLayout'
import { HomeTemplate } from '../components/templates/HomeTemplate'
import { HeroSection } from '../components/organisms/HeroSection'
import { ServiceCard } from '../components/organisms/ServiceCard'
import { Footer } from '../components/organisms/Footer'
import servicesData  from '../data/services.json'
import contactData  from '../data/contact.json'

export function HomePage(props) {
  const services = props.services ?? props.servicios ?? servicesData
  const contact = props.contact ?? props.contacto ?? contactData

  return (
    <MainLayout>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <main className="flex-grow-1 pb-5 pt-4">

          {/* Envolvemos todo en un container para que tenga márgenes */}
          <div className="container">
            <HomeTemplate
              actions={
                <>
                  <HeroSection
                    logoSrc="https://via.placeholder.com/150"
                    logoAlt="Logo Clínica San Marcos"
                    title="Clínica Veterinaria"
                    subtitle="Bienvenidos a nuestra clínica San Marcos"
                  />
                  <ServiceCard id="servicios" servicios={services} />
                </>
              }
            />
          </div>

        </main>

        <Footer id="contacto" title="Información de contacto" items={contact} />
      </div>
    </MainLayout>
  )
}
