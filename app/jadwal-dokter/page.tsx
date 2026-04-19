import React from "react";
import DoctorScheduleGrid from "@/components/DoctorScheduleGrid";
import { fetchAllDoctorsWithSchedules } from "@/lib/api";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Jadwal Dokter | RS Medika Lestari",
  description:
    "Lihat jadwal praktek lengkap semua dokter spesialis yang sedang anda cari.",
};

export default async function DoctorSchedulePage() {
  const doctorsWithSchedules = await fetchAllDoctorsWithSchedules();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1176px] mx-auto px-6 md:px-8 py-12">
        {/* BREADCRUMB */}
        <div className="mb-8 md:mb-12 border-b border-slate-100 pb-6 -mt-4">
          <nav className="flex items-center gap-1 text-[14px] text-gray-300 mb-4">
            <Link
              href="/"
              className="text-black hover:text-gray-300 transition-colors"
            >
              Beranda
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="font-normal">Jadwal Dokter</span>
          </nav>
          <h1 className="text-4xl font-bold text-black mb-2">Jadwal Dokter</h1>
          <p className="text-slate-600">
            Lihat jadwal praktek lengkap semua dokter spesialis yang sedang anda
            cari.
          </p>
        </div>

        {/* The Grid Component */}
        <div className="mb-20">
          <DoctorScheduleGrid
            doctorsWithSchedules={doctorsWithSchedules}
            loading={false}
          />
        </div>

        {/* MINIMALIST FOOTER NOTE */}
        <div className="flex flex-col md:flex-row items-center justify-between py-10 border-t border-slate-100 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-slate-900">
              Butuh Bantuan Pendaftaran?
            </span>
            <p className="text-xs text-slate-500">
              Silahkan hubungi bagian pendaftaran atau kunjungi meja informasi
              kami.
            </p>
          </div>
          <a
            href="https://wa.me/6282246232527"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#005cb3] text-white text-sm font-semibold rounded-full hover:bg-[#005cb3]/90 transition-all shadow-sm hover:scale-95"
          >
            Hubungi Customer Service
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
