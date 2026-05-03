"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const packages = [
  {
    title: "Paket Active Kartini",
    price: "Rp 300.000 – Rp 1.200.000",
    image: "/demo/mcu1.jpg",
    href: "/mcu/active-kartini",
  },
  {
    title: "Breast Screening",
    price: "Rp 400.000",
    image: "/demo/mcu2.jpg",
    href: "/mcu/breast-screening",
  },
  {
    title: "Skrining Kehamilan",
    price: "Rp 700.000 – Rp 1.100.000",
    image: "/demo/mcu3.jpg",
    href: "/mcu/kehamilan",
  },
  {
    title: "Paket General Checkup",
    price: "Rp 500.000 – Rp 900.000",
    image: "/demo/mcu4.jpg",
    href: "/mcu/general",
  },
];

export default function MedicalCheckup() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back */}
        <Link href="/" className="flex items-center gap-2 text-[#015A85] mb-6">
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#005753] mb-2">
          Medical Checkup
        </h1>
        <p className="text-gray-600 mb-8">
          Pilih paket pemeriksaan kesehatan sesuai kebutuhan Anda.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {packages.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="bg-white border overflow-hidden">
                {/* Image lebih tinggi */}
                <div className="h-[260px] md:h-[320px] bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#015A85] font-medium text-sm">
                    {item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
