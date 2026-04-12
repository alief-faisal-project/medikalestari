"use client";

import React, { useState } from "react";
import Image from "next/image";

const AboutUs = () => {
  // State untuk kontrol Card Visi / Motto
  const [activeTab, setActiveTab] = useState(0);

  const partners = ["tomtom", "viatris", "zoetis", "rohto", "davita", "chewy"];

  return (
    <section className="bg-white text-slate-900 scroll -mt-10 pb-20">
        
      {/* 1. SECTION FOTO  */}
      <div className="max-w-[1220px] mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden border border-slate-200 shadow-sm">
            <Image
              src="/tentangkami/hospital-building.jpg"
              alt="Gedung Utama RS Medika Lestari"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
            <div className="relative flex-1 aspect-[16/9] lg:aspect-auto overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src="/tentangkami/room.jpg"
                alt="Fasilitas Kamar"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 aspect-[16/9] lg:aspect-auto overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src="/tentangkami/lobby.jpg"
                alt="Lobby Rumah Sakit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION SEJARAH */}
      <div className="max-w-[1220px] mx-auto px-6 pb-24">
        <div className="max-w-[1220px]">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 uppercase mb-6">
            Sejarah Berdirinya RS Medika Lestari
          </h2>

          <div className="space-y-6 text-slate-700 leading-relaxed text-justify text-[16px]">
            <p>
              Berdiri tanggal 15 oktober 1994, berawal dari sebuah klinik yang
              bertempat di Jl. HOS Cokroaminoto Perum Pondok Lestari Blok C1
              No.1-2, Ciledug Kota Tanggerang 15157. Medika Lestari hadir untuk
              memenuhi permintaan masyarakat akan kesehatan yang baik dan prima.
              Pada tahun 1997 Klinik Medika Lestari membangun gedung baru dan
              meningkatkan statusnya dari klinik menjadi Klinik Spesialis dan
              Rumah Bersalin Medika Lestari.
            </p>
            <p>
              Pada tahun 2005 Rumah Sakit Medika Lestari menambah fasilitas dan
              meningkatkan statusnya menjadi Rumah Sakit Ibu dan Anak (RSIA) dan
              selanjutnya pada tahun 2008 Rumah Sakit Medika Lestari
              meningkatkan statusnya menjadi Rumah Sakit Umum. Tahun 2012 Rumah
              Sakit Medika Lestari terus berkembang dengan Motivasi yang sangat
              tinggi serta kebersamaan dan kekompakan seluruh karyawan RS Medika
              Lestari, kini RS Medika Lestari sampai pada proses pembangunan
              serta pengembangan dari segi pelayanan serta fasilitas.
            </p>
            <p>
              Tahun 2017 sampai sekarang RS Medika Lestari sudah melayani Rawat
              Inap, Rawat Jalan, dan layanan 24 Jam (IGD, Radiologi,
              Laboratorium, Farmasi). Pada tahun 2023 RS Medika Lestari sudah
              terakreditasi paripurna.
            </p>
          </div>
        </div>
      </div>

      {/* 3. VISI MISI  */}
      <div className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="max-w-[1220px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="bg-white shadow-xl shadow-slate-200/60 flex flex-col overflow-hidden border border-slate-100 min-h-[300px]">
              <div className="bg-[#0084BF] p-6 flex justify-end items-center relative overflow-hidden">
                <div className="absolute left-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full"></div>
                <h3 className="text-white text-3xl font-bold relative z-10 uppercase">
                  {activeTab === 0 ? "VISI" : "MOTTO"}
                </h3>
              </div>

              <div className="p-10 flex flex-col justify-between flex-grow">
                <div className="min-h-[80px]">
                  {activeTab === 0 ? (
                    <p className="text-black text-[16px] leading-relaxed animate-in fade-in duration-500">
                      Menjadikan Rumah Sakit yang terbaik dan terjangkau oleh
                      seluruh lapisan masyarakat.
                    </p>
                  ) : (
                    <p className="text-black text-[18px] font-semibold italic leading-relaxed animate-in fade-in duration-500">
                      "Kesembuhan Anda Kebahagiaan Kami"
                    </p>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setActiveTab(0)}
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      activeTab === 0
                        ? "bg-[#0084BF]"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                  <button
                    onClick={() => setActiveTab(1)}
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      activeTab === 1
                        ? "bg-[#0084BF]"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl shadow-slate-200/60 flex flex-col overflow-hidden border border-slate-100 min-h-[300px]">
              <div className="bg-[#005075] p-6 flex justify-end items-center relative overflow-hidden">
                <div className="absolute left-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full"></div>
                <h3 className="text-white text-3xl font-bold relative z-10">
                  MISI
                </h3>
              </div>
              <div className="p-10">
                <ul className="text-black text-[15px] space-y-4 leading-relaxed">
                  <li className="flex gap-2">
                    <span>1.</span>
                    <span>Misi Kami Mengutamakan Pasien Safety.</span>
                  </li>
                  <li className="flex gap-2 text-justify">
                    <span>2.</span>
                    <span>
                      Meningkatkan mutu pelayanan secara berkesinambungan.
                    </span>
                  </li>
                  <li className="flex gap-2 text-justify">
                    <span>3.</span>
                    <span>
                      Serta memberikan pelayanan yang efektif dan efisien.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AKREDITASI  */}
      <div className="max-w-[1220px] mx-auto px-6 py-24 md:py-32 border-b border-slate-100">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Header Akreditasi */}
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold text-slate-900 uppercase mb-2">
              Terakreditasi Paripurna
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              RS Medika Lestari telah memenuhi standar pelayanan kesehatan
              nasional dengan kelulusan tingkat tertinggi (Paripurna) dari KARS.
            </p>
          </div>

          {/* Gambar Sertifikat */}
          <div className="w-full flex justify-center">
            <div className="p-4 md:p-8">
              <div className="bg-white p-2 overflow-hidden">
                <Image
                  src="/tentangkami/akreditas.png"
                  alt="Sertifikat Akreditasi Paripurna KARS"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECTION MITRA KAMI */}
      <div className="max-w-[1220px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 uppercase">
            Mitra Kami
          </h3>
          <p className="text-slate-500 text-[15px] max-w-[600px] mx-auto">
            Komitmen kami terhadap kualitas divalidasi oleh organisasi perawatan
            kesehatan bergengsi
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {partners.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center p-4 border border-slate-100 rounded-xl bg-white shadow-sm h-32 relative"
            >
              <Image
                src={`/tentangkami/${item}.webp`}
                alt={item}
                fill
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
