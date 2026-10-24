import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MainLayout } from '../components/templates/MainLayout'
import { HomeTemplate } from '../components/templates/HomeTemplate'
import { HeroSection } from '../components/organisms/HeroSection'
import { ServiceCard } from '../components/organisms/ServiceCard'
import { Footer } from '../components/organisms/Footer'
import servicesData from '../data/services.json'
import contactData from '../data/contact.json'

export function HomePage(props) {
  // Respetamos tus props inyectables con fallback a los JSON
  const services = props.services ?? props.servicios ?? servicesData
  const contact = props.contact ?? props.contacto ?? contactData
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <MainLayout>
      <div className="container py-4">
        <HomeTemplate
          title={props.title ?? 'Inicio'}
          subtitle={props.subtitle}
          actions={
            <>
              <HeroSection
                logoSrc={props.logoSrc ?? 'https://via.placeholder.com/150'}
                logoAlt={props.logoAlt ?? 'Logo Clínica San Marcos'}
                title="Clínica Veterinaria"
                subtitle="Bienvenidos a nuestra clínica San Marcos"
              />
              <ServiceCard id="servicios" servicios={services} />
            </>
          }
        />
      </div>
      <Footer id="contacto" title="Información de contacto" items={contact} />
    </MainLayout>
  )
}