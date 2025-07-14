import { createContext, useContext, useState, useEffect } from "react";
import type { UserProps } from "@/interfaces/User";
import { api } from "@/services/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import type { AuthContextType, AuthProviderProps } from "@/interfaces/Auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      fetchUser(storedToken);
      setToken(storedToken);
    }
  }, []);

  async function fetchUser(token: string) {
    try {
      const response = await api.get(API_ENDPOINTS.getUserByToken);
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.login, { email, password });
      const { token } = response.data;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("authToken", token);
      setUser(response.data.user);
      setToken(token);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// 5. Hook customizado para usar o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
