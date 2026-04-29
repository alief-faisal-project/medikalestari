"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchRoomTypes } from "@/lib/api";

interface RoomImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface RoomData {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
  display_order: number;
  facilities: string[];
  room_images?: RoomImage[];
}

interface RoomResponse {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
  display_order: number;
  facilities?: string[];
  room_images?: RoomImage[];
}

export default function KamarPerawatan() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRoomTypes();
        const roomsData = (data || []).map((room: RoomResponse) => ({
          id: room.id,
          name: room.name,
          price: room.price,
          image_url: room.image_url,
          description: room.description,
          display_order: room.display_order,
          facilities: room.facilities || [],
          room_images: room.room_images || [],
        }));
        setRooms(roomsData);
        if (roomsData.length > 0) {
          setActiveTab(roomsData[0].name);
          setCurrentImageIndex(0);
        }
      } catch (error) {
        console.error("Error loading rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const currentKamar = rooms.find((r: RoomData) => r.name === activeTab);

  const displayImages = React.useMemo(() => {
    if (!currentKamar) return [];
    if (currentKamar.room_images && currentKamar.room_images.length > 0) {
      return currentKamar.room_images;
    }
    return currentKamar.image_url
      ? [{ id: "default", image_url: currentKamar.image_url, display_order: 0 }]
      : [];
  }, [currentKamar]);

  const paginate = (newDirection: number) => {
    if (displayImages.length <= 1) return;
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = displayImages.length - 1;
      if (nextIndex >= displayImages.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 font-sans">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-5 w-32 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="flex flex-wrap border-b border-gray-100 mb-8 justify-center gap-2 md:gap-12">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="pb-4">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row md:min-h-[600px]">
              <div className="md:w-1/2 relative bg-gray-200 animate-pulse"></div>
              <div className="md:w-1/2 p-8 md:p-12 space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentKamar) return null;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigasi Kembali */}
        <div className="pt-16 pb-2 -mt-16">
          <nav className="flex items-center gap-1 text-[14px] font-normal text-gray-300 mb-4">
            <Link
              href="/"
              className="text-black/60 hover:text-gray-300 transition-colors"
            >
              Beranda
            </Link>
            <ChevronRight size={12} className="text-black/60" />
            <span className="font-normal">Kamar Perawatan</span>
          </nav>
        </div>

        {/* Tab Navigasi */}
        <div className="flex flex-wrap border-b border-gray-100 mb-8 justify-center gap-2 md:gap-12">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveTab(room.name);
                setCurrentImageIndex(0);
              }}
              className={`pb-4 text-sm md:text-base font-medium transition-all relative ${
                activeTab === room.name
                  ? "text-[#0045C9]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {room.name}
              {activeTab === room.name && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0045C9]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Card Utama */}
        <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          {/* md:min-h-[600px] menjaga agar ukuran card tetap konsisten di desktop */}
          <div className="flex flex-col md:flex-row md:min-h-[600px] items-stretch">
            {/* Sisi Kiri: Slider Gambar */}
            <div className="md:w-1/2 relative bg-[#f8f9fa] overflow-hidden min-h-[350px] md:min-h-full">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={currentImageIndex + activeTab}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {displayImages[currentImageIndex] && (
                    <Image
                      src={displayImages[currentImageIndex].image_url}
                      alt={currentKamar.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Tombol Navigasi Slider */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Indikator Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-5"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sisi Kanan: Detail Kamar */}
            {/* justify-between memastikan konten atas dan share bar tetap pada posisinya */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-[#0045C9] mb-2 leading-tight">
                    {currentKamar.name}
                  </h1>
                  <p className="text-2xl font-bold text-gray-700">
                    Rp.{currentKamar.price}
                  </p>
                </div>

                <div className="mb-8">
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {currentKamar.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-5">
                    Fasilitas Kamar
                  </h2>
                  {/* Grid dengan min-height atau penataan stabil */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    {currentKamar.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-[7px] h-[7px] rounded-full bg-[#0045C9] mt-1.5 shrink-0" />
                        <span className="text-[14px] text-gray-600 font-medium leading-snug">
                          {facility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bagian Share - Selalu menempel di bawah karena justify-between */}
              <div className="pt-8 border-t border-gray-100 flex items-center gap-6 mt-auto">
                <button className="text-gray-400 hover:text-[#0059FF] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.595 1.323-1.326V1.326C24 .595 23.405 0 22.675 0z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-[#0059FF] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-[#0059FF] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-[#0059FF] transition-colors">
                  <LinkIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
