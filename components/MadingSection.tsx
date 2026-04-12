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
        // Fallback to hardcoded data
        setEdukasiData([
          {
            id: "1",
            type: "edukasi",
            title: "Trik Yang Bisa Dilakukan Agar Anak Semangat Berpuasa",
            description:
              "Sudah menjelang minggu-minggu terakhir puasa di bulan Ramadhan, bagaimana puasanya Moms and Dads?...",
            image_url:
              "https://images.unsplash.com/photo-1536640712247-c45474d41d44?q=80&w=400&auto=format&fit=crop",
            date: "April 14, 2026",
            order: 1,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            type: "edukasi",
            title: "Tips Aman Puasa di Bulan Ramadhan Bagi Penderita Maag",
            description: "Sakit maag adalah rasa tidak nyaman di perut...",
            image_url:
              "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
            date: "April 13, 2026",
            order: 2,
            created_at: new Date().toISOString(),
          },
        ]);
        setEventData([
          {
            id: "1",
            type: "event",
            title: "SKRINING TBC & RONTGEN THORAX",
            description: "",
            image_url:
              "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400",
            order: 1,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            type: "event",
            title: "KICKBOXING CLASS",
            description: "",
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
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
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
        {/* --- MAIN HEADER (Divider Style, No Underline) --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex-1 h-[1px] bg-gray-200" />
          <h1 className="text-2xl md:text-4xl font-black text-[#005075] uppercase tracking-[0.2em] text-center whitespace-nowrap">
            Mading Medika Lestari
          </h1>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </motion.div>

        {/* --- SUB SECTION: EDUKASI --- */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-10 bg-[#005075]"></div>
            <h2 className="text-3xl font-black text-[#005075] uppercase tracking-tighter italic">
              Edukasi
            </h2>
          </div>

          {/* Mobile: 2 Cards per row, Horizontal Scroll | Desktop: Grid 4 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          >
            {loading ? (
              <>
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-72" />
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-72" />
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-72" />
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-72" />
              </>
            ) : edukasiData.length > 0 ? (
              edukasiData.slice(0, 4).map((item) => (
                <motion.div
                  key={item.id}
                  className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-white border border-gray-100 p-5 group cursor-pointer hover:border-[#0084BF] transition-all duration-300 shadow-sm"
                >
                  <div className="relative overflow-hidden mb-5 aspect-4/3 bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-[#005075] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      Medical News
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                    <CalendarDays size={12} className="text-[#0084BF]" />
                    {item.date || "-"}
                  </div>

                  <h3 className="text-[#005075] font-black text-sm md:text-base leading-tight mb-4 min-h-12 group-hover:text-[#0084BF] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed mb-6 line-clamp-3">
                    {item.description || "-"}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center group-hover:border-[#0084BF]/20">
                    <span className="text-[10px] font-black uppercase text-[#005075] tracking-widest">
                      Read More
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#0084BF] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[75%] sm:min-w-[45%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* --- SUB SECTION: EVENT --- */}
        <div>
          <div className="flex items-center gap-4 mb-12 justify-end text-right">
            <h2 className="text-3xl font-black text-[#005075] uppercase tracking-tighter italic">
              Event
            </h2>
            <div className="w-1.5 h-10 bg-[#0084BF]"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          >
            {loading ? (
              <>
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-96" />
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-96" />
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-96" />
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-200 animate-pulse rounded-lg h-96" />
              </>
            ) : eventData.length > 0 ? (
              eventData.slice(0, 4).map((event) => (
                <motion.div
                  key={event.id}
                  className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center relative bg-gray-900 overflow-hidden group aspect-4/5 border border-gray-100"
                >
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#005075] via-transparent to-transparent opacity-90"></div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="w-10 h-1 bg-[#0084BF] mb-3 group-hover:w-full transition-all duration-500"></div>
                    <h4 className="text-xs md:text-sm font-black text-white leading-tight uppercase tracking-tight">
                      {event.title}
                    </h4>
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
                <div className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-center bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Kosong</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Tailwind Utility to hide scrollbar */}
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
