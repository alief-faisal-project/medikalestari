"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, image: "/hero1.jpg" },
  { id: 2, image: "/hero2.jpg" },
  { id: 3, image: "/hero3.jpg" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const HeroSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentSlide = Math.abs(page % slides.length);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  useEffect(() => {
    const slideInterval = setInterval(() => {
      paginate(1);
    }, 10000);
    return () => clearInterval(slideInterval);
  }, [paginate]);

  return (
    <section
      className="relative w-full bg-black overflow-hidden group"
      suppressHydrationWarning
    >
      {/* Container dengan Rasio 1900:720 */}
      <div className="relative w-full aspect-[1900/720] min-h-[350px] md:min-h-[450px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide}`}
              fill
              priority
              sizes="100vw"
              // Menggunakan object-contain agar gambar tidak terpotong (terpangkas)
              // Pastikan gambar asli sudah 1900x720 untuk hasil terbaik
              className="object-contain object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigasi Chevron */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/10 text-white opacity-0 group-hover:opacity-100 hover:bg-[#0084BF] transition-all duration-500 backdrop-blur-md border border-white/10"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/10 text-white opacity-0 group-hover:opacity-100 hover:bg-[#0084BF] transition-all duration-500 backdrop-blur-md border border-white/10"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Indikator Bulat Minimalis */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {slides.map((_, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Thumbnail Preview */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -70, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 w-32 h-20 rounded-lg border border-white/20 shadow-2xl overflow-hidden pointer-events-none"
                >
                  <Image
                    src={slides[index].image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Titik Indikator Statis */}
            <button
              onClick={() => {
                const newDirection = index > currentSlide ? 1 : -1;
                setPage([index, newDirection]);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? "bg-white ring-4 ring-white/10"
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
