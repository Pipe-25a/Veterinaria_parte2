import { useState } from 'react'
import { PageHeader } from '../components/molecules/PageHeader'
import { AppointmentForm } from '../components/organisms/AppointmentForm'
import { useAuth } from '../context/AuthContext'
import { bookAppointment } from '../services/appointmentService'
import { getPetsByDueno, addPet } from '../services/petService'
import { usePageTitle } from '../hooks/usePageTitle'

export function AppointmentPage() {
    usePageTitle('Agendar cita')

    const { user } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (data) => {
        setError('')
        setSuccess('')
        setLoading(true)

        const pets = getPetsByDueno(user.email)
        let pet = pets.find(
            (p) => (p.name || p.nombre || '').toLowerCase() === data.petName.trim().toLowerCase()
        )

        // Si la mascota no existe, la creamos automáticamente
        if (!pet) {
            const created = addPet({
                duenoEmail: user.email,
                name: data.petName.trim(),
                species: data.species,
                breed: '',
                age: 0,
            })

            if (!created.ok) {
                setLoading(false)
                setError(created.error || 'No se pudo registrar la mascota')
                return { ok: false }
            }

            pet = created.pet
        }

        const result = bookAppointment({
            duenoEmail: user.email,
            petId: pet.id,
            date: data.date,
            time: data.time,
            type: data.service,
        })

        setLoading(false)

        if (!result.ok) {
            setError(result.error)
            return { ok: false }
        }

        setSuccess(`Cita agendada para ${pet.name || pet.nombre} el ${data.date} a las ${data.time}.`)
        return { ok: true }
    }

    return (
        <div>
            <PageHeader
                title={`Bienvenido/a ${user?.name ?? ''}`}
                subtitle="Ingresa los datos para agendar tu cita"
            />
            <div className="card shadow-sm">
                <div className="card-body">
                    <AppointmentForm
                        onSubmit={handleSubmit}
                        error={error}
                        success={success}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}