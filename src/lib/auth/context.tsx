"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { ErpProfile } from "../erp/types";
import { log } from "../logger";

const STORAGE_KEY = "sch_erp_profile";

interface AuthState {
  profile: ErpProfile | null;
  login: (profile: ErpProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function loadProfile(): ErpProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ErpProfile;
      log.authCtxInit(true, parsed.name);
      return parsed;
    }
  } catch {
    // corrupted localStorage
  }
  log.authCtxInit(false);
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ErpProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = loadProfile();
    if (saved) setProfile(saved);
    setHydrated(true);
  }, []);

  const login = useCallback((p: ErpProfile) => {
    log.authCtxLogin(p.name);
    setProfile(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // localStorage full or disabled
    }
  }, []);

  const logout = useCallback(() => {
    log.authCtxLogout();
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Don't render children until hydrated (prevents flash)
  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
