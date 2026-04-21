"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Clock, Building2 } from "lucide-react";

const MobileBottomNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const navItems = [
    {
      icon: Home,
      label: "Beranda",
      href: "/",
      onClick: handleHomeClick,
    },
    {
      icon: Users,
      label: "Cari Dokter",
      href: "/dokter",
    },
    {
      icon: Clock,
      label: "Jadwal Dokter",
      href: "/jadwal-dokter",
    },
    {
      icon: Building2,
      label: "Kamar Perawatan",
      href: "/services/kamar-perawatan",
    },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center w-1/4 py-3 px-2 transition-colors ${
                  isItemActive
                    ? "text-[#0084BF] border-t-2 border-[#0084BF]"
                    : "text-gray-600 hover:text-[#0084BF]"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 text-center font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Padding to prevent content from being hidden behind navbar */}
      <div className="md:hidden h-20" />
    </>
  );
};

export default MobileBottomNavbar;
