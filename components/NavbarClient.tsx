"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Search, Menu, X, Globe, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchDropdown from "./SearchDropdown";
import DropdownMenuItem from "./DropdownMenuItem";
import { usePathname, useRouter } from "next/navigation";

interface NavbarClientProps {
  logoNode: React.ReactNode;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ logoNode }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  const languages = [
    { label: "Bahasa Indonesia", code: "ID", active: true },
    { label: "English", code: "EN", active: false },
  ];

  // --- Logika Kembali ke Beranda ---
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- Helper Render Dropdown ---
  const renderDropdownContent = (
    items: any[],
    widthClass: string = "w-72",
    isLang: boolean = false,
  ) => (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{ duration: 0.3, ease: "circOut" }}
      className={`absolute top-full bg-white text-gray-800 shadow-2xl overflow-hidden z-50 rounded-b-xl ${widthClass}`}
      style={{ borderTopColor: "#0084BF" }}
    >
      <div className="py-2">
        {items.map((item) => {
          const title = isLang ? item.label : item;
          const isActive = isLang ? item.active : true;
          return (
            <DropdownMenuItem
              key={title}
              title={title}
              href="#"
              className={
                isLang && !isActive
                  ? "text-gray-400 cursor-default hover:bg-transparent"
                  : ""
              }
            />
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <nav className="w-full font-sans sticky top-0 z-100 bg-white shadow-sm">
      {/* --- Bagian Atas: Logo & Top Links --- */}
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
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- buttom navbar --- */}
      <div className="hidden md:block relative w-full bg-[#0084BF] text-white z-30">
        <div
          className="absolute right-0 top-0 h-full w-[38%] bg-[#005075] hidden lg:block"
          style={{ clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-14 relative z-10">
          <div className="flex h-full text-[15px]">
            {/* --- Menu Beranda --- */}
            <button
              onClick={handleHomeClick}
              className="flex items-center h-full px-6 transition-colors font-medium relative group cursor-pointer"
            >
              Beranda
              <div
                className={`absolute bottom-0 left-6 right-6 h-1 bg-white rounded-t-full transition-transform duration-300 ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              ></div>
            </button>

            {/* --- Menu Dokter Kami --- */}
            <Link
              href="/dokter#section-dokter"
              className="flex items-center h-full px-6 transition-colors font-medium relative group"
            >
              Dokter Kami
              <div
                className={`absolute bottom-0 left-6 right-6 h-1 bg-white rounded-t-full transition-transform duration-300 ${pathname === "/dokter" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              ></div>
            </Link>

            {/* --- Menus Dropdown --- */}
            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center h-full px-6 transition-colors font-medium relative group">
                  {item}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-1 bg-white rounded-t-full transition-transform duration-300 ${activeMenu === item ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></div>
                </button>
                <AnimatePresence>
                  {activeMenu === item &&
                    renderDropdownContent(menuData[item], "left-0 w-72")}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center h-full gap-2 text-[15px]">
            {/* --- Search Bar: Underline & Clean --- */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-2 transition-all h-full px-3 relative group"
            >
              <Search size={20} strokeWidth={2.5} />
              <span className="font-medium">Cari Dokter Kami</span>
              <div
                className={`absolute bottom-0 left-3 right-3 h-1 bg-white rounded-t-full transition-transform duration-300 ${isSearchOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              ></div>
            </button>

            {/* --- Pemilih Bahasa --- */}
            <div
              className="relative h-full flex items-center px-3 cursor-pointer group"
              onMouseEnter={() => setActiveMenu("Lang")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1 px-1 py-1">
                <Globe size={18} />
                <span className="font-medium">ID</span>
              </div>
              <div
                className={`absolute bottom-0 left-3 right-3 h-1 bg-white rounded-t-full transition-transform duration-300 ${activeMenu === "Lang" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              ></div>
              <AnimatePresence>
                {activeMenu === "Lang" &&
                  renderDropdownContent(languages, "right-0 w-48", true)}
              </AnimatePresence>
            </div>

            {/* --- Login Admin --- */}
            <Link
              href="/admin/login"
              className="flex items-center px-3 h-full transition-colors"
              title="Admin Login"
            >
              <UserCircle size={22} />
            </Link>
          </div>
        </div>

        <SearchDropdown
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 top-[72px] bg-white z-[99] md:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-4">
              <button
                onClick={handleHomeClick}
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
                    className="w-full text-left p-4 font-semibold text-gray-700 flex justify-between items-center"
                  >
                    {item}
                    <span>{activeMenu === item ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activeMenu === item && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {menuData[item].map((subitem) => (
                          <Link
                            key={subitem}
                            href="#"
                            className="block p-4 pl-8 text-gray-600 border-b text-sm"
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
