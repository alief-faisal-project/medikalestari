"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Fisioterapi() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans text-slate-900">
      <div className="max-w-md w-full px-8 text-center">
        {/* Link Kembali yang Sederhana */}
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
          Halaman Fisioterapi RS Medika Lestari saat ini sedang diperbarui untuk
          meningkatkan sistem penjadwalan terapi Anda.
        </p>

        {/* Garis pemisah tipis */}
        <div className="h-px bg-slate-200 w-full mb-8" />

        {/* Footer info */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-400 text-xs">
            Layanan Rehabilitasi Medik & Fisioterapi
          </p>
          <span className="text-slate-400 text-xs font-medium">
            RS Medika Lestari &copy; 2026
          </span>
        </div>
      </div>
    </div>
  );
}
