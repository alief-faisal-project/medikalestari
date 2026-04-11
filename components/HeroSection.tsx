"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const slides = [
  { id: 1, image: "/hero1.jpg", transitionType: "slide" },
  { id: 2, image: "/hero2.jpg", transitionType: "fade-scale" },
  { id: 3, image: "/hero3.jpg", transitionType: "slide-up" },
];

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
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    zIndex: 10,
    opacity: 0,
    transition: { duration: 0.8 },
  },
};

const HeroSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentSlide = Math.abs(page % slides.length);
  const currentTransitionType = slides[currentSlide].transitionType;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (isPlaying) {
      slideInterval = setInterval(() => {
        paginate(1);
      }, 10000);
    }
    return () => clearInterval(slideInterval);
  }, [paginate, isPlaying]);

  return (
    <section
      className="relative w-full bg-black overflow-hidden group"
      suppressHydrationWarning
    >
      {/* --- MAIN IMAGE CONTAINER --- */}
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
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CONTROLS CONTAINER (Transparent) --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">

        {/* TENGAH: Indikator Bulat */}
        <div className="flex gap-4 items-center px-2">
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
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 w-32 h-20 rounded-lg border border-white/20 shadow-2xl overflow-hidden pointer-events-none z-50"
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

              <button
                onClick={() => {
                  const newDirection = index > currentSlide ? 1 : -1;
                  setPage([index, newDirection]);
                }}
                className={`w-5 h-5 rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "bg-white "
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
