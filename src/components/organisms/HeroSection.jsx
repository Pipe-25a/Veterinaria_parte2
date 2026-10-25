import { Image } from '../atoms/Image'
import { ActionCard } from '../molecules/ActionCard'

export function HeroSection(props) {
    return (
        <section className="container py-4 mb-4 bg-light rounded-3">
            {/* 1. Logo */}
            <div className="mb-4">
                <Image src={props.logoSrc} alt={props.logoAlt} style={{ maxHeight: '120px', objectFit: 'contain' }} />
            </div>

            {/* 2. Título principal (h1) */}
            <div className="mx-auto mb-4" style={{ maxWidth: '600px' }}>
                <ActionCard
                    title={props.title}
                    bgClass="bg-success text-white py-4 border-0"
                /* headingLevel={1} es el valor por defecto, así que no hace falta pasarlo */
                />
            </div>

            {/* 3. Subtítulo verde (h2) */}
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
                <ActionCard
                    title={props.subtitle}
                    headingLevel={2} /* <--- LA MAGIA ESTÁ ACÁ */
                    bgClass="bg-success bg-opacity-75 text-dark border-0"
                />
            </div>
        </section>
    )
}