"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDashboard } from "./useDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye } from "lucide-react";
import { getCookie } from "@/utils/cookies";
import { OrderStatus } from "@/types/order";

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  "VALIDASI MANAGER": {
    label: "Validasi Manager",
    color: "bg-blue-100 text-blue-800",
  },
  "INTAKE ORDER": {
    label: "Validasi Sales",
    color: "bg-purple-100 text-purple-800",
  },
  SELESAI: { label: "Selesai", color: "bg-green-100 text-green-800" },
  REVISI: { label: "Revisi", color: "bg-red-100 text-red-800" },
  DITOLAK: { label: "DITOLAK", color: "bg-red-100 text-red-800" },
};

export function AdminDashboardPage() {
  const { data, isLoading, isError } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const COOKIE_NAME = "admin_auth";

  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    if (!stored) return;
    const parsedstore = JSON.parse(stored);
    console.log("parapmpam", parsedstore.role);
  }, []);

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError || !data) return <p className="p-8">Gagal memuat data order</p>;

  const filteredOrders = data.filter(
    (order) =>
      order.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pic_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.id).includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manajemen order lisensi Odoo</p>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID, perusahaan, atau email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Email PIC</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.company_name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {order.pic_email}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[order.status].color}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.created_date).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={` orders/${order.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
