// Footer reutilizable para las páginas de la web, con props.
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { FooterNavGroup } from '../molecules/FooterNavGroup'
import { Link } from 'react-router-dom'

export function Footer(props) {
    const { id, className, ...rest } = props

    const title = props.title ?? props.titulo ?? 'Clínica Veterinaria San Marcos'
    const description =
        props.description ??
        props.descripcion ??
        'Cuidando la salud de tu mejor amigo con el mejor equipo profesional.'

    const contacts = props.contacts ?? props.contactos ?? props.items ?? [
        { label: 'Teléfono', value: '+56 2 2345 6789', href: 'tel:+56223456789' },
        { label: 'Correo', value: 'info@clinica.com', href: 'mailto:info@clinica.com' },
    ]

    const quickLinks = props.quickLinks ?? props.enlacesRapidos ?? [
        { label: 'Inicio', to: '/' },
        { label: 'Servicios', to: '/servicios' },
        { label: 'Contacto', to: '/contacto' },
        { label: 'Iniciar Sesión', to: '/login' },
    ]

    return (
        <footer id={id} className="bg-success text-white pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Columna 1: Información de la clínica */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Heading level={4} className="fw-bold mb-3">
                            {title}
                        </Heading>
                        <Text className="text-white-50">{description}</Text>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <FooterNavGroup title="Enlaces Rápidos" links={quickLinks} />
                    </div>

                    {/* Columna 3: Contactos */}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <Heading level={5} className="text-uppercase mb-3 fw-bold">
                            Contactos
                        </Heading>
                        <ul className="list-unstyled">
                            {contacts.map((item, index) => {
                                const display = item.value ?? item.label
                                return (
                                    <li key={item.id ?? index} className="mb-2">
                                        {item.href ? (
                                            <a href={item.href} className="text-white-50 text-decoration-none">
                                                {item.label && item.value ? `${item.label}: ` : ''}
                                                {display}
                                            </a>
                                        ) : (
                                            <span className="text-white-50">
                                                {item.label && item.value ? `${item.label}: ` : ''}
                                                {display}
                                            </span>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <hr className="border-white-50 my-4" />
                <div className="text-center text-white-50">
                    <small>
                        &copy; {new Date().getFullYear()} Clínica Veterinaria San Marcos. Todos los derechos
                        reservados.
                    </small>
                </div>
            </div>
        </footer>
    )
}