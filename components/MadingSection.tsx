"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fetchMadingContent } from "@/lib/api";
import { MadingContent } from "@/lib/types";

const MadingSection = () => {
  const [edukasiData, setEdukasiData] = useState<MadingContent[]>([]);
  const [eventData, setEventData] = useState<MadingContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await fetchMadingContent();
        const edukasi = content.filter((c) => c.type === "edukasi");
        const events = content.filter((c) => c.type === "event");
        setEdukasiData(edukasi);
        setEventData(events);
      } catch (error) {
        console.error("Error loading mading content:", error);
        setEdukasiData([
          {
            id: "1",
            type: "edukasi",
            title: "Trik yang bisa dilakukan agar anak semangat berpuasa",
            description:
              "Sudah menjelang minggu-minggu terakhir puasa di bulan Ramadhan...",
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
            order: 1,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            type: "event",
            title: "Kickboxing Class",
            description:
              "Tingkatkan kebugaran jantung dengan sesi cardio intensif bersama pelatih.",
            image_url:
              "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="w-full bg-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#005075"
            d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,122.7C1120,107,1280,117,1360,122.7L1440,128L1440,800L1360,800C1280,800,1120,800,960,800C800,800,640,800,480,800C320,800,160,800,80,800L0,800Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex-1 h-[1px] bg-slate-100" />
          <h1 className="text-2xl md:text-[30px] font-bold text-[#005075] text-center whitespace-nowrap tracking-normal uppercase">
            Mading Medika Lestari
          </h1>
          <div className="flex-1 h-[1px] bg-slate-100" />
        </motion.div>

        {/* Edukasi Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-10 bg-[#005075]"></div>
            <h2 className="text-3xl font-bold text-[#005075] italic tracking-normal">
              Edukasi
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-8 scrollbar-hide snap-x snap-mandatory"
          >
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[75%] md:min-w-0 h-72 bg-slate-50 animate-pulse rounded-xl"
                  />
                ))
              : edukasiData.map((item) => (
                  <motion.div
                    key={item.id}
                    className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-white p-5 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-slate-100"
                  >
                    <div className="relative overflow-hidden mb-5 aspect-4/3 bg-slate-100 rounded-xl">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-0 left-0 bg-[#005075] text-white text-[10px] font-bold px-3 py-1 rounded-br-xl">
                        Kabar medis
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold mb-3">
                      <CalendarDays size={12} className="text-[#0084BF]" />{" "}
                      {item.date || "-"}
                    </div>

                    <h3 className="text-[#005075] font-bold text-sm md:text-base leading-tight mb-4 min-h-12 group-hover:text-[#0084BF] transition-colors line-clamp-2 tracking-normal">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed mb-6 line-clamp-3">
                      {item.description || "-"}
                    </p>

                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center group-hover:border-[#0084BF]/20">
                      <span className="text-[10px] font-bold text-black ">
                        Read more
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-black transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>

        {/* Event Section */}
        <div>
          <div className="flex items-center gap-4 mb-12 justify-end text-right">
            <h2 className="text-3xl font-bold text-[#005075] italic tracking-normal">
              Event
            </h2>
            <div className="w-1.5 h-10 bg-[#0084BF]"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-8 scrollbar-hide snap-x snap-mandatory"
          >
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[70%] md:min-w-0 h-96 bg-slate-50 animate-pulse rounded-xl"
                  />
                ))
              : eventData.map((event) => (
                  <motion.div
                    key={event.id}
                    className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center relative bg-slate-950 overflow-hidden group aspect-4/5 "
                  >
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002d42] via-[#002d42]/60 to-transparent opacity-90" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-white/90 text-[10px] md:text-xs leading-relaxed mb-2 font-medium line-clamp-2 tracking-normal">
                        {event.description ||
                          "Informasi detail agenda RS Medika Lestari"}
                      </p>
                      <h4 className="text-white text-base md:text-lg font-bold leading-tight tracking-normal">
                        {event.title}
                      </h4>
                      <div className="w-8 h-1 bg-white/20 mt-4 group-hover:w-full group-hover:bg-[#0084BF] transition-all duration-500 rounded-full" />
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default MadingSection;
