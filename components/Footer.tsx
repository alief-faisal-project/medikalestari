"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white text-[#003d79] font-sans pt-16 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Kolom Kiri: Logo & Info Alamat */}
          <div className="md:col-span-3 space-y-6">
            <Image
              src="/logo.png"
              alt="RS Medika Lestari"
              width={180}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold leading-tight">
                RS Medika Lestari
              </h2>
              <div className="flex gap-3 text-sm leading-relaxed text-[#003d79]">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1" />
                <p>
                  Jl. Kesehatan No. 123, <br />
                  Jakarta, Indonesia 12345
                </p>
              </div>
              {/* Sosmed Icon ala RS Premier */}
              <div className="flex gap-6 pt-4 text-[#003d79]">
                <Link href="#" className="hover:opacity-70">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </Link>
                <Link href="#" className="hover:opacity-70">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </Link>
                <Link href="#" className="hover:opacity-70">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </Link>
              </div>
            </div>
          </div>

          {/* Kolom Tengah 1: Layanan */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="font-bold text-[15px] mb-4">Layanan Unggulan</h3>
              <ul className="space-y-2 text-[13px]">
                {[
                  "Orthopedic Center",
                  "Spine Center",
                  "Heart Centre",
                  "Vascular Center",
                  "Stroke Center",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[15px] mb-4">
                Fasilitas & Pelayanan
              </h3>
              <ul className="space-y-2 text-[13px]">
                {[
                  "Fasilitas Kamar",
                  "Klinik Konselor",
                  "Home Care",
                  "Medical Check Up",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom Tengah 2: Tentang Kami */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="font-bold text-[15px] mb-4">Tentang Kami</h3>
              <ul className="space-y-2 text-[13px]">
                {[
                  "Visi & Misi",
                  "Akreditasi & Penghargaan",
                  "Kebijakan Antisuap",
                  "Karir",
                  "Vendor Governance",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[15px] mb-4">Promo & Paket</h3>
              <ul className="space-y-2 text-[13px]">
                {["Promo", "Paket Kesehatan"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom Kanan: Lainnya */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="font-bold text-[15px] mb-4">Lainnya</h3>
              <ul className="space-y-2 text-[13px]">
                {[
                  "Dokter Kami",
                  "Spesialis Kami",
                  "Hubungi Kami",
                  "Download Brosur",
                  "Media Informasi",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Widget atau Info Tambahan jika ada */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
