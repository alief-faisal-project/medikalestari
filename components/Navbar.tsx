"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Data untuk isi dropdown sesuai gambar
  const menuData: Record<string, string[]> = {
    "Products and Applications": ["Applications", "Products", "Product Index"],
    Sustainability: [
      "Our Approach",
      "Caring For Our People And Communities",
      "Acting Responsibly For The Planet",
      "Building A Better Future Together",
      "ESG Disclosures",
      "Reporting Resources And Policies",
      "Product Stewardship Resource Library",
    ],
    Innovation: [
      "Areas of Focus",
      "Our Impact",
      "Technology Centers",
      "Collaboration & Outreach",
    ],
    Company: [
      "About Cabot",
      "Foundation",
      "Worldwide Locations",
      "Cabot Suppliers",
      "Newsroom",
      "Investors",
      "Careers",
      "Events",
      "Contact Us",
    ],
    Language: ["English", "中文", "日本語", "Português"],
  };

  return (
    <nav className="w-full border-b border-gray-200 font-sans relative">
      {/* Top Bar - Putih */}
      <div className="bg-white py-4">
        <div className="container-custom flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={35}
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex gap-4 items-center text-[15px] font-normal text-gray-700">
            <Link href="#" className="hover:text-red-600">
              Investors
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-red-600">
              Careers
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-red-600">
              Newsroom
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar - Merah */}
      <div className="relative w-full bg-[#d62300] text-white">
        {/* Layer Background Merah Gelap */}
        <div
          className="absolute right-0 top-0 h-full w-[40%] bg-[#b51e00] hidden lg:block"
          style={{ clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="container-custom flex justify-between items-center h-12 relative z-10">
          {/* Menu Kiri */}
          <div className="flex h-full text-[15px] font-normal">
            {Object.keys(menuData)
              .filter((key) => key !== "Language")
              .map((item) => (
                <div
                  key={item}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(item)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href="#"
                    className={`flex items-center h-full px-6 transition-colors hover:bg-black/10 ${item === "Products and Applications" ? "pl-0" : ""}`}
                  >
                    {item}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeMenu === item && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-12 left-0 w-64 bg-[#e9e9e9] text-gray-800 shadow-xl border-t-2 border-[#d62300] py-4 z-50"
                      >
                        {menuData[item].map((subItem) => (
                          <Link
                            key={subItem}
                            href="#"
                            className="flex items-center justify-between px-6 py-2 hover:bg-white transition-colors text-[14px]"
                          >
                            {subItem}
                            {subItem.includes("Products") && (
                              <span className="text-[10px] align-top ml-1">
                                †
                              </span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </div>

          {/* Area Kanan */}
          <div className="flex items-center h-full gap-6 text-[14px] font-normal">
            <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
              <Search size={18} strokeWidth={1.5} />
              <span>Search</span>
            </button>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu("Language")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer h-full">
                <Globe size={18} strokeWidth={1.5} />
                <span>Language</span>
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {activeMenu === "Language" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 w-40 bg-[#e9e9e9] text-gray-800 shadow-xl border-t-2 border-[#d62300] py-4 z-50"
                  >
                    {menuData["Language"].map((lang) => (
                      <Link
                        key={lang}
                        href="#"
                        className="block px-6 py-2 hover:bg-white transition-colors text-[14px]"
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
      </div>
    </nav>
  );
};

export default Navbar;
