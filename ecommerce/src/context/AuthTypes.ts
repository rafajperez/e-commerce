//Este arquivo define as interfaces (tipos) e o objeto Contexto em si.
import { createContext } from "react";
import type { User as FirebaseUser } from "firebase/auth";

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
