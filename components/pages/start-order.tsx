"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface StartOrderState {
  companyName: string
  email: string
}

export function StartOrderPage() {
  const [formData, setFormData] = useState<StartOrderState>({
    companyName: "",
    email: "",
  })
  const [errors, setErrors] = useState<Partial<StartOrderState>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<StartOrderState> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Nama perusahaan harus diisi"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email tidak valid"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Store data in sessionStorage and navigate
    sessionStorage.setItem("orderStart", JSON.stringify(formData))
    window.location.href = "/order-form"
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mulai Order</h1>
          <p className="text-muted-foreground mb-8">
            Masukkan informasi dasar Anda untuk memulai pengajuan lisensi Odoo
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama Perusahaan</label>
              <Input
                type="text"
                placeholder="PT. Contoh Perusahaan"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value })
                  if (errors.companyName) {
                    setErrors({ ...errors, companyName: undefined })
                  }
                }}
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && <p className="text-destructive text-sm mt-2">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email PIC</label>
              <Input
                type="email"
                placeholder="pic@perusahaan.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined })
                  }
                }}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
            </div>

            <Button type="submit" className="w-full">
              Lanjutkan
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">Proses hanya membutuhkan beberapa menit</p>
        </Card>
      </div>
    </div>
  )
}
