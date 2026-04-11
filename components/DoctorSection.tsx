"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Stethoscope, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDoctors } from "@/lib/api";
import { Doctor } from "@/lib/types";
import DoctorSkeleton from "./DoctorSkeleton";

// Hardcoded specialty categories
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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    initialSpecialty || "Semua Spesialis",
  );
  const [searchName, setSearchName] = useState(initialSearch || "");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFromSearchBar, setIsFromSearchBar] = useState(
    !!initialSearch || !!initialSpecialty,
  );
  const [currentPage, setCurrentPage] = useState(1);

  // --- Memuat Data Dokter ---
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        // Selalu tampilkan dokter (baik ada param atau tidak)
        setHasSearched(true);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [initialSearch, initialSpecialty]);

  // Update selectedSpecialty ketika initialSpecialty berubah (dari searchbar)
  useEffect(() => {
    if (initialSpecialty) {
      setSelectedSpecialty(initialSpecialty);
      setIsFromSearchBar(true);
    }
  }, [initialSpecialty]);

  // Use hardcoded specialty categories
  const specialties = SPECIALTY_CATEGORIES;

  // --- Logika Filter ---
  const filteredDoctors = doctors.filter((doc) => {
    const matchSpecialty =
      selectedSpecialty === "Semua Spesialis" ||
      doc.specialty === selectedSpecialty;
    const matchName =
      searchName === "" ||
      doc.name.toLowerCase().includes(searchName.toLowerCase());
    return matchSpecialty && matchName;
  });

  // --- Logika Pagination ---
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialty, searchName, selectedDay]);

  return (
    <section
      className="w-full bg-white min-h-screen font-sans text-slate-800"
      id="section-dokter"
    >
      {/* --- STICKY HEADER --- */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h1 className="text-4xl font-bold text-[#003d79] tracking-tight mb-1">
            Dokter Kami
          </h1>
          <span className="text-gray-600">Temukan Dokter Spesialis Kami</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* --- SISI KIRI: Sticky Filter Panel (Sharp Design) --- */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24">
            <div className="border border-gray-200 p-8 bg-white shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-10 text-[#003d79] border-b border-gray-100 pb-4">
                <Search size={18} className="text-[#0084BF]" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold">
                  Filter Pencarian
                </span>
              </div>

              {/* Input Nama Dokter */}
              <div className="mb-8">
                <label
                  htmlFor="doctorName"
                  className="text-[10px] font-bold text-[#003d79] uppercase mb-1 block tracking-widest"
                >
                  Nama Dokter
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-0 bottom-2.5 text-gray-400 group-focus-within:text-[#0084BF] transition-colors"
                    size={16}
                  />
                  <input
                    id="doctorName"
                    type="text"
                    placeholder="Nama Dokter"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 pl-7 outline-none focus:border-[#0084BF] transition-all placeholder:text-gray-300 text-sm bg-transparent"
                  />
                </div>
              </div>

              {/* Select Spesialisasi */}
              <div className="mb-8 group">
                <label
                  htmlFor="specialty"
                  className="text-[10px] font-bold text-[#003d79] uppercase mb-1 block tracking-widest"
                >
                  Spesialis
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-0 bottom-2.5 text-gray-400 group-focus-within:text-[#0084BF] transition-colors"
                    size={16}
                  />
                  <select
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full border-b border-gray-200 bg-transparent py-2 pl-7 outline-none focus:border-[#0084BF] appearance-none cursor-pointer text-sm"
                  >
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Select Hari */}
              <div className="mb-12 group">
                <label
                  htmlFor="day"
                  className="text-[10px] font-bold text-[#003d79] uppercase mb-1 block tracking-widest"
                >
                  Pilih Hari
                </label>
                <div className="relative">
                  <CalendarDays
                    className="absolute left-0 bottom-2.5 text-gray-400 group-focus-within:text-[#0084BF] transition-colors"
                    size={16}
                  />
                  <select
                    id="day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full border-b border-gray-200 bg-transparent py-2 pl-7 outline-none focus:border-[#0084BF] appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Pilih Hari</option>
                    {[
                      "Senin",
                      "Selasa",
                      "Rabu",
                      "Kamis",
                      "Jumat",
                      "Sabtu",
                      "Minggu",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasSearched(true);
                  setIsFromSearchBar(true);
                }}
                className="w-full bg-[#0084BF] text-white py-4 font-bold hover:bg-[#0073a5] transition-all duration-300 uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 group"
              >
                Cari Dokter
              </button>
            </div>
          </aside>

          {/* --- SISI KANAN: List Dokter --- */}
          <main className="w-full lg:w-2/3 xl:w-3/4">
            {loading && (
              <div className="space-y-8">
                <div className="text-xs text-gray-400 tracking-widest uppercase border-b border-gray-100 pb-4">
                  Memuat data dokter...
                </div>
                <div className="grid grid-cols-1 gap-10">
                  <DoctorSkeleton />
                  <DoctorSkeleton />
                  <DoctorSkeleton />
                </div>
              </div>
            )}

            {!loading && filteredDoctors.length > 0 && (
              <div className="space-y-8">
                {isFromSearchBar && (
                  <div className="text-xs text-gray-400 tracking-widest uppercase border-b border-gray-100 pb-4">
                    Menampilkan{" "}
                    <span className="text-[#0084BF] font-bold">
                      {paginatedDoctors.length}
                    </span>{" "}
                    dari{" "}
                    <span className="text-[#0084BF] font-bold">
                      {filteredDoctors.length}
                    </span>{" "}
                    Dokter (Halaman {currentPage} dari {totalPages})
                  </div>
                )}

                <div className="grid grid-cols-1 gap-10">
                  <AnimatePresence mode="popLayout">
                    {paginatedDoctors.map((doctor) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col md:flex-row items-center md:items-start gap-8"
                      >
                        {/* Foto Dokter (Bulat) */}
                        <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
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

                        {/* Konten Dokter */}
                        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left pt-2">
                          <h3 className="text-2xl font-bold text-[#003d79] mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-[#0084BF] font-bold text-xs uppercase tracking-widest mb-4">
                            {doctor.specialty}
                          </p>

                          {doctor.bio && (
                            <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                              {doctor.bio}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mb-6">
                            <button className="text-[11px] font-bold text-[#0084BF] uppercase tracking-tighter border-b border-[#0084BF]/30 hover:border-[#0084BF] transition-all flex items-center gap-1 ">
                              <CalendarDays size={12} />
                              Lihat Jadwal
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <button
                              onClick={() => {
                                const url = `/dokter/${doctor.id}`;
                                globalThis.location.href = url;
                              }}
                              className="px-8 py-3 bg-white border border-gray-200 text-[#003d79] text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all rounded-full"
                            >
                              Lihat Profil
                            </button>
                            <button
                              onClick={() => {
                                const url = `/dokter/${doctor.id}?action=booking`;
                                globalThis.location.href = url;
                              }}
                              className="px-8 py-3 bg-[#003d79] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#002b55] transition-all rounded-full"
                            >
                              Buat Janji
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
                    {/* Previous Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      ← Sebelumnya
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                              currentPage === page
                                ? "bg-[#0084BF] text-white"
                                : "text-[#003d79] border border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1),
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                )}
              </div>
            )}

            {!loading && hasSearched && filteredDoctors.length === 0 && (
              // Jangan tampilkan apapun jika tidak ada dokter sesuai filter
              <div />
            )}

            {!loading && !hasSearched && filteredDoctors.length === 0 && (
              <div className="flex flex-col items-center justify-center h-96 border border-gray-100 bg-gray-50/30">
                <Search size={40} className="text-gray-200 mb-4" />
                <h3 className="text-gray-500 text-sm font-medium tracking-wide">
                  Tidak ada dokter sesuai dengan kriteria pencarian
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
