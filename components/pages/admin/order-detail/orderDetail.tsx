"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { OrderStatus } from "@/types/order";
import { useAdminOrderDetail } from "./useOrderDetail";
import { useParams } from "next/navigation";
import { getCookie } from "@/utils/cookies";
import { Textarea } from "@/components/ui/textarea";

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  "VALIDASI MANAGER": {
    label: "Validasi Manager",
    color: "bg-blue-100 text-blue-800",
  },
  "INTAKE ORDER": {
    label: "Validasi Sales",
    color: "bg-purple-100 text-purple-800",
  },
  SELESAI: { label: "Selesai", color: "bg-green-100 text-cyan-800" },
  REVISI: { label: "Perlu Revisi", color: "bg-red-100 text-red-800" },
  DITOLAK: { label: "Ditolak", color: "bg-red-100 text-red-800" },
};

export function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = Number(params.id);
  const { order, isLoading, updateStatus, updating } =
    useAdminOrderDetail(orderId);

  console.log("ord", orderId, order);

  const [adminComment, setAdminComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fecthCookies = getCookie("admin_auth");
    const parsedCookies = fecthCookies ? JSON.parse(fecthCookies) : null;
    setRole(parsedCookies?.role || null);
  }, []);

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-10 text-center">Order tidak ditemukan</div>;
  }

  const timeline = [
    { label: "Order Diterima", completed: true },
    {
      label: "Validasi Data Oleh Manager",
      completed:
        order.status === "VALIDASI SALES" || order.status === "SELESAI",
    },
    {
      label: "Intake Order Oleh Sales",
      completed: order.status === "SELESAI",
    },
    {
      label: "Aktivasi & Selesai",
      completed: order.status === "SELESAI",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-5 px-4">
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
              <h2 className="font-semibold">Informasi Perusahaan</h2>
              <div className="grid grid-cols-2 gap-4">
                <Data label="Nama" value={order.company_name} />
                <Data label="NPWP" value={order.npwp_number} />
                <Data label="Jumlah Karyawan" value={order.employees_amount} />
                <Data
                  label="Tanggal Order"
                  value={order.created_date.split("T")[0]}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold">Informasi PIC</h2>
              <div className="grid grid-cols-2 gap-4">
                <Data label="Nama" value={order.pic_name} />
                <Data label="Email" value={order.pic_email} />
                <Data label="Telepon" value={order.pic_phone} />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold">Informasi License</h2>
              <div className="grid grid-cols-2 gap-4">
                <Data label="Jenis Lisensi" value={order.license_type} />
                <Data label="Jumlah User" value={order.user_amount} />
              </div>
            </Card>

            {order.notes && (
              <Card className="p-6">
                <h2 className="font-semibold">Notes</h2>
                <div>
                  <Textarea
                    value={order.notes}
                    readOnly
                    className="w-full border rounded-md p-3 bg-muted/50"
                  />
                </div>
              </Card>
            )}

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
              <h2 className="font-semibold">Timeline</h2>

              <div className="relative">
                {timeline.map((item, i) => {
                  const isLast = i === timeline.length - 1;

                  return (
                    <div key={i} className="flex gap-4">
                      {/* Left: Dot + Line */}
                      <div className="flex flex-col items-center">
                        {/* Dot */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center z-10
                ${
                  item.completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }
              `}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{i + 1}</span>
                          )}
                        </div>

                        {/* Line */}
                        {!isLast && (
                          <div
                            className={`w-1 flex-1
                  ${item.completed ? "bg-primary" : "bg-border"}
                `}
                          />
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="pb-10">
                        <p
                          className={`text-sm font-medium
                ${item.completed ? "text-foreground" : "text-muted-foreground"}
              `}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">
                Aksi{" "}
                {role === "manager"
                  ? "Manager"
                  : role === "sales"
                  ? "Sales"
                  : "Admin"}
              </h3>
              <Button
                className="w-full mb-2"
                disabled={updating}
                onClick={() => {
                  const nextStatus =
                    role === "manager" ? "INTAKE ORDER" : "SELESAI";
                  updateStatus({ status: nextStatus });
                }}
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
