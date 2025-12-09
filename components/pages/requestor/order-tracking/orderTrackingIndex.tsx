"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OrderTrackingIndexPage() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Tracking Pesanan</h1>

        <Input
          type="number"
          placeholder="Masukkan ID Order (contoh: 1)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <Button
          className="w-full"
          disabled={!orderId}
          onClick={() => router.push(`/order-tracking/${orderId}`)}
        >
          Lacak Pesanan
        </Button>
      </Card>
    </div>
  );
}
