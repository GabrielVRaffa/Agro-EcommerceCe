import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega token do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id && decoded?.email) {
          console.log("🟢 Token decodificado:", decoded);
          setUser(decoded);
        } else {
          console.warn("⚠️ Token inválido:", decoded);
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Erro ao decodificar token:", err);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  // Salva token após login
  const login = token => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      if (decoded?.id && decoded?.email) {
        console.log("🔐 Token salvo e decodificado:", decoded);
        setUser(decoded);
      } else {
        console.warn("⚠️ Token inválido ao fazer login:", decoded);
        logout(); // limpa caso o token não seja confiável
      }
    } catch (err) {
      console.error("❌ Erro ao decodificar token no login:", err);
      logout();
    }
  };

  // Remove token e limpa usuário
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
