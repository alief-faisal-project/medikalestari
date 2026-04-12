"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  User,
  Stethoscope,
  CalendarDays,
  FilterIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDoctors } from "@/lib/api";
import { Doctor } from "@/lib/types";
import DoctorSkeleton from "./DoctorSkeleton";

export const SPECIALTY_CATEGORIES = [
  "Semua Spesialis",
  "Spesialis Penyakit Dalam",
  "Spesialis Bedah Umum",
  "Spesialis Saraf",
  "Spesialis Orthopedi",
  "Spesialis Paru",
  "Spesialis Jantung & Pembuluh Darah",
  "Spesialis THT",
  "Spesialis Anak",
  "Spesialis Mata",
  "Spesialis Obgyn",
  "Spesialis Gigi",
  "Spesialis Fisioterapi",
];

const ITEMS_PER_PAGE = 10;

const DoctorSection = ({
  initialSearch = "",
  initialSpecialty = "",
}: {
  initialSearch?: string;
  initialSpecialty?: string;
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaging, setIsPaging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- FILTER SEMENTARA (Input) ---
  const [tempFilter, setTempFilter] = useState({
    name: initialSearch || "",
    specialty: initialSpecialty || "Semua Spesialis",
    day: "",
  });

  // --- FILTER AKTIF (Render) ---
  const [activeFilter, setActiveFilter] = useState({
    name: initialSearch || "",
    specialty: initialSpecialty || "Semua Spesialis",
    day: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  // Fungsi Lompat ke Atas Section
  const jumpToTop = () => {
    if (sectionRef.current) {
      const yOffset = -150;
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "auto" });
    }
  };

  // 1. Efek saat pertama kali masuk (Landing dari section lain)
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        // Selalu pastikan posisi di atas saat komponen di-mount (terutama jika ada anchor link)
        setTimeout(jumpToTop, 50);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 2. Logika Otomatis Reset ketika Nama Dihapus (Sesuai Permintaan)
  useEffect(() => {
    if (tempFilter.name === "" && activeFilter.name !== "") {
      setIsPaging(true);
      setActiveFilter((prev) => ({ ...prev, name: "" }));
      setCurrentPage(1);
      setTimeout(() => setIsPaging(false), 500);
    }
  }, [tempFilter.name, activeFilter.name]);

  // --- PROSES FILTER DATA ---
  const filteredDoctors = doctors.filter((doc) => {
    const matchSpecialty =
      activeFilter.specialty === "Semua Spesialis" ||
      doc.specialty === activeFilter.specialty;
    const matchName =
      activeFilter.name === "" ||
      doc.name.toLowerCase().includes(activeFilter.name.toLowerCase());
    return matchSpecialty && matchName;
  });

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  // --- ACTION: KLIK TOMBOL CARI ---
  const handleApplyFilter = () => {
    setIsPaging(true);
    jumpToTop();
    setActiveFilter(tempFilter);
    setCurrentPage(1);
    setTimeout(() => setIsPaging(false), 500);
  };

  // --- ACTION: GANTI HALAMAN ---
  const handlePageChange = (newPage: number) => {
    setIsPaging(true);
    jumpToTop();
    setCurrentPage(newPage);
    setTimeout(() => setIsPaging(false), 400);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white min-h-screen font-sans text-slate-800"
      id="section-dokter"
    >
      {/* --- STICKY HEADER --- */}
      <div className="sticky top-0 z-40 bg-white border-gray-200 shadow-sm -mb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h1 className="text-4xl font-bold text-[#005075] tracking-tight mb-1">
            Dokter Kami
          </h1>
          <span className="text-gray-600">Temukan Dokter Spesialis Kami</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* --- SIDEBAR FILTER --- */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-40">
            <div className="border border-gray-200 p-8 bg-white shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-10 text-[#005075] border-b border-gray-100 pb-4">
                <FilterIcon size={18} />
                <span className="uppercase text-[17px] font-semibold">
                  Filter Pencarian
                </span>
              </div>

              {/* Input Nama */}
              <div className="mb-8">
                <label className="text-[15px] font-bold text-[#005075] mb-1">
                  Nama Dokter
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-0 bottom-2.5 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Nama Dokter"
                    value={tempFilter.name}
                    onChange={(e) =>
                      setTempFilter({ ...tempFilter, name: e.target.value })
                    }
                    className="w-full border-b border-gray-200 py-2 pl-7 outline-none focus:border-[#0084BF] text-sm bg-transparent"
                  />
                </div>
              </div>

              {/* Pilih Spesialis */}
              <div className="mb-8 group">
                <label className="text-[15px] font-bold text-[#005075] mb-1">
                  Spesialis
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-0 bottom-2.5 text-gray-400"
                    size={16}
                  />
                  <select
                    value={tempFilter.specialty}
                    onChange={(e) =>
                      setTempFilter({
                        ...tempFilter,
                        specialty: e.target.value,
                      })
                    }
                    className="w-full border-b border-gray-200 bg-transparent py-2 pl-7 outline-none cursor-pointer text-sm"
                  >
                    {SPECIALTY_CATEGORIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pilih Hari */}
              <div className="mb-12 group">
                <label className="text-[15px] font-bold text-[#005075] mb-1">
                  Pilih Hari
                </label>
                <div className="relative">
                  <CalendarDays
                    className="absolute left-0 bottom-2.5 text-gray-400"
                    size={16}
                  />
                  <select
                    value={tempFilter.day}
                    onChange={(e) =>
                      setTempFilter({ ...tempFilter, day: e.target.value })
                    }
                    className="w-full border-b border-gray-200 bg-transparent py-2 pl-7 outline-none cursor-pointer text-sm"
                  >
                    <option value="">Pilih Hari</option>
                    {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <button
                onClick={handleApplyFilter}
                className="w-full bg-gradient-to-r from-[#0084BF] to-[#005075] text-white py-4 font-bold rounded-full cursor-pointer shadow-md hover:brightness-110 transition-all active:scale-[0.98]"
              >
                Cari Dokter
              </button>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="w-full lg:w-2/3 xl:w-3/4">
            {loading || isPaging ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <DoctorSkeleton key={i} />
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-10">
                  <AnimatePresence mode="popLayout">
                    {paginatedDoctors.map((doctor) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-300 pb-10 last:border-0 last:pb-0"
                      >
                        <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-50">
                          <Image
                            src={
                              doctor.image_url ||
                              "https://images.unsplash.com/photo-1612349317150-e539c59dc62a?w=500&h=500&fit=crop"
                            }
                            alt={doctor.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left pt-2">
                          <h3 className="text-2xl font-bold text-[#005075] mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-gray-600 font-semibold text-xs mb-4">
                            {doctor.specialty}
                          </p>
                          {doctor.bio && (
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                              {doctor.bio}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() =>
                                (globalThis.location.href = `/dokter/${doctor.id}`)
                              }
                              className="px-8 py-3 bg-white border border-[#0084BF] text-[#0084BF] text-[12px] font-bold rounded-full cursor-pointer hover:bg-[#0084BF] hover:text-white transition-all"
                            >
                              Lihat Profil
                            </button>
                            <button
                              onClick={() =>
                                (globalThis.location.href = `/dokter/${doctor.id}?action=booking`)
                              }
                              className="px-8 py-3 bg-gradient-to-r from-[#0084BF] to-[#005075] text-white text-[12px] font-bold rounded-full cursor-pointer shadow-md"
                            >
                              Buat Janji Temu
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* --- PAGINATION --- */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-100">
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      ← Sebelumnya
                    </button>
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                            currentPage === i + 1
                              ? "bg-[#0084BF] text-white shadow-md"
                              : "text-[#003d79] border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-gray-50/30">
                <Search size={40} className="text-gray-200 mb-4" />
                <h3 className="text-gray-500 text-sm">
                  Tidak ada dokter yang ditemukan
                </h3>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
