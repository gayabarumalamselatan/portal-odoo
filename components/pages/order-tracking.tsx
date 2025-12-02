"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit2,
} from "lucide-react";

type OrderStatus =
  | "pending"
  | "validating"
  | "billing"
  | "processing"
  | "completed"
  | "revision";

interface OrderData {
  companyName: string;
  npwp: string;
  employees: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  licenseType: string;
  userCount: string;
  notes: string;
}

export function OrderTrackingPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderId] = useState(`ORD-${Date.now()}`);
  const [status, setStatus] = useState<OrderStatus>("pending");
  const [adminNotes, setAdminNotes] = useState(
    "Terima kasih telah mengirimkan order. Kami akan segera memvalidasi data Anda."
  );

  useEffect(() => {
    const completeOrder = sessionStorage.getItem("completeOrder");
    if (completeOrder) {
      setOrderData(JSON.parse(completeOrder));
    }
  }, []);

  const statusConfig: Record<
    OrderStatus,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Menunggu",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="w-5 h-5" />,
    },
    validating: {
      label: "Validasi Data",
      color: "bg-blue-100 text-blue-800",
      icon: <Clock className="w-5 h-5" />,
    },
    billing: {
      label: "Billing",
      color: "bg-purple-100 text-purple-800",
      icon: <Clock className="w-5 h-5" />,
    },
    processing: {
      label: "Proses",
      color: "bg-cyan-100 text-cyan-800",
      icon: <Clock className="w-5 h-5" />,
    },
    completed: {
      label: "Selesai",
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    revision: {
      label: "Perlu Revisi",
      color: "bg-red-100 text-red-800",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const timeline = [
    {
      step: 1,
      label: "Order Diterima",
      status: "completed",
      date: new Date().toLocaleDateString("id-ID"),
    },
    {
      step: 2,
      label: "Validasi Data",
      status: status as any,
      date:
        status === "validating" ||
        ["billing", "processing", "completed"].includes(status)
          ? "Sedang diproses..."
          : "Menunggu...",
    },
    {
      step: 3,
      label: "Billing & Pembayaran",
      status: ["billing", "processing", "completed"].includes(status)
        ? "completed"
        : "pending",
      date: ["billing", "processing", "completed"].includes(status)
        ? "Sedang diproses..."
        : "Menunggu...",
    },
    {
      step: 4,
      label: "Proses Lisensi",
      status: ["processing", "completed"].includes(status)
        ? "completed"
        : "pending",
      date:
        status === "completed"
          ? new Date().toLocaleDateString("id-ID")
          : "Menunggu...",
    },
    {
      step: 5,
      label: "Aktivasi & Selesai",
      status: status === "completed" ? "completed" : "pending",
      date:
        status === "completed"
          ? new Date().toLocaleDateString("id-ID")
          : "Menunggu...",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Status Banner */}
        <Card className="p-6 mb-8 border-l-4 border-l-primary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">ID Order</p>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {orderId}
              </h1>
              <Badge className={statusConfig[status].color}>
                <span className="flex items-center gap-2">
                  {statusConfig[status].icon}
                  {statusConfig[status].label}
                </span>
              </Badge>
            </div>
            {status === "revision" && (
              <Button variant="outline" className="gap-2 bg-transparent">
                <Edit2 className="w-4 h-4" />
                Perbaiki Data
              </Button>
            )}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Timeline Status
            </h2>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        item.status === "completed"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        item.step
                      )}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div
                        className={`w-1 h-12 mt-2 ${
                          item.status === "completed"
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Ringkasan Order
            </h2>
            {orderData && (
              <Card className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Perusahaan
                  </p>
                  <p className="font-medium text-foreground">
                    {orderData.companyName}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Jenis Lisensi
                  </p>
                  <p className="font-medium text-foreground capitalize">
                    {orderData.licenseType}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Jumlah User
                  </p>
                  <p className="font-medium text-foreground">
                    {orderData.userCount} users
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    PIC
                  </p>
                  <p className="font-medium text-foreground">
                    {orderData.picName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.picEmail}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Admin Notes */}
        <Card className="mt-8 p-6 bg-secondary/30">
          <h3 className="font-semibold text-foreground mb-3">
            Catatan dari Tim Admin
          </h3>
          <p className="text-muted-foreground">{adminNotes}</p>
        </Card>

        {/* Demo Status Buttons */}
        <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-muted">
          <p className="text-sm text-muted-foreground mb-4">
            Demo: Ubah status order untuk melihat perubahan timeline
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(statusConfig) as OrderStatus[]).map((st) => (
              <Button
                key={st}
                variant={status === st ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setStatus(st);
                  if (st === "revision") {
                    setAdminNotes(
                      "Mohon perbaiki data NPWP yang tidak sesuai. Silakan hubungi kami untuk detail lebih lanjut."
                    );
                  } else if (st === "completed") {
                    setAdminNotes(
                      "Lisensi Odoo Anda telah aktif! Anda sudah bisa mengakses platform. Terima kasih telah bermitra dengan kami."
                    );
                  }
                }}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
