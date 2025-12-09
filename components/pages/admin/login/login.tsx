"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth.context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground">
            Masuk untuk mengelola order lisensi
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle>Login Admin</CardTitle>
            <CardDescription>
              Gunakan kredensial admin Anda untuk masuk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan email admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-input border-border"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-input border-border"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Sedang login..." : "Login"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Kredensial Demo
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-1">
                    Supervisor
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Email: supervisor@odoo.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Password: supervisor123
                  </p>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-semibold text-foreground mb-1">
                    Manager
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Email: manager@odoo.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Password: manager123
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="space-y-3">
          <div className="flex gap-3 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">
                2 Role Admin Tersedia
              </p>
              <p className="text-muted-foreground text-xs">
                Supervisor untuk full access dan Manager untuk akses terbatas.
                Gunakan kredensial demo di atas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
