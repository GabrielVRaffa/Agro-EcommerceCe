import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ⏳ novo estado

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
    setIsLoading(false); // ✅ marca fim do carregamento
  }, []);

  const login = token => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      if (decoded?.id && decoded?.email) {
        console.log("🔐 Token salvo e decodificado:", decoded);
        setUser(decoded);
      } else {
        console.warn("⚠️ Token inválido ao fazer login:", decoded);
        logout();
      }
    } catch (err) {
      console.error("❌ Erro ao decodificar token no login:", err);
      logout();
    }
  };

  const logout = () => {
  setIsLoading(true); // impede rota de redirecionar antes da limpeza
  localStorage.removeItem('token');
  setUser(null);
  setTimeout(() => setIsLoading(false), 100); // tempo curto só para evitar conflito
};

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading, // ⬅️ importante para PrivateRoute
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
