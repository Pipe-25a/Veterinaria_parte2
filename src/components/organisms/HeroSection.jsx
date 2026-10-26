import { Image } from '../atoms/Image'
import { ActionCard } from '../molecules/ActionCard'

export function HeroSection(props) {
    return (
        <section className="container py-4 mb-4 bg-light rounded-3">
            {/* 1. Logo (Usa la clase hero-logo-container) */}
            <div className="mb-4 text-center">
                <Image
                    src={props.logoSrc || "/logo.jpg"}
                    alt={props.logoAlt || "Logo Clínica San Marcos"}
                    className="hero-main-logo"
                />
            </div>

            {/* 2. Título principal (Usa hero-title-wrapper) */}
            <div className="mx-auto mb-4 hero-title-wrapper">
                <ActionCard
                    title={props.title}
                    bgClass="bg-success text-white py-4 border-0"
                />
            </div>

            {/* 3. Subtítulo verde (Usa hero-subtitle-wrapper) */}
            <div className="mx-auto hero-subtitle-wrapper">
                <ActionCard
                    title={props.subtitle}
                    headingLevel={2}
                    bgClass="bg-success bg-opacity-75 text-dark border-0"
                />
            </div>
        </section>
    )
}