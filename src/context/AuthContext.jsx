import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { findUser, registerUser } from "../services/userService";

const AuthContext = createContext(null);

const loadSession = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  const saveSession = useCallback((u) => {
    const session = { name: u.name, email: u.email, role: u.role };
    localStorage.setItem("user", JSON.stringify(session));
    setUser(session);
    return session;
  }, []);

  const login = useCallback((email, password) => {
    const found = findUser(email, password);
    return found ? saveSession(found) : null;
  }, [saveSession]);

  const register = useCallback((data) => {
    const result = registerUser(data); // { ok, error?, user? }
    if (result.ok) saveSession(result.user);
    return result;
  }, [saveSession]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // Memoizamos el value para que los consumidores solo se re-rendericen si 'user' cambia
  const value = useMemo(() => ({
    user,
    login,
    register,
    logout
  }), [user, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);