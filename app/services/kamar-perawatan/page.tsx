"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
  const displayImages =
    currentKamar?.room_images && currentKamar.room_images.length > 0
      ? currentKamar.room_images
      : currentKamar?.image_url
        ? [
            {
              id: "default",
              image_url: currentKamar.image_url,
              display_order: 0,
            },
          ]
        : [];

  const socialMedia = [
    {
      name: "Facebook",
      path: "M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.595 1.323-1.326V1.326C24 .595 23.405 0 22.675 0z",
    },
    {
      name: "Linkedin",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "Twitter",
      path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#015A85] rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Memuat data kamar...</p>
        </div>
      </div>
    );
  }

  if (!currentKamar) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 font-sans">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#015A85] hover:text-[#005075] mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="text-center text-gray-600">
            <p>Tidak ada data kamar yang tersedia.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Kembali */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#015A85] hover:text-[#005075] mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Kembali ke Beranda
        </Link>

        {/* Tab Navigasi Dinamis */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8 justify-center md:justify-start gap-4 md:gap-8">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveTab(room.name)}
              className={`pb-2 text-sm md:text-base font-medium transition-all ${
                activeTab === room.name
                  ? "text-[#015A85] border-b-2 border-[#015A85]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Konten Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Bagian Gambar - Carousel */}
            <div className="md:w-1/2 relative p-4">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-gray-200 relative">
                {currentKamar && displayImages.length > 0 ? (
                  <>
                    <Image
                      src={displayImages[currentImageIndex].image_url}
                      alt={currentKamar.name}
                      fill
                      className="object-cover transition-opacity duration-500"
                    />
                    {displayImages.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev - 1 + displayImages.length) %
                                displayImages.length,
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) => (prev + 1) % displayImages.length,
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Tidak ada gambar
                  </div>
                )}
              </div>
              {displayImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition ${
                        index === currentImageIndex
                          ? "bg-[#015A85]"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bagian Detail */}
            <div className="md:w-1/2 p-8 md:pl-4">
              <h1 className="text-3xl font-bold text-[#015A85] mb-1">
                {currentKamar.name}
              </h1>
              <p className="text-2xl font-semibold text-[#4CAF50] mb-6">
                {currentKamar.price}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {currentKamar.description}
              </p>

              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Fasilitas Kamar
              </h2>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 min-h-30">
                {currentKamar.facilities.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#015A85] mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Social Media Share */}
              <div className="flex gap-4 border-t pt-6 items-center">
                {socialMedia.map((social) => (
                  <svg
                    key={social.name}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#015A85] transition-colors"
                  >
                    <path d={social.path} />
                  </svg>
                ))}
                <Share2
                  size={20}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
