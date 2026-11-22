import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../molecules/FormField'
import { Button } from '../atoms/Button'
import { useAuth } from '../../context/AuthContext'
import { validationLogin } from '../../utils/validationLogin'

export function LoginForm() {
    const { login, loading } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')
        const { errors: newErrors, isValid } = validationLogin({ email, password })
        setErrors(newErrors)
        if (!isValid) return

        // Ya no es `const logged = login(...)`, ahora es await
        const result = await login({ email, password })
        if (!result.ok) {
            setApiError(result.error)
            return
        }
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {apiError && <div className="alert alert-danger mb-3">{apiError}</div>}
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
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
        </form>
    )
}
