"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

type OrderStatusType = "pending" | "validating" | "billing" | "processing" | "completed" | "revision"

interface OrderDetailData {
  id: string
  companyName: string
  npwp: string
  employees: string
  picName: string
  picPhone: string
  picEmail: string
  licenseType: string
  userCount: string
  notes: string
  createdDate: string
  status: OrderStatusType
}

export function AdminOrderDetailPage({ orderId }: { orderId: string }) {
  // Mock data - in real app, would fetch from API using orderId
  const [orderData] = useState<OrderDetailData>({
    id: orderId,
    companyName: "PT. Teknologi Indonesia",
    npwp: "12.345.678.9-012.345",
    employees: "150",
    picName: "Budi Santoso",
    picPhone: "+62 812 3456 7890",
    picEmail: "pic@teknologi.com",
    licenseType: "enterprise",
    userCount: "50",
    notes: "Memerlukan integrasi dengan sistem existing",
    createdDate: "2024-01-15",
    status: "completed",
  })

  const [status, setStatus] = useState<OrderStatusType>(orderData.status)
  const [adminComments, setAdminComments] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)

  const statusConfig: Record<OrderStatusType, { label: string; color: string }> = {
    pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800" },
    validating: { label: "Validasi Data", color: "bg-blue-100 text-blue-800" },
    billing: { label: "Billing", color: "bg-purple-100 text-purple-800" },
    processing: { label: "Proses", color: "bg-cyan-100 text-cyan-800" },
    completed: { label: "Selesai", color: "bg-green-100 text-green-800" },
    revision: { label: "Perlu Revisi", color: "bg-red-100 text-red-800" },
  }

  const timeline = [
    { step: 1, label: "Order Diterima", completed: true, date: "2024-01-15" },
    { step: 2, label: "Validasi Data", completed: status !== "pending", date: "2024-01-16" },
    {
      step: 3,
      label: "Billing & Pembayaran",
      completed: ["billing", "processing", "completed"].includes(status),
      date: "2024-01-17",
    },
    { step: 4, label: "Proses Lisensi", completed: ["processing", "completed"].includes(status), date: "2024-01-18" },
    { step: 5, label: "Aktivasi & Selesai", completed: status === "completed", date: "2024-01-19" },
  ]

  const handleStatusChange = (newStatus: OrderStatusType) => {
    setStatus(newStatus)
  }

  const handleApprove = () => {
    handleStatusChange("validating")
  }

  const handleRevision = () => {
    setShowCommentForm(true)
    handleStatusChange("revision")
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{orderData.id}</h1>
            <p className="text-muted-foreground">Detail pesanan untuk {orderData.companyName}</p>
          </div>
          <Badge className={statusConfig[status].color}>{statusConfig[status].label}</Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Company Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Informasi Perusahaan</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nama Perusahaan</p>
                  <p className="font-medium text-foreground">{orderData.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NPWP</p>
                  <p className="font-medium text-foreground">{orderData.npwp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jumlah Karyawan</p>
                  <p className="font-medium text-foreground">{orderData.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tanggal Order</p>
                  <p className="font-medium text-foreground">{orderData.createdDate}</p>
                </div>
              </div>
            </Card>

            {/* PIC Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Informasi PIC (Person In Charge)</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nama PIC</p>
                  <p className="font-medium text-foreground">{orderData.picName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{orderData.picEmail}</p>
                </div>
                <div colSpan={2} className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Nomor Telepon</p>
                  <p className="font-medium text-foreground">{orderData.picPhone}</p>
                </div>
              </div>
            </Card>

            {/* License Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Informasi Lisensi</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jenis Lisensi</p>
                  <p className="font-medium text-foreground capitalize">{orderData.licenseType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Jumlah User</p>
                  <p className="font-medium text-foreground">{orderData.userCount} users</p>
                </div>
              </div>
              {orderData.notes && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Catatan Tambahan</p>
                  <p className="text-foreground">{orderData.notes}</p>
                </div>
              )}
            </Card>

            {/* Admin Comments Section */}
            {showCommentForm && (
              <Card className="p-6 bg-red-50/30 border-red-200">
                <h3 className="font-semibold text-foreground mb-4">Catatan Revisi</h3>
                <textarea
                  placeholder="Tuliskan alasan revisi dan detail data yang perlu diperbaiki..."
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  rows={4}
                />
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => {
                      setShowCommentForm(false)
                    }}
                    variant="outline"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCommentForm(false)
                    }}
                  >
                    Simpan Catatan
                  </Button>
                </div>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Timeline Aktivitas</h2>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                          item.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.completed ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                      </div>
                      {idx < timeline.length - 1 && (
                        <div className={`w-1 h-12 mt-2 ${item.completed ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Admin Actions */}
          <div className="space-y-6">
            {/* Status Change */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Ubah Status</h3>
              <div className="space-y-2">
                <Button
                  onClick={handleApprove}
                  className="w-full justify-start"
                  variant={status === "validating" ? "default" : "outline"}
                >
                  Approve Data
                </Button>
                <Button
                  onClick={handleRevision}
                  className="w-full justify-start"
                  variant={status === "revision" ? "default" : "outline"}
                >
                  Minta Revisi
                </Button>
              </div>
            </Card>

            {/* Quick Status Demo */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Demo: Ubah Status</h3>
              <div className="space-y-2 text-sm">
                {(["pending", "validating", "billing", "processing", "completed", "revision"] as OrderStatusType[]).map(
                  (st) => (
                    <Button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      variant={status === st ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                    >
                      {statusConfig[st].label}
                    </Button>
                  ),
                )}
              </div>
            </Card>

            {/* Contact PIC */}
            <Card className="p-6 bg-secondary/30">
              <h3 className="font-semibold text-foreground mb-3">Hubungi PIC</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Nama:</span>
                  <br />
                  <span className="font-medium text-foreground">{orderData.picName}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>
                  <br />
                  <a href={`mailto:${orderData.picEmail}`} className="font-medium text-primary hover:underline">
                    {orderData.picEmail}
                  </a>
                </p>
                <p>
                  <span className="text-muted-foreground">Telepon:</span>
                  <br />
                  <a href={`tel:${orderData.picPhone}`} className="font-medium text-primary hover:underline">
                    {orderData.picPhone}
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
