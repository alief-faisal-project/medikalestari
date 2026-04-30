"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Search,
  User,
  Stethoscope,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { fetchHeroBanners } from "@/lib/api";
import { HeroBanner } from "@/lib/types";

const HeroSection = () => {
  const [slides, setSlides] = useState<HeroBanner[]>([]);
  const [page, setPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentDeviceType, setCurrentDeviceType] = useState<
    "desktop" | "mobile"
  >("desktop");

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

  useEffect(() => {
    const loadBanners = async () => {
      try {
        // Determine if we're on mobile based on window width
        const isMobileDevice =
          typeof globalThis !== "undefined" &&
          globalThis.window?.innerWidth !== undefined &&
          globalThis.window.innerWidth <= 768;

        // Set device type and fetch appropriate banners
        const deviceType = isMobileDevice ? "mobile" : "desktop";
        setCurrentDeviceType(deviceType);

        console.log(`Loading ${deviceType} banners...`);
        const banners = await fetchHeroBanners(deviceType);

        // Only set slides if banners exist, otherwise keep empty
        if (banners && banners.length > 0) {
          console.log(`Loaded ${banners.length} ${deviceType} banners`);
          setSlides(banners);
        } else {
          console.log(`No ${deviceType} banners found`);
          setSlides([]);
        }
      } catch (error) {
        console.error("Error loading hero banners:", error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    loadBanners();

    // Handle window resize to switch between desktop and mobile banners
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce the resize event
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        loadBanners();
      }, 300);
    };

    globalThis.window?.addEventListener("resize", handleResize);
    return () => {
      globalThis.window?.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Filter slides based on device type - IMPORTANT: Use filtered length for currentSlide calculation
  const desktopSlides = slides.filter(
    (slide) => slide.device_type === "desktop",
  );
  const mobileSlides = slides.filter((slide) => slide.device_type === "mobile");
  const filteredSlides =
    currentDeviceType === "desktop" ? desktopSlides : mobileSlides;
  const currentSlide = Math.abs(page % (filteredSlides.length || 1));

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(page + newDirection);
    },
    [page],
  );

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (isPlaying && filteredSlides.length > 0) {
      slideInterval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [paginate, isPlaying, filteredSlides.length]);

  if (loading || filteredSlides.length === 0) {
    return (
      <section className="relative w-full bg-transparent overflow-hidden">
        {/* Empty state untuk desktop */}
        <div className="hidden md:block relative w-full aspect-[1900/720] bg-gray-200" />

        {/* Empty state untuk mobile */}
        <div className="md:hidden relative w-full aspect-[2208/2760] bg-gray-200" />
        {/* SEARCH BAR  */}
        <div className="relative w-full px-4 py-8 md:py-0 md:-mt-14 md:z-50 bg-transparent">
          <div className="max-w-5xl mx-auto">
            <div
              className="
                max-w-5xl mx-auto 
                bg-white
                md:rounded-full rounded-3xl 
                flex flex-col md:flex-row 
                overflow-hidden 
                
              "
            >
              {/* NAMA DOKTER */}
              <div className="flex-1 px-5 py-4 border-b md:px-8 md:border-b-0 md:border-r border-gray-100">
                <p className="text-xs text-[#007AFF] font-semibold mb-1">
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
              <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100">
                <p className="text-xs text-[#007AFF] font-semibold mb-1">
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
              <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100">
                <p className="text-xs text-[#007AFF] font-semibold mb-1">
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
              <div className="flex items-center justify-center p-3">
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (search) params.append("search", search);
                    if (specialty) params.append("specialty", specialty);
                    if (day) params.append("day", day);
                    globalThis.window?.location.replace(
                      `/dokter?${params.toString()}`,
                    );
                  }}
                  className="w-full md:w-14 h-12 md:h-14 rounded-full md:rounded-full bg-[#007AFF] flex items-center justify-center gap-2 text-white active:scale-95 transition cursor-pointer"
                >
                  <Search className="w-5 h-5 md:w-10 md:h-8" />
                  <span className="font-semibold md:hidden">Cari Dokter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-transparent overflow-hidden">
      {/* BANNER AREA - Desktop */}
      <div className="hidden md:block relative w-full aspect-[1900/780] bg-black">
        {desktopSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image_url}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* CONTROLS - Bottom Left */}
        <div className="absolute bottom-8 left-8 z-40 flex items-center gap-4">
          <div className="flex items-center gap-1">
            {" "}
            <button
              onClick={() => paginate(-1)}
              disabled={desktopSlides.length <= 1}
              className={`p-1 rounded-full transition-all duration-300 ${
                desktopSlides.length <= 1
                  ? "opacity-30 cursor-not-allowed"
                  : "opacity-60 hover:opacity-100 cursor-pointer"
              }`}
            >
              <ChevronLeft size={40} className="text-white" />
            </button>
            {/* Right Chevron */}
            <button
              onClick={() => paginate(1)}
              disabled={desktopSlides.length <= 1}
              className={`p-1 rounded-full transition-all duration-300 ${
                desktopSlides.length <= 1
                  ? "opacity-30 cursor-not-allowed"
                  : "opacity-60 hover:opacity-100 cursor-pointer"
              }`}
            >
              <ChevronRight size={40} className="text-white" />
            </button>
          </div>

          {/* 2. Play/Pause Button */}
          <div className="relative w-12 h-12">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 48 48"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="125.6"
                initial={{ strokeDashoffset: 125.6 }}
                animate={
                  isPlaying && desktopSlides.length > 0
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: 125.6 }
                }
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </svg>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={16} fill="white" className="text-white" />
              ) : (
                <Play size={16} className="text-white ml-0.5" fill="white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* BANNER AREA - Mobile */}
      <div className="md:hidden relative w-full aspect-[2208/2760] bg-black">
        {mobileSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image_url}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* CONTROLS - Horizontal Layout (Left, Center, Right) */}
        <div className="absolute bottom-1/2 translate-y-1/2 left-0 right-0 z-40 flex flex-row items-center justify-between px-4">
          {/* Left Chevron */}
          <button
            onClick={() => paginate(-1)}
            disabled={mobileSlides.length <= 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              mobileSlides.length <= 1
                ? "opacity-0 pointer-events-none" // Hilangkan jika hanya 1 slide
                : "opacity-60 hover:opacity-100 cursor-pointer]"
            }`}
          >
            <ChevronLeft size={60} className="text-white" />
          </button>

          {/* Play/Pause Button (Centered) */}
          <div className="relative w-12 h-12">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 40 40"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeDasharray="113"
                initial={{ strokeDashoffset: 113 }}
                animate={
                  isPlaying && mobileSlides.length > 0
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: 113 }
                }
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              />
            </svg>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={14} fill="white" className="text-white" />
              ) : (
                <Play size={14} className="text-white ml-1" fill="white" />
              )}
            </button>
          </div>

          {/* Right Chevron */}
          <button
            onClick={() => paginate(1)}
            disabled={mobileSlides.length <= 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              mobileSlides.length <= 1
                ? "opacity-0 pointer-events-none"
                : "opacity-60 hover:opacity-100 cursor-pointer"
            }`}
          >
            <ChevronRight size={60} className="text-white" />
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full px-4 py-8 md:absolute md:inset-0 md:px-4 md:py-0 md:flex md:items-end md:justify-center md:z-50 md:pb-6 md:pointer-events-none">
        <div className="max-w-5xl mx-auto w-full md:pointer-events-auto">
          <div
            className="
              max-w-5xl mx-auto 
              bg-white 
              md:rounded-full rounded-none
              flex flex-col md:flex-row 
              overflow-hidden 
              border border-gray-300
            "
          >
            {/* NAMA DOKTER */}
            <div className="flex-1 px-5 py-4 border-b md:px-8 md:border-b-0 md:border-r border-gray-100">
              <p className="text-xs text-[#007AFF] font-semibold mb-1">
                Nama Dokter
              </p>
              <div className="flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Masukan Nama Dokter"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* SPESIALIS */}
            <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <p className="text-xs text-[#007AFF] font-semibold mb-1">
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
            <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <p className="text-xs text-[#007AFF] font-semibold mb-1">
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
            <div className="flex items-center justify-center p-3">
              <button
                onClick={() => {
                  const params = new URLSearchParams();
                  if (search) params.append("search", search);
                  if (specialty) params.append("specialty", specialty);
                  if (day) params.append("day", day);
                  if (globalThis.window?.location) {
                    globalThis.window.location.href = `/dokter?${params.toString()}`;
                  }
                }}
                className="w-full md:w-14 h-12 md:h-14 rounded-full md:rounded-full bg-[#007AFF] flex items-center justify-center gap-2 text-white active:scale-95 transition cursor-pointer"
              >
                <Search className="w-5 h-5 md:w-10 md:h-8" />
                <span className="font-semibold md:hidden">Cari Dokter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
