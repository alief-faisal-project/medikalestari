"use client";

import React from "react";

export default function LocationSection() {
  const mapQuery = encodeURIComponent(
    "Jl. HOS Cokroaminoto Blok C1 No.1-2, Ciledug, Kota Tangerang",
  );
  const src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="lokasi" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-[#005075] mb-6">Lokasi Kami</h2>
        <p className="text-slate-600 mb-6">
          Jl. HOS Cokroaminoto, Blok C1 No.1-2, Ciledug, Kota Tangerang 15157
        </p>

        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-slate-200">
          <iframe
            title="Lokasi RS Medika Lestari"
            src={src}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
