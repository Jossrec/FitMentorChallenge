"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { saveToken, clearToken, getToken } from "../utils/storage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const stored = getToken();
    if (stored) {
      try {
        const decoded = jwtDecode(stored);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(stored);
          setUser({ id: decoded.id, email: decoded.email });
        } else {
          clearToken();
        }
      } catch (e) {
        console.error("Error decodificando token:", e);
        clearToken();
      }
    }
    setLoading(false); // 👈 cuando termina la lectura inicial
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
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
