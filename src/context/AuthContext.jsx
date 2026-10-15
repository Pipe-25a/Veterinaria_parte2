import { createContext, useContext, useState } from "react";
import { findUser, registerUser } from "../services/userService";

const AuthContext = createContext(null);

// Lee la sesión guardada; si el localStorage está corrupto devuelve null
const loadSession = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  const saveSession = (u) => {
    const session = { name: u.name, email: u.email, role: u.role };
    localStorage.setItem("user", JSON.stringify(session));
    setUser(session);
    return session;
  };

  const login = (email, password) => {
    const found = findUser(email, password);
    return found ? saveSession(found) : null;
  };

  const register = (data) => {
    const result = registerUser(data); // { ok, error?, user? }
    if (result.ok) saveSession(result.user);
    return result;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);