"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
import BookingForm from "./BookingForm";

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

const DAYS = [
  "Semua Hari",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
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
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [tempFilter, setTempFilter] = useState({
    name: initialSearch || "",
    specialty: initialSpecialty || "Semua Spesialis",
    day: "Semua Hari",
  });

  const [activeFilter, setActiveFilter] = useState({
    name: initialSearch || "",
    specialty: initialSpecialty || "Semua Spesialis",
    day: "Semua Hari",
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  // Fungsi scroll instan ke atas section
  const jumpToTop = () => {
    if (sectionRef.current) {
      const yOffset = -150;
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      // Menggunakan behavior: "auto" agar langsung pindah tanpa animasi scroll
      window.scrollTo({ top: y, behavior: "auto" });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();

        if (data) {
          const uniqueData = data.filter(
            (v, i, a) => v.id && a.findIndex((t) => t.id === v.id) === i,
          );
          setDoctors(uniqueData);
        }
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (tempFilter.name === "" && activeFilter.name !== "") {
      setActiveFilter((prev) => ({ ...prev, name: "" }));
      setCurrentPage(1);
    }
  }, [tempFilter.name, activeFilter.name]);

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
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleApplyFilter = () => {
    setIsPaging(true);
    setActiveFilter(tempFilter);
    setCurrentPage(1);
    jumpToTop();
    setTimeout(() => setIsPaging(false), 500);
  };

  const handlePageChange = (newPage: number) => {
    setIsPaging(true);
    setCurrentPage(newPage);
    // Langsung pindah ke atas secara instan
    jumpToTop();
    setTimeout(() => setIsPaging(false), 200);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white min-h-screen font-sans text-slate-800 relative mb-30"
      id="section-dokter"
    >
      {/* MODAL BOOKING */}
      <AnimatePresence>
        {selectedDoctor && (
          <BookingForm
            doctorName={selectedDoctor.name}
            specialty={selectedDoctor.specialty}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-40  ">
        <div className="max-w-[1220px] mx-auto px-4 md:px-8 py-6">
          <h1 className="text-5xl font-bold text-[#005075] tracking-tight mb-1">
            Dokter Kami
          </h1>
          <p className="text-gray-600">Temukan Dokter Spesialis Kami</p>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* SIDEBAR FILTER - TETAP STICKY */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-40 z-30">
            <div className="border border-gray-200 p-8 bg-white shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-10 text-[#005075] border-b border-gray-100 pb-4">
                <FilterIcon size={18} />
                <span className="text-[17px] font-semibold">
                  Filter Pencarian
                </span>
              </div>

              <div className="mb-8">
                <label className="block text-[15px] font-bold text-[#005075] mb-2">
                  Nama Dokter
                </label>
                <div className="relative">
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

              <div className="mb-8">
                <label className="block text-[15px] font-bold text-[#005075] mb-2">
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

              <div className="mb-8">
                <label className="block text-[15px] font-bold text-[#005075] mb-2">
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
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleApplyFilter}
                className="w-full bg-gradient-to-r from-[#0084BF] to-[#005075] text-white py-4 font-bold rounded-full cursor-pointer transition-all hover:shadow-lg active:scale-95"
              >
                Cari Dokter
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="w-full lg:w-2/3 xl:w-3/4 relative z-20">
            {loading || isPaging ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <DoctorSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-10">
                  <AnimatePresence mode="wait">
                    {paginatedDoctors.map((doctor, index) => (
                      <motion.div
                        key={doctor.id || `doc-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-100 pb-10 last:border-0"
                      >
                        {/* Image Container */}
                        <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
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

                        {/* Info Container */}
                        <div className="flex-1 text-center md:text-left pt-2">
                          <h3 className="text-2xl font-bold text-[#005075] mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-[#0084BF] font-semibold text-sm mb-4">
                            {doctor.specialty}
                          </p>
                          {doctor.bio && (
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 max-w-2xl">
                              {doctor.bio}
                            </p>
                          )}

                          <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Link
                              href={`/dokter/${doctor.id}`}
                              className="px-8 py-3 bg-white text-[#0084BF] text-[12px] font-bold rounded-full border border-[#0084BF]/20 transition-all hover:bg-gray-50 shadow-sm inline-block"
                            >
                              Lihat Profil
                            </Link>

                            <button
                              onClick={() => setSelectedDoctor(doctor)}
                              className="px-8 py-3 bg-gradient-to-r from-[#0084BF] to-[#005075] text-white text-[12px] font-bold rounded-full transition-all hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                              Buat Janji Temu
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-gray-100 ">
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        ← Sebelumnya
                      </button>
                    )}

                    <div className="flex items-center gap-3">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={`page-${i + 1}`}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                            currentPage === i + 1
                              ? "bg-[#0084BF] text-white shadow-[#0084BF]/20  z-10"
                              : "text-[#003d79] border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-4 py-2 text-sm font-semibold text-[#003d79] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Selanjutnya →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <Search size={40} className="text-gray-300 mb-4" />
                <h3 className="text-gray-500 font-medium">
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
