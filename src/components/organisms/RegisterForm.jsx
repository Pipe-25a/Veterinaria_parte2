import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../molecules/FormField'
import { Button } from '../atoms/Button'
import { useAuth } from '../../context/AuthContext'
import { validationRegister } from '../../utils/validationRegister'

function RegisterForm() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')
        const { errors: newErrors, isValid } = validationRegister({ name, email, password })
        setErrors(newErrors)
        if (!isValid) return

        setLoading(true)
        const result = register({ name, email, password })
        setLoading(false)

        if (!result.ok) {
            setApiError(result.error)
            return
        }

        //  CAMBIO: En vez de ROLE_HOME, lo enviamos al Home público
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {apiError && <div className="alert alert-danger mb-3">{apiError}</div>}
            <FormField
                id="name"
                label="Nombre completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors((p) => ({ ...p, name: '' }))
                }}
                error={errors.name}
            />
            <FormField
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((p) => ({ ...p, email: '' }))
                }}
                error={errors.email}
            />
            <FormField
                id="password"
                label="Contraseña"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((p) => ({ ...p, password: '' }))
                }}
                error={errors.password}
            />
            <Button type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
        </form>
    )
}

export default RegisterForm