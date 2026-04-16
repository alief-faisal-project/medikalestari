"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, ArrowRight, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fetchMadingContent } from "@/lib/api";
import { MadingContent } from "@/lib/types";

const MadingSection = () => {
  const [edukasiData, setEdukasiData] = useState<MadingContent[]>([]);
  const [eventData, setEventData] = useState<MadingContent[]>([]);
  const [loading, setLoading] = useState(true);

  const getEventDateDisplay = (event: MadingContent): string => {
    if (!event.start_date) return "Segera Hadir";
    if (event.end_date && event.end_date !== event.start_date) {
      return `${event.start_date} - ${event.end_date}`;
    }
    return event.start_date;
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await fetchMadingContent();
        setEdukasiData(content.filter((c) => c.type === "edukasi"));
        setEventData(content.filter((c) => c.type === "event"));
      } catch (error) {
        console.error("Error loading mading content:", error);
        setEdukasiData([
          {
            id: "1",
            type: "edukasi",
            title: "Trik yang bisa dilakukan agar anak semangat berpuasa",
            description:
              "Menjelang minggu terakhir Ramadhan, menjaga motivasi anak adalah kunci keberhasilan ibadah keluarga...",
            image_url:
              "https://images.unsplash.com/photo-1536640712247-c45474d41d44?q=80&w=400&auto=format&fit=crop",
            date: "14 April 2026",
            order: 1,
            created_at: new Date().toISOString(),
          },
        ]);
        setEventData([
          {
            id: "1",
            type: "event",
            title: "Skrining TBC & Rontgen Thorax",
            description:
              "Program deteksi dini kesehatan paru gratis bagi masyarakat umum.",
            image_url:
              "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400",
            date: "20 Mei 2026",
            order: 1,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            type: "event",
            title: "Kickboxing Class",
            description:
              "Tingkatkan kebugaran jantung dengan sesi cardio intensif.",
            image_url:
              "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400",
            date: "25 Mei 2026",
            order: 2,
            created_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-[1110px] mx-auto">
        {/* Header - Minimalist */}
        <header className="mb-16 border-b border-gray-100 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#005075] mb-3">
            Mading Medika Lestari
          </h1>
          <p className="text-slate-500 text-lg">
            Wawasan kesehatan dan agenda kegiatan terbaru.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Section Edukasi */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-[#005075]">Edukasi</h2>
              <button className="text-sm font-semibold text-[#005075] hover:opacity-80 transition-opacity flex items-center gap-1">
                Semua Artikel <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
              {loading
                ? [...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-sm" />
                      <div className="h-6 bg-gray-100 w-3/4" />
                    </div>
                  ))
                : edukasiData.map((item) => (
                    <article key={item.id} className="group cursor-pointer">
                      {/* Container Image dengan Deskripsi Statis di Dalamnya */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100 mb-6">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay Gradient & Teks Deskripsi (Selalu Tampil) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                          <p className="text-white text-xs md:text-sm leading-relaxed line-clamp-3 font-medium opacity-90">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1">
                            <CalendarDays
                              size={14}
                              className="text-[#015A85]"
                            />
                            {item.date}
                          </span>
                          <span>•</span>
                          <span className="text-[#015A85]">Tips Medis</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#015A85] transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <div className="pt-2 flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-[#015A85] transition-colors">
                          BACA SELENGKAPNYA
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </article>
                  ))}
            </div>
          </div>

          {/* Section Event */}
          <div className="lg:col-span-4 lg:border-l lg:border-gray-50 lg:pl-10 ">
            <h2 className="text-2xl font-bold text-[#005075] mb-10">
              Jadwal Event
            </h2>

            <div className="space-y-10">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-50 animate-pulse" />
                  ))
                : eventData.map((event) => (
                    <div
                      key={event.id}
                      className="group flex gap-5 items-start cursor-pointer"
                    >
                      {/* Thumbnail Event */}
                      <div className="w-20 h-20 shrink-0 bg-gray-100 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {/* Badge Jadwal/Tanggal Event */}
                        <div className="flex items-center gap-1.5 text-[#015A85] font-bold text-[11px] uppercase">
                          <Clock size={12} />
                          {getEventDateDisplay(event)}
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#015A85] transition-colors line-clamp-2">
                          {event.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="mt-2 w-6 group-hover:w-full h-[2px] bg-[#015A85] transition-all duration-500" />
                      </div>
                    </div>
                  ))}
            </div>

            {/* Disclaimer minimalis */}
            <div className="mt-16 p-6 bg-slate-50 rounded-lg">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                * Pastikan Anda melakukan registrasi tepat waktu. Hubungi kami
                untuk informasi pendaftaran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadingSection;
