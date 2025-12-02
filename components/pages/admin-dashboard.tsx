"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Eye } from "lucide-react"

type OrderStatusType = "pending" | "validating" | "billing" | "processing" | "completed" | "revision"

interface AdminOrder {
  id: string
  companyName: string
  email: string
  status: OrderStatusType
  stage: string
  createdDate: string
}

export function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusType | "all">("all")

  // Mock data - in real app, would fetch from API
  const mockOrders: AdminOrder[] = [
    {
      id: "ORD-001",
      companyName: "PT. Teknologi Indonesia",
      email: "pic@teknologi.com",
      status: "completed",
      stage: "Aktivasi & Selesai",
      createdDate: "2024-01-15",
    },
    {
      id: "ORD-002",
      companyName: "CV. Digital Solusi",
      email: "admin@digital.com",
      status: "processing",
      stage: "Proses Lisensi",
      createdDate: "2024-01-18",
    },
    {
      id: "ORD-003",
      companyName: "PT. Maju Jaya",
      email: "contact@majujaya.com",
      status: "billing",
      stage: "Billing & Pembayaran",
      createdDate: "2024-01-20",
    },
    {
      id: "ORD-004",
      companyName: "PT. Inovasi Bisnis",
      email: "info@inovasi.com",
      status: "validating",
      stage: "Validasi Data",
      createdDate: "2024-01-22",
    },
    {
      id: "ORD-005",
      companyName: "PT. Solusi Global",
      email: "support@solusi.com",
      status: "revision",
      stage: "Perlu Revisi",
      createdDate: "2024-01-23",
    },
    {
      id: "ORD-006",
      companyName: "PT. Berkah Teknologi",
      email: "cs@berkah.com",
      status: "pending",
      stage: "Order Diterima",
      createdDate: "2024-01-24",
    },
  ]

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const statusConfig: Record<OrderStatusType, { label: string; color: string }> = {
    pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800" },
    validating: { label: "Validasi Data", color: "bg-blue-100 text-blue-800" },
    billing: { label: "Billing", color: "bg-purple-100 text-purple-800" },
    processing: { label: "Proses", color: "bg-cyan-100 text-cyan-800" },
    completed: { label: "Selesai", color: "bg-green-100 text-green-800" },
    revision: { label: "Perlu Revisi", color: "bg-red-100 text-red-800" },
  }

  const statusOptions: Array<{ value: OrderStatusType | "all"; label: string }> = [
    { value: "all", label: "Semua Status" },
    { value: "pending", label: "Menunggu" },
    { value: "validating", label: "Validasi Data" },
    { value: "billing", label: "Billing" },
    { value: "processing", label: "Proses" },
    { value: "completed", label: "Selesai" },
    { value: "revision", label: "Perlu Revisi" },
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Kelola dan pantau semua order lisensi Odoo</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Order</p>
            <p className="text-3xl font-bold text-foreground">{mockOrders.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Selesai</p>
            <p className="text-3xl font-bold text-green-600">
              {mockOrders.filter((o) => o.status === "completed").length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Sedang Diproses</p>
            <p className="text-3xl font-bold text-blue-600">
              {mockOrders.filter((o) => ["processing", "billing", "validating"].includes(o.status)).length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Perlu Revisi</p>
            <p className="text-3xl font-bold text-red-600">
              {mockOrders.filter((o) => o.status === "revision").length}
            </p>
          </Card>
        </div>

        {/* Filter and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-background">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari order ID, perusahaan, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Perusahaan</TableHead>
                  <TableHead className="font-semibold">Email PIC</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Tahap</TableHead>
                  <TableHead className="font-semibold">Dibuat</TableHead>
                  <TableHead className="font-semibold text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-b hover:bg-secondary/20 transition-colors">
                      <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                      <TableCell className="text-foreground">{order.companyName}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{order.email}</TableCell>
                      <TableCell>
                        <Badge className={statusConfig[order.status].color}>{statusConfig[order.status].label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.stage}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.createdDate}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Lihat
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tidak ada order yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
