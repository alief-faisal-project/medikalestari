"use client";

import React from "react";
import {
  PhoneCall,
  Clock,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Plus,
} from "lucide-react";

export default function Emergency() {
  // Logic & Data tetap dipertahankan
  const emergencyCards = [
    {
      icon: <Clock size={32} />,
      title: "OPERASIONAL 24/7",
      desc: "Kesiagaan penuh tanpa jeda untuk penanganan kritis pasien.",
    },
    {
      icon: <Stethoscope size={32} />,
      title: "UNIT SPESIALIS",
      desc: "Tim dokter ahli dengan standar sertifikasi gawat darurat internasional.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "PRESISI MEDIS",
      desc: "Diagnosis akurat dengan dukungan peralatan otomasi medis terbaru.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans text-slate-900">
      <div className="max-w-md w-full px-8 text-center">
        {/* Konten Utama */}
        <h1 className="text-3xl font-semibold mb-4">
          Sedang dalam pengembangan
        </h1>

        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Halaman Gawat Darurat RS Medika Lestari saat ini sedang diperbarui
          untuk meningkatkan kualitas layanan kami. Silakan kembali lagi nanti.
        </p>

        {/* Garis pemisah tipis */}
        <div className="h-px bg-slate-200 w-full mb-8" />

        {/* Link Sederhana */}
        <div className="flex flex-col gap-4">
          <a
            href="https://wa.me/6282246232527"
            target="_blank"
            className="text-blue-600 hover:underline text-sm"
          >
            Hubungi Customer Service
          </a>
          <span className="text-slate-400 text-xs">
            RS Medika Lestari &copy; 2026
          </span>
        </div>
      </div>
    </div>
  );
}
