"use client";

import React from "react";
import {
  Pill,
  Clock,
  ShieldCheck,
  ClipboardList,
  PhoneCall,
} from "lucide-react";

export default function Farmasi() {
  return (
    <div className="min-h-screen bg-gray-50 mb-20">
      {/* HERO */}
      <div className="bg-gradient-to-r from-[#005075] to-[#015A85] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan Farmasi
          </h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">
            RS Medika Lestari menyediakan layanan farmasi dengan standar tinggi,
            memastikan ketersediaan obat yang aman, lengkap, dan didukung oleh
            apoteker profesional untuk kebutuhan terapi pasien.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="tel:+622112345678"
              className="flex items-center gap-2 bg-white text-[#005075] px-5 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              <PhoneCall size={18} />
              Hubungi Farmasi
            </a>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* INFO UTAMA */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Pill className="text-[#015A85] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">Obat Lengkap</h3>
            <p className="text-sm text-gray-600">
              Menyediakan obat resep dan non-resep dengan kualitas terjamin.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ClipboardList className="text-[#015A85] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">
              Konsultasi Apoteker
            </h3>
            <p className="text-sm text-gray-600">
              Layanan informasi obat dan penggunaan yang aman & tepat.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ShieldCheck className="text-[#015A85] mb-3" size={28} />
            <h3 className="font-semibold text-gray-800 mb-1">
              Standar Keamanan
            </h3>
            <p className="text-sm text-gray-600">
              Penyimpanan dan distribusi obat sesuai standar medis.
            </p>
          </div>
        </div>

        {/* DESKRIPSI */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-[#005075] mb-4">
            Pelayanan Farmasi Terintegrasi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Instalasi Farmasi RS Medika Lestari berperan penting dalam mendukung
            terapi pasien melalui penyediaan obat yang tepat, aman, dan
            berkualitas. Setiap resep yang masuk akan ditinjau oleh apoteker
            untuk memastikan kesesuaian dosis, interaksi obat, serta keamanan
            penggunaan bagi pasien.
          </p>
        </div>

        {/* LAYANAN & JAM */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-[#005075] mb-3">
              Layanan Farmasi
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Pelayanan resep dokter</li>
              <li>✓ Obat bebas & alat kesehatan</li>
              <li>✓ Konsultasi penggunaan obat</li>
              <li>✓ Informasi efek samping & interaksi</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-[#005075] mb-3 flex items-center gap-2">
              <Clock size={18} />
              Jam Operasional
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Senin - Jumat: 08:00 - 17:00</p>
              <p>Sabtu: 08:00 - 14:00</p>
              <p className="text-xs text-gray-500 mt-2">
                *Untuk layanan tertentu dapat menyesuaikan kebutuhan pasien
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
