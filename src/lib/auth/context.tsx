"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { VerifyCodeResponse } from "../demo/api";

interface AuthState {
  session: VerifyCodeResponse | null;
  login: (session: VerifyCodeResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = "schekonom_owner_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<VerifyCodeResponse | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const stored = JSON.parse(raw) as VerifyCodeResponse;
      if (stored?.user?.role === "owner") {
        setSession(stored);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback((s: VerifyCodeResponse) => {
    setSession(s);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
