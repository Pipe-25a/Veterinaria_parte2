import axios from 'axios'

const TOKEN_KEY = 'auth_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1',
    timeout: 10000,
})

// Adjunta el token en cada petición
api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Manejo global de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearToken()
        }
        return Promise.reject(error)
    }
)

// Función para traducir los errores del backend a texto legible
export function obtenerMensajeError(error) {
    if (error.response) {
        const data = error.response.data
        if (data && typeof data.message === 'string') {
            return data.message
        }
        return `Error del servidor (${error.response.status}).`
    }
    if (error.code === 'ECONNABORTED') {
        return 'La API tardó demasiado.'
    }
    return 'No fue posible contactar la API. Revisa la conexión y CORS.'
}