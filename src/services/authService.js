import { api } from './api'

export async function loginRequest({ identifier, password }) {
    const { data } = await api.post('/auth/login', { identifier, password })
    return data
}

export async function registerRequest({ username, email, password }) {
    const { data } = await api.post('/auth/register', { username, email, password })
    return data
}