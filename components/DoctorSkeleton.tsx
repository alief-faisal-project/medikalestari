"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * ShimmerOverlay dengan warna abu-abu yang lebih deep
 * Menggunakan via-slate-300/50 agar efek mengalirnya lebih terlihat di dasar abu-abu
 */
const ShimmerOverlay = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        repeat: Infinity,
        duration: 1.8, // Sedikit lebih lambat agar kesan abu-abunya lebih tenang
        ease: "linear",
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/40 to-transparent"
    />
  </div>
);

const DoctorSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      // Parent container tetap bg-white agar menyatu dengan layout, tapi konten dalamnya lebih abu-abu
      className="relative flex flex-row items-start gap-4 md:gap-8 p-4 md:p-8 bg-white border border-slate-100 shadow-sm h-fit min-h-[160px] md:min-h-[260px] rounded-none overflow-hidden"
    >
      {/* Foto Dokter Skeleton - bg-slate-200 */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 shrink-0 rounded-full bg-slate-200 border-4 border-slate-100 overflow-hidden">
        <ShimmerOverlay />
      </div>

      {/* Konten Dokter Skeleton */}
      <div className="flex-1 text-left pt-2 space-y-4">
        {/* Nama - bg-slate-200 */}
        <div className="relative h-6 md:h-8 bg-slate-200 rounded-sm w-3/4 overflow-hidden">
          <ShimmerOverlay />
        </div>

        {/* Spesialisasi - bg-slate-200 */}
        <div className="relative h-3 md:h-4 bg-slate-200 rounded-sm w-1/4 overflow-hidden">
          <ShimmerOverlay />
        </div>

        {/* Bio (Desktop Only) - bg-slate-100 */}
        <div className="space-y-2 hidden md:block">
          <div className="relative h-3 bg-slate-100 rounded-sm w-full overflow-hidden">
            <ShimmerOverlay />
          </div>
          <div className="relative h-3 bg-slate-100 rounded-sm w-5/6 overflow-hidden">
            <ShimmerOverlay />
          </div>
        </div>

        {/* Buttons - bg-slate-200 */}
        <div className="flex flex-wrap justify-start gap-2 md:gap-3 mt-4 md:mt-8">
          <div className="relative h-9 md:h-11 w-28 md:w-36 bg-slate-200 rounded-full overflow-hidden">
            <ShimmerOverlay />
          </div>
          <div className="relative h-9 md:h-11 w-28 md:w-36 bg-slate-200 rounded-full overflow-hidden">
            <ShimmerOverlay />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorSkeleton;
