"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";

export type AdminRole = "sales" | "manager" | "admin";

export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials for demo
const VALID_ADMINS = [
  {
    email: "sales.asiasistem@odoo.com",
    password: "sales123",
    name: "Sales Asia Sistem",
    role: "sales" as AdminRole,
  },
  {
    email: "manager.permata@odoo.com",
    password: "manager",
    name: "Manager Permata",
    role: "manager" as AdminRole,
  },
  {
    email: "admin@odoo.com",
    password: "admin",
    name: "Super Admin",
    role: "admin" as AdminRole,
  },
];

const COOKIE_NAME = "admin_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        deleteCookie(COOKIE_NAME);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const admin = VALID_ADMINS.find(
      (a) => a.email === email && a.password === password
    );

    if (!admin) {
      throw new Error("Email atau password salah");
    }

    const userData: AdminUser = {
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    setUser(userData);
    setCookie(COOKIE_NAME, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    deleteCookie(COOKIE_NAME);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
