"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingTop: scrolled ? "0.75rem" : "1.5rem",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 z-50 w-full flex justify-center px-4`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`
            flex items-center justify-between w-full max-w-6xl
            ${
              scrolled
                ? "bg-white/70 dark:bg-background/70 backdrop-blur-xl shadow-lg rounded-full px-6 py-3 border"
                : "bg-transparent px-6 py-4"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground">Odoo Portal</span>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <Link href="#process" className="hover:text-foreground transition">
              Proses
            </Link>
            <Link href="#benefits" className="hover:text-foreground transition">
              Keunggulan
            </Link>
          </nav>

          {/* CTA */}
          <Link href="/start-order">
            <Button size="sm" className="rounded-full px-5">
              Buat Order
            </Button>
          </Link>
        </motion.div>
      </motion.header>
    </AnimatePresence>
  );
}
