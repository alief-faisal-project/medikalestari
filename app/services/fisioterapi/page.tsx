import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Fisioterapi() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#0084BF] hover:text-[#005075] mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#005075] mb-4">
            Fisioterapi
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Terapi Rehabilitasi Profesional
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Departemen Fisioterapi kami menyediakan layanan rehabilitasi
              dengan terapis bersertifikat dan menggunakan teknologi terkini
              untuk membantu pemulihan dan meningkatkan kualitas hidup pasien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">
                Jenis Terapi
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Terapi manual</li>
                <li>✓ Terapi elektrik</li>
                <li>✓ Rehabilitasi cedera</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">Jam Layanan</h3>
              <p className="text-sm text-gray-700">
                Senin - Jumat: 08:00 - 17:00
              </p>
              <p className="text-sm text-gray-700">Sabtu: 08:00 - 14:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
