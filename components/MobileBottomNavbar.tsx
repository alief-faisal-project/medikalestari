"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      outline: (
        <path d="M3 10.182V20a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1v-9.818a1 1 0 0 0-.316-.727l-8-7.273a1 1 0 0 0-1.368 0l-8 7.273A1 1 0 0 0 3 10.182Z" />
      ),
      solid: (
        <path d="M11.316 2.182a1 1 0 0 1 1.368 0l8 7.273A1 1 0 0 1 21 10.182V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.818a1 1 0 0 1 .316-.727l8-7.273Z" />
      ),
    },
    {
      label: "Dokter Kami",
      href: "/dokter",
      outline: (
        <g>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </g>
      ),
      solid: (
        <g>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2H16Z" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 15.13A4 4 0 0 1 22 19V21H18V19C18 17.2 17.1 15.7 15.7 14.8C16.8 14.4 18 14.5 19 15.13Z" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </g>
      ),
    },
    {
      label: "Jadwal Dokter",
      href: "/jadwal-dokter",
      outline: (
        <g>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </g>
      ),
      solid: (
        <g>
          <circle cx="12" cy="12" r="10" />
          <path
            fill="white"
            d="M12.5 7V12.5L16 14.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ),
    },
    {
      label: "Kamar Perawatan",
      href: "/services/kamar-perawatan",
      outline: (
        <g>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
        </g>
      ),
      solid: (
        <g>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18H6Z" />
          <path d="M2 14a2 2 0 0 1 2-2h2v10H4a2 2 0 0 1-2-2v-6Z" />
          <path d="M18 9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2V9Z" />
          <path stroke="white" strokeWidth="1.5" d="M9 7h6M9 11h6M9 15h6" />
        </g>
      ),
    },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isItemActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                // Prefetch otomatis aktif (true), membuat perpindahan halaman terasa instan
                prefetch={true}
                onClick={(e) => {
                  // Jika user klik menu yang sedang aktif, lakukan scroll ke atas
                  if (isItemActive) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`flex flex-col items-center justify-center w-1/4 py-3 px-2 transition-all duration-200 relative tap-highlight-transparent ${
                  isItemActive ? "text-[#005753]" : "text-gray-400"
                }`}
              >
                {/* Indikator Atas */}
                <div
                  className={`absolute top-0 w-full h-[3px] bg-[#005753] rounded-b-sm transition-transform duration-300 ease-out ${
                    isItemActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                <div className="relative mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="24" // Ukuran sedikit dikecilkan agar lebih proporsional
                    height="24"
                    fill={isItemActive ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={isItemActive ? "0.5" : "1.8"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 active:scale-90"
                  >
                    {isItemActive ? item.solid : item.outline}
                  </svg>
                </div>

                <span
                  className={`text-[10px] mt-1 text-center font-bold tracking-tight transition-colors ${
                    isItemActive
                      ? "text-[#005753]"
                      : "text-gray-500 font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer agar konten tidak tertutup navbar */}
      <div className="md:hidden h-[64px]" />
    </>
  );
};

export default MobileBottomNavbar;
