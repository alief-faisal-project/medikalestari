"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">
              RS Medika Lestari
            </h3>
            <p className="text-sm leading-relaxed">
              Rumah sakit terkemuka dengan komitmen memberikan layanan kesehatan
              berkualitas tinggi dan terpercaya untuk masyarakat.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                className="hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl">f</span>
              </button>
              <button
                className="hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xl">𝕏</span>
              </button>
              <button
                className="hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </button>
              <button
                className="hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xl">in</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Menu Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/dokter"
                  className="hover:text-blue-400 transition-colors"
                >
                  Dokter Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Fasilitas & Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Berita & Artikel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Instalasi Gawat Darurat (IGD)
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rawat Inap
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rawat Jalan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Laboratorium
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Radiologi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin size={20} className="text-blue-400 shrink-0 mt-1" />
                <p className="leading-relaxed">
                  Jalan Kesehatan No. 123
                  <br />
                  Jakarta, Indonesia 12345
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={20} className="text-blue-400 shrink-0" />
                <a
                  href="tel:+62215551234"
                  className="hover:text-blue-400 transition-colors"
                >
                  +62 (21) 555-1234
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={20} className="text-blue-400 shrink-0" />
                <a
                  href="mailto:info@medikaLestari.com"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  info@medikaLestari.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8 md:my-12"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
          {/* Left: Copyright */}
          <div className="text-xs text-gray-400 text-center md:text-left">
            <p>&copy; {currentYear} RS Medika Lestari. Semua hak dilindungi.</p>
          </div>

          {/* Center: Links */}
          <div className="flex justify-center gap-4 md:gap-6 text-xs text-gray-400 flex-wrap">
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Syarat & Ketentuan
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Right: Extra Info */}
          <div className="text-xs text-gray-400 text-center md:text-right">
            <p>
              Dikembangkan dengan <span className="text-red-500">♥</span> untuk
              kesehatan Anda
            </p>
          </div>
        </div>
      </div>

      {/* Top Gradient Border */}
      <div className="h-1 bg-linear-to-r from-blue-600 via-blue-500 to-blue-600"></div>
    </footer>
  );
};

export default Footer;
