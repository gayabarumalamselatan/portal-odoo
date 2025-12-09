"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type AdminRole = "supervisor" | "manager";

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
    email: "supervisor@odoo.com",
    password: "supervisor123",
    name: "Supervisor Admin",
    role: "supervisor" as AdminRole,
  },
  {
    email: "manager@odoo.com",
    password: "manager123",
    name: "Manager Admin",
    role: "manager" as AdminRole,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("adminUser");
    if (stored) {
      setUser(JSON.parse(stored));
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
    sessionStorage.setItem("adminUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("adminUser");
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
