"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  CreditCard,
  Cloud,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/layout/navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <LandingNavbar />
      {/* ================= HERO ================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        {/* Decorative Blur */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            Portal Pemesanan Lisensi
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Odoo License Order Portal
          </h1>

          <p className="text-xl text-muted-foreground mb-10 text-balance">
            Ajukan dan pantau proses pemesanan lisensi Odoo dengan mudah, cepat,
            dan transparan.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/start-order">
              <Button size="lg" className="px-10 hover:cursor-pointer">
                Buat Order Baru
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PROCESS FLOW ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center text-foreground mb-20"
          >
            Alur Pemesanan Lisensi
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: FileText,
                title: "Isi Data",
                desc: "Lengkapi data perusahaan dan PIC",
              },
              {
                icon: CheckCircle2,
                title: "Validasi",
                desc: "Tim memeriksa kelengkapan data",
              },
              {
                icon: CreditCard,
                title: "Billing",
                desc: "Proses billing & pembayaran",
              },
              {
                icon: Cloud,
                title: "Aktivasi",
                desc: "Lisensi siap digunakan",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative flex flex-col items-center p-6 rounded-2xl bg-card border shadow-sm"
              >
                <div className="absolute -top-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2 text-foreground text-center">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground text-center">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-14"
          >
            Kenapa Menggunakan Portal Ini?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Pantau status order secara real-time",
              "Tanpa login, cukup gunakan email",
              "Transparan di setiap tahap",
              "Proses terstruktur & mudah dipahami",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-xl border bg-card"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Siap Mengajukan Lisensi Odoo?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Proses cepat, tanpa ribet, dan bisa dipantau kapan saja.
          </p>

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link href="/start-order">
              <Button size="lg" className="px-14 hover:cursor-pointer">
                Mulai Sekarang
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
