"use client";

import React from "react";
import { motion } from "framer-motion";

const DoctorSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row items-center md:items-start gap-8"
    >
      {/* Foto Dokter Skeleton (Bulat) */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-gray-200 animate-pulse" />

      {/* Konten Dokter Skeleton */}
      <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left pt-2 w-full">
        {/* Nama Dokter Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse" />

        {/* Spesialisasi Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-40 mb-4 animate-pulse" />

        {/* Bio Skeleton */}
        <div className="space-y-2 mb-6 w-full md:w-3/4">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>

        {/* Lihat Jadwal Link Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-24 mb-6 animate-pulse" />

        {/* Buttons Skeleton */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="px-8 py-3 bg-gray-200 rounded-full w-32 animate-pulse" />
          <div className="px-8 py-3 bg-gray-200 rounded-full w-32 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorSkeleton;
