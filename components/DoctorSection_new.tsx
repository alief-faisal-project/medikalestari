"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDoctors } from "@/lib/api";
import { Doctor } from "@/lib/types";

const DoctorSection = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>("Semua Spesialis");
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const specialties = [
    "Semua Spesialis",
    ...Array.from(new Set(doctors.map((doc) => doc.specialty))),
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchSpecialty =
      selectedSpecialty === "Semua Spesialis" ||
      doc.specialty === selectedSpecialty;
    const matchName = doc.name.toLowerCase().includes(searchName.toLowerCase());
    return matchSpecialty && matchName;
  });

  return (
    <section
      className="w-full py-12 bg-white min-h-screen font-sans text-slate-800"
      id="section-dokter"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-10 text-left">
          <nav className="text-sm text-gray-400 mb-2">
            Beranda &gt; Dokter Kami
          </nav>
          <h1 className="text-4xl font-bold text-[#003d79]">Dokter Kami</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Panel */}
          <aside className="w-full lg:w-1/4">
            <div className="border border-gray-100 rounded-lg p-6 sticky top-10 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-8 text-[#003d79] font-bold">
                <Search size={20} className="text-cyan-500" />
                <span className="uppercase tracking-widest text-sm">
                  Filter Pencarian
                </span>
              </div>

              {/* Input Nama */}
              <div className="mb-8">
                <label
                  htmlFor="doctorName"
                  className="text-[10px] font-bold text-[#003d79] uppercase mb-1 block"
                >
                  Nama Dokter
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-0 bottom-3 text-cyan-500"
                    size={16}
                  />
                  <input
                    id="doctorName"
                    type="text"
                    placeholder="Nama Dokter"
                    value={searchName}
                    className="w-full border-b border-gray-200 py-2 pl-6 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-300 text-sm"
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
              </div>

              {/* Select Spesialis */}
              <div className="mb-8">
                <label
                  htmlFor="specialty"
                  className="text-[10px] font-bold text-[#003d79] uppercase mb-1 block"
                >
                  Spesialis
                </label>
                <select
                  id="specialty"
                  className="w-full border-b border-gray-200 py-2 bg-transparent outline-none appearance-none cursor-pointer text-sm"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchName("");
                  setSelectedSpecialty("Semua Spesialis");
                }}
                className="w-full bg-cyan-500 text-white py-3 rounded-full font-bold hover:bg-cyan-600 transition-all shadow-md shadow-cyan-100 uppercase text-xs tracking-widest"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* List Dokter */}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-400 mb-8 border-b border-gray-50 pb-4">
                  Menampilkan 1 - {filteredDoctors.length} dari total{" "}
                  <span className="font-bold text-gray-700">
                    {doctors.length}
                  </span>{" "}
                  dokter
                </div>

                <div className="space-y-2">
                  <AnimatePresence>
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <motion.div
                          key={doctor.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col md:flex-row items-center md:items-start gap-8 py-10 border-b border-gray-100 last:border-0 hover:bg-slate-50/50 transition-colors px-4 rounded-xl"
                        >
                          {/* Foto Dokter */}
                          <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0">
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

                          {/* Informasi Dokter */}
                          <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-[#003d79] mb-1">
                              {doctor.name}
                            </h3>
                            <p className="text-cyan-600 font-semibold text-sm mb-3">
                              {doctor.specialty}
                            </p>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {doctor.bio ||
                                "Dokter berpengalaman dengan dedikasi tinggi dalam melayani pasien."}
                            </p>

                            {/* Experience & Contact */}
                            <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-700">
                              <span className="font-medium">
                                ⭐ {doctor.experience_years} Tahun Pengalaman
                              </span>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-4 flex flex-col gap-2 text-sm">
                              {doctor.phone && (
                                <a
                                  href={`tel:${doctor.phone}`}
                                  className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"
                                >
                                  <Phone size={16} />
                                  {doctor.phone}
                                </a>
                              )}
                              {doctor.email && (
                                <a
                                  href={`mailto:${doctor.email}`}
                                  className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"
                                >
                                  <Mail size={16} />
                                  {doctor.email}
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Button Konsultasi */}
                          <div className="flex flex-col gap-2 shrink-0">
                            <button className="bg-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-600 transition-all text-sm whitespace-nowrap">
                              Buat Janji
                            </button>
                            <button className="border border-cyan-500 text-cyan-500 px-6 py-2 rounded-full font-semibold hover:bg-cyan-50 transition-all text-sm whitespace-nowrap">
                              Lihat Jadwal
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                          Tidak ada dokter yang ditemukan dengan kriteria
                          pencarian Anda.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
