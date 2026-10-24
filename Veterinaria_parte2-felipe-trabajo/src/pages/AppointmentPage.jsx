import { useState } from 'react'
import AuthTemplate from '../components/templates/AuthTemplate'
import AppointmentForm from '../components/organisms/AppointmentForm'
import { Button } from '../components/atoms/Button'
import { useAuth } from '../context/AuthContext'
import { agendarCita } from '../services/citaService'
import { getMascotasByDueno } from '../services/mascotaService'
import { useTituloPagina } from '../hooks/useTituloPagina'

function AppointmentPage() {
    useTituloPagina('Agendar cita')

    const { user, logout } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (data) => {
        setError('')
        setSuccess('')
        setLoading(true)

        const mascotas = getMascotasByDueno(user.email)
        const mascota = mascotas.find(
            (m) => m.nombre.toLowerCase() === data.petName.trim().toLowerCase()
        )

        if (!mascota) {
            setLoading(false)
            setError('La mascota no está registrada en tu cuenta')
            return { ok: false }
        }

        const result = agendarCita({
            duenoEmail: user.email,
            mascotaId: mascota.id,
            fecha: data.date,
            hora: data.time,
            tipo: data.service,
        })

        setLoading(false)

        if (!result.ok) {
            setError(result.error)
            return { ok: false }
        }

        setSuccess(`Cita agendada para ${mascota.nombre} el ${data.date} a las ${data.time}.`)
        return { ok: true }
    }

    return (
        <AuthTemplate
            title={`Bienvenido/a ${user?.name ?? ''}`}
            subtitle="Ingrese los datos para agendar su cita"
        >
            <AppointmentForm
                onSubmit={handleSubmit}
                error={error}
                success={success}
                loading={loading}
            />
            <div className="text-center mt-3">
                <Button
                    variant="link"
                    size="sm"
                    className="text-danger text-decoration-none fw-bold"
                    onClick={logout}
                >
                    Cerrar sesión
                </Button>
            </div>
        </AuthTemplate>
    )
}

export default AppointmentPage
