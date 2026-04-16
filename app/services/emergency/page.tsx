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
  const emergencyCards = [
    {
      icon: <Clock size={32} strokeWidth={1.5} />,
      title: "OPERASIONAL 24/7",
      desc: "Kesiagaan penuh tanpa jeda untuk penanganan kritis pasien.",
    },
    {
      icon: <Stethoscope size={32} strokeWidth={1.5} />,
      title: "UNIT SPESIALIS",
      desc: "Tim dokter ahli dengan standar sertifikasi gawat darurat internasional.",
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "PRESISI MEDIS",
      desc: "Diagnosis akurat dengan dukungan peralatan otomasi medis terbaru.",
    },
  ];

  return (
    <div className="min-h-screen bg-white mb-20 text-slate-900 font-sans">
      {/* HERO - Industrial Minimalist */}
      <div className="relative border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-black mb-8 leading-[0.9] tracking-tighter">
              GAWAT <br />
              <span className="text-black">DARURAT</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12 max-w-xl border-l-2 border-[#005075] pl-6">
              Respon cepat medis RS Medika Lestari. Terintegrasi dengan
              teknologi mutakhir dan tim ahli yang siap menangani kondisi kritis
              secara instan.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/6282246232527"
                target="_blank"
                className="bg-slate-950 text-white px-10 py-5 rounded-none font-bold tracking-widest uppercase text-xs hover:bg-[#005075] transition-colors duration-300"
              >
                Hubungi Sekarang
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-[1160px] mx-auto px-6 py-24">
        {/* CARD DENGAN EFEK POLYGON */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          {emergencyCards.map((item, index) => (
            <div
              key={index}
              className="group relative h-[300px] w-full overflow-hidden border border-slate-200 bg-white cursor-pointer"
            >
              {/* Background State (Normal) */}
              <div className="absolute inset-0 p-10 z-10 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0">
                <div className="text-slate-400">{item.icon}</div>
                <div>
                  <h3 className="text-xs font-black tracking-[0.2em] text-slate-950 mb-2">
                    {item.title}
                  </h3>
                  <div className="h-1 w-8 bg-slate-200" />
                </div>
              </div>

              {/* Polygon Hover State (Overlay yang naik) */}
              <div
                className="absolute inset-0 z-20 bg-[#005075]/90 flex flex-col justify-center p-10 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0"
                style={{
                  clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0% 100%)",
                }}
              >
                <div className="text-white mb-4">{item.icon}</div>
                <h3 className="text-white text-sm font-black tracking-[0.2em] mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed uppercase tracking-wider">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION DETAIL - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Plus className="text-[#005075]" size={24} strokeWidth={3} />
              <h2 className="text-4xl font-black tracking-tighter uppercase">
                Protokol Triase
              </h2>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed border-t border-slate-100 pt-8">
              Sistem klasifikasi medis kami menjamin pasien dengan tingkat
              kegawatan tertinggi mendapatkan intervensi tanpa penundaan.
              Kecepatan adalah parameter utama dalam setiap keputusan klinis
              yang kami ambil.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="border-l-4 border-slate-900 p-8 bg-slate-50">
              <h4 className="font-black text-[10px] tracking-[0.3em] uppercase mb-6 text-slate-400 flex items-center justify-between">
                Layanan Inti <ChevronRight size={14} />
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "TRAUMA CARE",
                  "CARDIAC ARREST",
                  "STROKE UNIT",
                  "CRITICAL CARE",
                ].map((text) => (
                  <div
                    key={text}
                    className="text-[11px] font-bold text-slate-900 flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600" /> {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-[#005075] p-8 bg-slate-50">
              <h4 className="font-black text-[10px] tracking-[0.3em] uppercase mb-6 text-slate-400 flex items-center justify-between">
                Standarisasi <ChevronRight size={14} />
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "ZERO QUEUE",
                  "RAPID RESPONSE",
                  "SYNC-COORD",
                  "PARIPURNA",
                ].map((text) => (
                  <div
                    key={text}
                    className="text-[11px] font-bold text-slate-900 flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-[#005075]" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
