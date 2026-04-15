"use client";

import React from "react";
import { PhoneCall, Clock, ShieldCheck, Stethoscope } from "lucide-react";

export default function Emergency() {
  return (
    <div className="min-h-screen bg-gray-50 mb-20">
      {/* HERO */}
      <div className="bg-gradient-to-r from-[#005075] to-[#0084BF] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan Gawat Darurat
          </h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">
            RS Medika Lestari siap memberikan penanganan cepat dan tepat untuk
            kondisi darurat medis selama 24 jam dengan dukungan tim profesional
            dan fasilitas modern.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://wa.me/6282246232527"
              target="_blank"
              className="flex items-center gap-2 bg-white text-[#005075] px-5 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              <PhoneCall size={18} />
              Hubungi Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* INFO UTAMA */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Clock className="text-[#0084BF] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">Layanan 24 Jam</h3>
            <p className="text-sm text-gray-600">
              Siap melayani pasien darurat kapan saja tanpa henti.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Stethoscope className="text-[#0084BF] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">
              Tim Medis Profesional
            </h3>
            <p className="text-sm text-gray-600">
              Ditangani oleh dokter dan perawat berpengalaman di bidangnya.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ShieldCheck className="text-[#0084BF] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">
              Peralatan Modern
            </h3>
            <p className="text-sm text-gray-600">
              Didukung teknologi medis terkini untuk diagnosis cepat dan akurat.
            </p>
          </div>
        </div>

        {/* DESKRIPSI */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-[#005075] mb-4">
            Penanganan Cepat dan Tepat
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Instalasi Gawat Darurat (IGD) RS Medika Lestari dirancang untuk
            memberikan penanganan cepat terhadap berbagai kondisi darurat
            seperti kecelakaan, serangan jantung, stroke, dan kondisi kritis
            lainnya. Kami mengutamakan kecepatan, ketepatan diagnosis, dan
            keselamatan pasien dalam setiap tindakan medis.
          </p>
        </div>

        {/* LAYANAN */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-[#005075] mb-3">
              Layanan yang Tersedia
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Penanganan trauma & kecelakaan</li>
              <li>✓ Serangan jantung & stroke</li>
              <li>✓ Kondisi kritis & resusitasi</li>
              <li>✓ Observasi pasien darurat</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-[#005075] mb-3">Komitmen Kami</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Respon cepat tanpa antre panjang</li>
              <li>✓ Prioritas keselamatan pasien</li>
              <li>✓ Pelayanan ramah & profesional</li>
              <li>✓ Koordinasi cepat antar tim medis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
