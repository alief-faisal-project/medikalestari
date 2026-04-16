"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { fetchHeroBanners } from "@/lib/api";
import { HeroBanner } from "@/lib/types";
import { Search, User, Stethoscope, CalendarDays } from "lucide-react";

const HeroSection = () => {
  const [slides, setSlides] = useState<HeroBanner[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ SEARCH STATE
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [day, setDay] = useState("");

  const SPECIALTY_CATEGORIES = [
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

  // LOAD DATA
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const banners = await fetchHeroBanners();
        if (banners.length > 0) {
          setSlides(banners);
        } else {
          setSlides([
            {
              id: "1",
              image_url: "/hero1.jpg",
              order: 1,
              is_active: true,
              created_at: new Date().toISOString(),
            },
            {
              id: "2",
              image_url: "/hero2.jpg",
              order: 2,
              is_active: true,
              created_at: new Date().toISOString(),
            },
            {
              id: "3",
              image_url: "/hero3.jpg",
              order: 3,
              is_active: true,
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading hero banners:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  const currentSlide = Math.abs(page % (slides.length || 1));

  const currentTransitionType =
    slides.length > 0
      ? currentSlide === 0
        ? "slide"
        : currentSlide === 1
          ? "fade-scale"
          : "slide-up"
      : "slide";

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  // AUTOPLAY
  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (isPlaying && slides.length > 0) {
      slideInterval = setInterval(() => {
        paginate(1);
      }, 10000);
    }
    return () => clearInterval(slideInterval);
  }, [paginate, isPlaying, slides.length]);

  if (loading || slides.length === 0) {
    return (
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative w-full aspect-[1900/720] min-h-[350px] md:min-h-[450px] bg-gray-800 animate-pulse" />
      </section>
    );
  }

  // VARIANTS (UTUH)
  const slideVariants = {
    enter: (custom: { direction: number; type: string }) => {
      if (custom.type === "slide")
        return {
          x: custom.direction > 0 ? "100%" : "-100%",
          opacity: 0,
          zIndex: 20,
        };
      if (custom.type === "fade-scale")
        return { opacity: 0, scale: 1.1, zIndex: 20 };
      if (custom.type === "slide-up")
        return { y: "100%", opacity: 0, zIndex: 20 };
      return { opacity: 0, zIndex: 20 };
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 20,
      transition: { duration: 0.8, ease: cubicBezier(0.4, 0, 0.2, 1) },
    },
    exit: {
      zIndex: 10,
      opacity: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full bg-black overflow-hidden group">
      {/* IMAGE */}
      <div className="relative w-full aspect-[1900/720] min-h-[350px] md:min-h-[450px]">
        <AnimatePresence
          initial={false}
          custom={{ direction, type: currentTransitionType }}
        >
          <motion.div
            key={page}
            custom={{ direction, type: currentTransitionType }}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide].image_url}
              alt={`Slide ${currentSlide}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔥 SEARCH BAR (FINAL CLEAN TANPA LABEL KIRI) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 w-full px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-full flex items-center overflow-hidden border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          {/* NAMA DOKTER */}
          <div className="flex-1 px-6 py-4 flex items-center gap-3">
            <User size={18} className="text-[#005075]" />
            <div className="w-full">
              <p className="text-xs text-[#005075] font-semibold">
                Nama Dokter
              </p>
              <input
                type="text"
                placeholder="Cari nama dokter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>
          </div>

          {/* SPESIALIS */}
          <div className="flex-1 px-5 border-l border-gray-200">
            <p className="text-xs text-[#005075] font-semibold mb-1">
              Spesialis
            </p>
            <div className="flex items-center gap-2">
              <Stethoscope size={16} className="text-gray-400" />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full outline-none text-sm bg-transparent cursor-pointer"
              >
                {SPECIALTY_CATEGORIES.map((s) => (
                  <option key={s} value={s === "Semua Spesialis" ? "" : s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* HARI */}
          <div className="flex-1 px-5 border-l border-gray-200">
            <p className="text-xs text-[#005075] font-semibold mb-1">
              Pilih Hari
            </p>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-400" />
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full outline-none text-sm bg-transparent cursor-pointer"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d === "Semua Hari" ? "" : d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BUTTON SEARCH */}
          <button
            onClick={() => {
              const params = new URLSearchParams();
              if (search) params.append("search", search);
              if (specialty) params.append("specialty", specialty);
              if (day) params.append("day", day);

              window.location.href = `/dokter?${params.toString()}`;
            }}
            className="w-14 h-14 m-2 rounded-full bg-[#005075] flex items-center justify-center text-white hover:scale-105 transition"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* INDICATOR + PREVIEW (UTUH) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -70, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 w-32 h-20 rounded-lg overflow-hidden shadow-2xl"
                >
                  <Image
                    src={slides[index].image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                const newDirection = index > currentSlide ? 1 : -1;
                setPage([index, newDirection]);
              }}
              className={`w-5 h-5 rounded-full ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
