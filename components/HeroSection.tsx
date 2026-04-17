"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { fetchHeroBanners } from "@/lib/api";
import { HeroBanner } from "@/lib/types";
import {
  Search,
  User,
  Stethoscope,
  CalendarDays,
  ChevronLeft,
} from "lucide-react";

const HeroSection = () => {
  const [slides, setSlides] = useState<HeroBanner[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // SEARCH STATE
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

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  // AUTOPLAY: 4 Detik
  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (isPlaying && slides.length > 0) {
      slideInterval = setInterval(() => {
        paginate(1);
      }, 4000);
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

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="relative w-full aspect-[1900/720] min-h-[350px] md:min-h-[450px] group">
        <AnimatePresence initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Animasi Zoom (Ken Burns) */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.15 }}
              transition={{
                duration: 4,
                ease: "linear",
              }}
              className="relative w-full h-full"
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
          </motion.div>
        </AnimatePresence>

        {/* TOMBOL PLAY/PAUSE */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 
             flex items-center justify-center w-10 h-10 rounded-full 
             bg-white/20 backdrop-blur-sm text-white 
             opacity-0 group-hover:opacity-100 transition-all duration-300
             hover:scale-110 border border-white/20"
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} className="ml-1" fill="currentColor" />
          )}
        </button>
      </div>

      {/* Indikator Mobile  */}
      <div className="md:hidden flex justify-center gap-3 py-4 bg-white border-t border-gray-200">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              const newDirection = index > currentSlide ? 1 : -1;
              setPage([index, newDirection]);
            }}
            className={`w-5 h-2 rounded-full ${
              currentSlide === index
                ? "bg-[#0084BF]"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      {/* SEARCH BAR */}
      <div className="md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:z-40 w-full px-4 py-6 md:py-0 md:bg-transparent bg-white">
        <div
          className="
    max-w-5xl mx-auto 
    bg-white 
    md:rounded-full rounded-2xl 
    flex flex-col md:flex-row 
    overflow-hidden 
    border border-gray-200
    shadow-xl]
  "
        >
          {/* NAMA DOKTER */}
          <div className="flex-1 px-5 py-4 border-b md:px-8 md:border-b-0 md:border-r border-gray-200">
            <p className="text-xs text-[#0084BF] font-semibold mb-1">
              Nama Dokter
            </p>
            <div className="flex items-center gap-2">
              <User size={18} className="text-gray-400" />
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
          <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
            <p className="text-xs text-[#0084BF] font-semibold mb-1">
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
          <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
            <p className="text-xs text-[#0084BF] font-semibold mb-1">
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

          {/* BUTTON */}
          <div className="flex items-center justify-center p-3">
            <button
              onClick={() => {
                const params = new URLSearchParams();
                if (search) params.append("search", search);
                if (specialty) params.append("specialty", specialty);
                if (day) params.append("day", day);

                window.location.href = `/dokter?${params.toString()}`;
              }}
              className="
    w-full md:w-14 
    h-12 md:h-14 
    rounded-full md:rounded-full 
    bg-[#0084BF] 
    flex items-center justify-center 
    gap-2 
    text-white 
    hover:scale-95 transition cursor-pointer
    px-4 md:px-0 
  "
            >
              {/* Ikon Search*/}
              <Search className="w-5 h-5 md:w-10 md:h-8 " />

              {/* Teks Mobile */}
              <span className="font-semibold md:hidden">Cari Dokter</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
