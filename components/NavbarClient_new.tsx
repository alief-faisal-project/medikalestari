"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchDropdown from "./SearchDropdown";
import { usePathname } from "next/navigation";

interface NavbarClientProps {
  logoNode: React.ReactNode;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ logoNode }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const menuData: Record<string, string[]> = {
    "Fasilitas & Layanan": [
      "Instalasi Gawat Darurat (IGD)",
      "Rawat Inap",
      "Rawat Jalan",
      "Laboratorium",
      "Radiologi",
      "Farmasi",
    ],
    "Informasi Pasien": [
      "Tarif Kamar",
      "Alur Pendaftaran",
      "Asuransi & Rekanan",
      "Panduan Kunjungan",
    ],
    "Tentang Kami": [
      "Profil RS Medika Lestari",
      "Visi & Misi",
      "Manajemen",
      "Berita & Artikel",
    ],
  };

  const languages = ["Bahasa Indonesia", "English"];

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <nav className="w-full font-sans sticky top-0 z-100 bg-white shadow-sm">
      {/* --- Top Bar --- */}
      <div className="bg-white py-4 relative z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {logoNode}
          </Link>

          <div className="hidden md:flex gap-4 items-center text-[15px] font-normal text-gray-700">
            <Link href="#" className="hover:text-blue-600">
              Kontak Kami
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-blue-600">
              Jenjang Karir
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- Main Bar  --- */}
      <div className="hidden md:block relative w-full bg-blue-600 text-white z-30">
        <div
          className="absolute right-0 top-0 h-full w-[38%] bg-blue-900 hidden lg:block"
          style={{ clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-14 relative z-10">
          <div className="flex h-full text-[15px]">
            <button
              onClick={scrollToTop}
              className={`pr-6 h-full transition-colors font-medium hover:bg-black/10 ${
                pathname === "/" ? "bg-black/20" : ""
              }`}
            >
              Beranda
            </button>

            <Link
              href="/dokter#section-dokter"
              className={`flex items-center h-full px-6 hover:bg-black/10 transition-colors font-medium ${
                pathname === "/dokter" ? "bg-black/20" : ""
              }`}
            >
              Dokter Kami
            </Link>

            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setActiveMenu(item);
                }}
              >
                <button className="flex items-center gap-1 h-full px-6 hover:bg-black/10 transition-colors font-medium">
                  {item}
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {activeMenu === item && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden min-w-48"
                    >
                      {menuData[item].map((subitem) => (
                        <Link
                          key={subitem}
                          href="#"
                          className="block px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium border-b last:border-0"
                        >
                          {subitem}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center h-full gap-6 text-[15px]">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`flex items-center gap-2 transition-all h-full px-4 ${
                isSearchOpen ? "bg-gray-100 text-blue-600" : "hover:bg-black/10"
              }`}
            >
              <Search size={20} strokeWidth={2.5} />
              <span className="font-medium">Cari Dokter Spesialis</span>
            </button>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu("Lang")}
              onMouseLeave={() => setActiveMenu(null)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setActiveMenu("Lang");
              }}
            >
              <button className="flex items-center gap-2 px-4 h-full hover:bg-black/10 transition-colors">
                <Globe size={18} />
                <span className="font-medium">ID</span>
              </button>
              <AnimatePresence>
                {activeMenu === "Lang" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden min-w-40"
                  >
                    {languages.map((lang) => (
                      <Link
                        key={lang}
                        href="#"
                        className="block px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium border-b last:border-0"
                      >
                        {lang}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <SearchDropdown isOpen={isSearchOpen} />
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 top-18 bg-white z-90 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-4">
              <button
                onClick={scrollToTop}
                className="text-left p-4 font-bold text-blue-600 border-b text-lg"
              >
                Beranda
              </button>
              <Link
                href="/dokter#section-dokter"
                className="text-left p-4 font-bold text-blue-600 border-b text-lg"
              >
                Dokter Kami
              </Link>

              {Object.keys(menuData).map((item) => (
                <div key={item} className="border-b">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item ? null : item)
                    }
                    className="w-full text-left p-4 font-semibold text-gray-700 hover:bg-gray-50 flex justify-between items-center"
                  >
                    {item}
                    <ChevronDown
                      size={18}
                      style={{
                        transform: activeMenu === item ? "rotate(180deg)" : "",
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {activeMenu === item && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                      >
                        {menuData[item].map((subitem) => (
                          <Link
                            key={subitem}
                            href="#"
                            className="block p-4 pl-8 text-gray-600 hover:bg-gray-50 border-b text-sm"
                          >
                            {subitem}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarClient;
