import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KamarPerawatan() {
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
            Kamar Perawatan
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Fasilitas Kamar yang Nyaman
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kami menyediakan berbagai tipe kamar perawatan dengan fasilitas
              lengkap dan lingkungan yang nyaman untuk mendukung proses
              pemulihan pasien dengan dukungan medis 24 jam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">Tipe Kamar</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Kamar VIP</li>
                <li>✓ Kamar Kelas 1</li>
                <li>✓ Kamar Kelas 2 & 3</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">Fasilitas</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ AC & TV</li>
                <li>✓ WiFi gratis</li>
                <li>✓ Pantau pasien 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
