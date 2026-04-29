"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LocationSection() {
  const mapQuery = encodeURIComponent(
    "Jl. HOS Cokroaminoto Blok C1 No.1-2, Ciledug, Kota Tangerang",
  );
  const src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="lokasi" className="bg-white py-20 ">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 -mb-20">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-100 "
        >
          <div>
            <h2 className="font-sans text-4xl md:text-4xl font-thin text-slate-800 uppercase tracking-tighter leading-none">
              Lokasi Kami
            </h2>
          </div>

          <p className="font-sans text-slate-500 max-w-sm text-sm md:text-right font-normal">
            Jl. HOS Cokroaminoto, Blok C1 No.1-2, <br />
            Ciledug, Kota Tangerang 15157
          </p>
        </motion.div>

        {/* MAP CONTAINER */}
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-slate-200">
          <iframe
            title="Lokasi RS Medika Lestari"
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
