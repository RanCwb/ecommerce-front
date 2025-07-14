import type { ReactNode } from "react";
import type { UserProps } from "./User";

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: UserProps | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}
