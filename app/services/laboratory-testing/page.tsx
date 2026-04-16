import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LaboratoryTesting() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#015A85] hover:text-[#005075] mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-[#005075] mb-4">
            Laboratory Testing
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Pemeriksaan Laboratorium Akurat
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Laboratorium kami dilengkapi dengan teknologi diagnostik terkini
              dan tenaga ahli bersertifikat untuk memberikan hasil pemeriksaan
              yang akurat dan cepat untuk mendukung diagnosis klinis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">Pemeriksaan</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Tes darah lengkap</li>
                <li>✓ Kimia klinis</li>
                <li>✓ Mikrobiologi</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#005075] mb-2">
                Kecepatan Hasil
              </h3>
              <p className="text-sm text-gray-700">Hasil dalam 24 jam</p>
              <p className="text-sm text-gray-700">Urgent: 2-3 jam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
