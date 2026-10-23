import { Image } from '../atoms/Image'
import { ActionCard } from '../molecules/ActionCard'
import { NavItem } from '../molecules/NavItem'
import { Link } from 'react-router-dom'

export function HeroSection(props) {
    return (
        <section className="container py-4 mb-4 bg-light rounded-3">

            {/* 1. Logo */}
            <div className="mb-4">
                <Image src={props.logoSrc} alt={props.logoAlt} style={{ maxHeight: '120px', objectFit: 'contain' }} />
            </div>

            {/* 2. Título principal (Usando tu ActionCard verde) */}
            <div className="mx-auto mb-4" style={{ maxWidth: '600px' }}>
                <ActionCard
                    title={props.title}
                    bgClass="bg-success text-white py-4 border-0"
                />
            </div>

            {/* 4. Subtítulo verde (Usando tu ActionCard) */}
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
                <ActionCard
                    title={props.subtitle}
                    bgClass="bg-success bg-opacity-75 text-dark border-0"
                />
            </div>

        </section>
    )
}