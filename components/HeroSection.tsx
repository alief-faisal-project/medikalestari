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
      <section className="relative w-full bg-white overflow-hidden">
        {/* Empty state untuk desktop */}
        <div className="hidden md:block relative w-full aspect-[1900/720] bg-gray-200" />

        {/* Empty state untuk mobile */}
        <div className="md:hidden relative w-full aspect-[2208/2760] bg-gray-200" />
        {/* SEARCH BAR tetap ditampilkan */}
        <div className="relative w-full px-4 py-8 md:py-0 md:-mt-14 md:z-50 bg-white md:bg-transparent">
          <div className="max-w-5xl mx-auto">
            <div
              className="
                max-w-5xl mx-auto 
                bg-white 
                md:rounded-full rounded-3xl 
                flex flex-col md:flex-row 
                overflow-hidden 
                border border-gray-300
              "
            >
              {/* NAMA DOKTER */}
              <div className="flex-1 px-5 py-4 border-b md:px-8 md:border-b-0 md:border-r border-gray-100">
                <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
                <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
                <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
                  className="w-full md:w-14 h-12 md:h-14 rounded-full md:rounded-full bg-[#005cb3] flex items-center justify-center gap-2 text-white active:scale-95 transition cursor-pointer"
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
    <section className="relative w-full bg-white overflow-hidden">
      {/* BANNER AREA - Desktop */}
      <div className="hidden md:block relative w-full aspect-[1900/720] bg-black">
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

        {/* PREVIEW INDICATORS (Desktop Only) */}
        <div className="hidden md:flex absolute bottom-15 left-1/2 -translate-x-1/2 z-40 gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500 p-4">
          {desktopSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`relative w-28 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-lg ${
                currentSlide === index
                  ? "border-[#005cb3] scale-110"
                  : "border-white/50"
              }`}
              onClick={() => setPage(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setPage(index);
                }
              }}
            >
              <Image
                src={slide.image_url}
                alt="preview"
                fill
                className="object-cover"
              />

              {/* Tombol Pause/Play */}
              {currentSlide === index && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(!isPlaying);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause size={14} fill="currentColor" />
                    ) : (
                      <Play size={14} className="ml-0.5" fill="currentColor" />
                    )}
                  </button>
                </div>
              )}

              {/* Progress Bar */}
              {currentSlide === index && isPlaying && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-[#005cb3]"
                />
              )}
            </button>
          ))}
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

        {/* MOBILE INDICATORS */}
        <div className="flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-40 gap-2">
          {mobileSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-[#005cb3] w-8" : "bg-white/50 w-2"
              }`}
              onClick={() => setPage(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setPage(index);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full px-4 py-8 md:py-0 md:-mt-14 md:z-50 bg-white md:bg-transparent">
        <div className="max-w-5xl mx-auto">
          <div
            className="
              max-w-5xl mx-auto 
              bg-white 
              md:rounded-full rounded-none
              flex flex-col md:flex-row 
              overflow-hidden 
              border border-gray-300
                ]
            "
          >
            {/* NAMA DOKTER */}
            <div className="flex-1 px-5 py-4 border-b md:px-8 md:border-b-0 md:border-r border-gray-100">
              <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
              <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
              <p className="text-xs text-[#005cb3] font-semibold mb-1">
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
                className="w-full md:w-14 h-12 md:h-14 rounded-full md:rounded-full bg-[#005cb3] flex items-center justify-center gap-2 text-white active:scale-95 transition cursor-pointer"
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
