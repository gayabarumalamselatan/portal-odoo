"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { OrderStatus } from "@/types/order";
import { useAdminOrderDetail } from "./useOrderDetail";
import { useParams } from "next/navigation";

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  DITERIMA: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800" },
  VALIDASI: { label: "Validasi Data", color: "bg-blue-100 text-blue-800" },
  BILLING: { label: "Billing", color: "bg-purple-100 text-purple-800" },
  PROSES: { label: "Proses", color: "bg-cyan-100 text-cyan-800" },
  SELESAI: { label: "Selesai", color: "bg-green-100 text-green-800" },
  REVISI: { label: "Perlu Revisi", color: "bg-red-100 text-red-800" },
};

export function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = Number(params.id);
  const { order, isLoading, updateStatus, updating } =
    useAdminOrderDetail(orderId);

  console.log("ord", orderId, order);

  const [adminComment, setAdminComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-10 text-center">Order tidak ditemukan</div>;
  }

  const timeline = [
    { label: "Order Diterima", completed: true },
    { label: "Validasi Data", completed: order.status !== "DITERIMA" },
    {
      label: "Billing & Pembayaran",
      completed: ["BILLING", "PROSES", "SELESAI"].includes(order.status),
    },
    {
      label: "Proses Lisensi",
      completed: ["PROSES", "SELESAI"].includes(order.status),
    },
    {
      label: "Aktivasi & Selesai",
      completed: order.status === "SELESAI",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
            <p className="text-muted-foreground">{order.company_name}</p>
          </div>
          <Badge className={statusConfig[order.status as OrderStatus].color}>
            {statusConfig[order.status as OrderStatus].label}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Informasi Perusahaan</h2>
              <div className="grid grid-cols-2 gap-4">
                <Data label="Nama" value={order.company_name} />
                <Data label="NPWP" value={order.npwp_number} />
                <Data label="Jumlah Karyawan" value={order.employees_amount} />
                <Data label="Tanggal Order" value={order.created_at} />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Informasi PIC</h2>
              <div className="grid grid-cols-2 gap-4">
                <Data label="Nama" value={order.pic_name} />
                <Data label="Email" value={order.pic_email} />
                <Data label="Telepon" value={order.pic_phone} />
              </div>
            </Card>

            {showCommentForm && (
              <Card className="p-6 border-red-200 bg-red-50">
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  className="w-full border rounded-md p-3"
                  placeholder="Catatan revisi"
                />
                <div className="flex gap-2 mt-4">
                  <Button
                    disabled={updating}
                    onClick={() =>
                      updateStatus({
                        status: "REVISI",
                        admin_comment: adminComment,
                      })
                    }
                  >
                    Simpan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCommentForm(false)}
                  >
                    Batal
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.completed ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      {item.completed ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    <p className="text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Aksi Admin</h3>
              <Button
                className="w-full mb-2"
                disabled={updating}
                onClick={() => updateStatus({ status: "VALIDASI" })}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCommentForm(true)}
              >
                Minta Revisi
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Data({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
