"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useOrderTracking } from "./useOrderTracking";
import { OrderStatus } from "@/types/order";
import { OrderMilestones } from "@/constant/status.constant";

const STATUS_MAP: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  "VALIDASI MANAGER": {
    label: "Validasi Data Oleh Manager",
    color: "bg-blue-100 text-blue-800",
    icon: <Clock className="w-4 h-4" />,
  },
  "INTAKE ORDER": {
    label: "Intake Order Oleh Sales",
    color: "bg-purple-100 text-purple-800",
    icon: <Clock className="w-4 h-4" />,
  },
  SELESAI: {
    label: "Selesai",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  REVISI: {
    label: "Perlu Revisi",
    color: "bg-red-100 text-red-800",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  DITOLAK: {
    label: "Ditolak",
    color: "bg-red-100 text-red-800",
    icon: <AlertCircle className="w-4 h-4" />,
  },
};

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  console.log("id", id);

  const { data, isLoading, isError } = useOrderTracking(id);
  console.log("asd", data?.company_name);
  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError || !data) return <p className="p-8">Order tidak ditemukan</p>;

  const currentIndex = OrderMilestones.indexOf(data.status);

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/order-tracking"
          className="flex gap-2 text-primary mb-6 items-center hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        {/* HEADER */}
        <Card className="p-6 mb-8">
          <p className="text-sm text-muted-foreground">ID Order</p>
          <h1 className="text-3xl font-bold">#{data.id}</h1>

          <Badge className={`mt-4 ${STATUS_MAP[data.status].color}`}>
            {STATUS_MAP[data.status].label}
          </Badge>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* TIMELINE */}
          <div className="md:col-span-2">
            <h2 className="font-semibold mb-4">Status Proses</h2>

            {OrderMilestones.map((step, idx) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      idx <= currentIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {idx < currentIndex ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < OrderMilestones.length - 1 && (
                    <div
                      className={`w-1 h-10 ${
                        idx < currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>

                <div>
                  <p className="font-medium">{STATUS_MAP[step].label}</p>
                  {step === data.status && (
                    <p className="text-sm text-muted-foreground">
                      {data.status === "SELESAI"
                        ? "Selesai"
                        : data.status === "REVISI"
                        ? "Perlu Revisi"
                        : "Sedang diproses"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* DETAIL */}
          <div>
            <h2 className="font-semibold mb-4">Detail Order</h2>

            <Card className="p-6 space-y-3">
              <Detail label="Perusahaan" value={data.company_name} />
              <Detail label="NPWP" value={data.npwp_number} />
              <Detail label="Karyawan" value={data.employees_amount} />
              <Detail label="Lisensi" value={data.license_type} />
              <Detail label="Jumlah User" value={data.user_amount} />
              <Detail label="PIC" value={data.pic_name} />
              <Detail label="Email PIC" value={data.pic_email} />
              {data.notes && <Detail label="Catatan" value={data.notes} />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
    </p>
  );
}
