"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-primary" />

        <h1 className="text-2xl font-bold">Pesanan Berhasil Dibuat</h1>

        <p className="text-muted-foreground">
          ID Pesanan Anda:
          <span className="font-semibold ml-1">#{orderId}</span>
        </p>

        <div className="flex flex-col gap-3 pt-4">
          <Link href={`/order-tracking/${orderId}`}>
            <Button className="w-full">Lihat Status Pesanan</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
