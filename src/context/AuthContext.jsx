import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { clearToken, getToken, setToken, obtenerMensajeError } from '../services/api'
import { loginRequest, registerRequest } from '../services/authService'
import { normalizeRole } from '../data/roles'

const AuthContext = createContext(null)
const USER_KEY = 'auth_user'

const loadSession = () => {
  if (!getToken()) return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)
  const [loading, setLoading] = useState(false)

  const persist = useCallback((authResponse) => {
    const frontendUser = {
      id: authResponse.userId,
      name: authResponse.username,
      username: authResponse.username,
      email: authResponse.email,
      role: normalizeRole(authResponse.role),
    }
    setToken(authResponse.accessToken)
    localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
    setUser(frontendUser)
    return frontendUser
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    try {
      const authResponse = await loginRequest({ identifier: email, password })
      const frontendUser = persist(authResponse)
      return { ok: true, user: frontendUser }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    } finally {
      setLoading(false)
    }
  }, [persist])

  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    try {
      const authResponse = await registerRequest({ username: name, email, password })
      const frontendUser = persist(authResponse)
      return { ok: true, user: frontendUser }
    } catch (error) {
      return { ok: false, error: obtenerMensajeError(error) }
    } finally {
      setLoading(false)
    }
  }, [persist])

  const logout = useCallback(() => {
    clearToken()
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)