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
    jumpToTop();
    setTimeout(() => setIsPaging(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white min-h-screen font-sans text-slate-800 relative mb-20"
      id="section-dokter"
    >
      <AnimatePresence>
        {selectedDoctor && (
          <BookingForm
            doctorName={selectedDoctor.name}
            specialty={selectedDoctor.specialty}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 pt-16 pb-12">
        <h1 className="text-4xl font-bold text-black mb-2 ">Dokter Kami</h1>
        <p>Temukan dokter spesialis terbaik untuk kebutuhan kesehatan Anda.</p>
      </div>

      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* SIDEBAR FILTER - SHARP EDGES */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-40 z-30">
            <div className="border border-slate-200 p-8 bg-white rounded-none shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-8 text-[#0084BF] border-b border-slate-50 pb-4">
                <FilterIcon size={18} />
                <span className="text-lg font-bold">Filter Pencarian</span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-[#0084BF] mb-2">
                  Nama Dokter
                </label>
                <div className="relative">
                  <User
                    className="absolute left-0 bottom-3 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Nama Dokter"
                    value={tempFilter.name}
                    onChange={(e) =>
                      setTempFilter({ ...tempFilter, name: e.target.value })
                    }
                    className="w-full border-b border-slate-200 py-2 pl-7 outline-none focus:border-[#0084BF] text-sm bg-transparent rounded-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-[#0084BF] mb-2">
                  Spesialis
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-0 bottom-3 text-slate-400"
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
                    className="w-full border-b border-slate-200 bg-transparent py-2 pl-7 outline-none cursor-pointer text-sm rounded-none appearance-none"
                  >
                    {SPECIALTY_CATEGORIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-bold text-[#0084BF] mb-2">
                  Pilih Hari
                </label>
                <div className="relative">
                  <CalendarDays
                    className="absolute left-0 bottom-3 text-slate-400"
                    size={16}
                  />
                  <select
                    value={tempFilter.day}
                    onChange={(e) =>
                      setTempFilter({ ...tempFilter, day: e.target.value })
                    }
                    className="w-full border-b border-slate-200 bg-transparent py-2 pl-7 outline-none cursor-pointer text-sm rounded-none appearance-none"
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
                className="w-full bg-[#0084BF] text-white py-4 font-bold rounded-full cursor-pointer transition-all hover:bg-[#0084BF]/90 active:scale-[0.98]"
              >
                Cari Dokter Spesialis
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="w-full lg:w-2/3 xl:w-3/4 relative z-20">
            {loading || isPaging ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <DoctorSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="wait">
                  {paginatedDoctors.map((doctor, index) => (
                    <motion.div
                      key={doctor.id || `doc-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="group flex flex-col md:flex-row items-center md:items-start gap-8 p-6 md:p-8 bg-white border border-slate-100 shadow-sm h-fit rounded-none transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-slate-100"
                    >
                      {/* Foto tetap bulat sesuai permintaan */}
                      <div className="relative w-40 h-40 md:w-44 md:h-44 shrink-0 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-blue-50 transition-colors shadow-sm">
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

                      <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                          <p className="text-gray-500 font-bold text-xs mb-1 uppercase tracking-wide">
                            {doctor.specialty}
                          </p>
                          <h3 className="text-2xl font-bold text-slate-800">
                            {doctor.name}
                          </h3>
                        </div>

                        {doctor.bio && (
                          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 max-w-xl">
                            {doctor.bio}
                          </p>
                        )}

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                          <button
                            onClick={() => setSelectedDoctor(doctor)}
                            className="px-8 py-3 bg-[#0084BF] text-white text-[12px] font-bold rounded-full transition-all hover:bg-[#0084BF]/90 active:scale-95 shadow-md shadow-blue-900/5 cursor-pointer"
                          >
                            Buat Janji Temu
                          </button>
                          <Link
                            href={`/dokter/${doctor.id}`}
                            className="px-8 py-3 bg-white text-slate-600 text-[12px] font-bold rounded-full border border-slate-200 transition-all hover:bg-slate-50 "
                          >
                            Lihat Profil
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* PAGINATION - SHARP EDGES */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-8">
                    {/* Button PREV */}
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-16 h-11 flex items-center justify-center text-slate-600 border border-slate-200 rounded-none hover:bg-slate-50 transition-all font-bold text-xs"
                      >
                        ← PREV
                      </button>
                    )}

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={`page-${i + 1}`}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-11 h-11 flex items-center justify-center rounded-none font-bold text-xs transition-all ${
                            currentPage === i + 1
                              ? "bg-[#0084BF] text-white border border-[#0084BF]"
                              : "text-slate-500 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* Button NEXT */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-16 h-11 flex items-center justify-center text-slate-600 border border-slate-200 rounded-none hover:bg-slate-50 transition-all font-bold text-xs"
                      >
                        NEXT →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-slate-50/50 rounded-none border border-dashed border-slate-200">
                <Search size={40} className="text-slate-300 mb-4" />
                <h3 className="text-slate-500 font-bold">
                  Dokter tidak ditemukan
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
