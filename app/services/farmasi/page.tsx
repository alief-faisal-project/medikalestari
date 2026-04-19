"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PhoneCall,
  Pill,
  Clock,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function Farmasi() {
  // Logic tetap dipertahankan
  const operationalHours = {
    weekday: "08:00 - 17:00",
    saturday: "08:00 - 14:00",
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans text-slate-900">
      <div className="max-w-md w-full px-8 text-center">
        {/* Breadcrumb / Tombol Kembali (Disamakan dengan Fisioterapi) */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Konten Utama */}
        <h1 className="text-3xl font-semibold mb-4">
          Sedang dalam pengembangan
        </h1>

        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Halaman Layanan Farmasi RS Medika Lestari saat ini sedang diperbarui
          untuk sistem integrasi obat yang lebih baik. Silakan kembali lagi
          nanti.
        </p>

        {/* Garis pemisah tipis */}
        <div className="h-px bg-slate-200 w-full mb-8" />

        {/* Footer info & Kontak (Aksen warna disamakan) */}
        <div className="flex flex-col gap-4">
          <a
            href="tel:+622112345678"
            className="text-slate-400 hover:text-slate-600 text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall size={14} /> Hubungi Layanan Farmasi
          </a>
          <div className="flex flex-col gap-1">
            <p className="text-slate-400 text-xs">
              Instalasi Farmasi & Layanan Obat
            </p>
            <span className="text-slate-400 text-xs font-medium">
              RS Medika Lestari &copy; 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
