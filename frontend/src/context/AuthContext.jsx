"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { saveToken, clearToken, getToken } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Solo en cliente
  useEffect(() => {
    const stored = getToken();
    if (stored) setToken(stored);
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    saveToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
