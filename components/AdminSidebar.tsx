"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Home,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // default desktop buka, mobile tutup
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // detect mobile / desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      // mobile default close
      if (mobile) {
        setIsOpen(false);
      } else {
        // desktop default open
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    setMounted(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ambil session user
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!active) return;

        if (data?.session?.user?.email) {
          setUserEmail(data.session.user.email);
        }
      } catch {
        //
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      await supabase.auth.signOut().catch(() => null);
    }

    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kelola Dokter", href: "/admin/doctors", icon: Users },
    { name: "Jadwal Dokter", href: "/admin/schedules", icon: Calendar },
    { name: "Kelola Mading", href: "/admin/mading", icon: Newspaper },
    { name: "Hero Banner", href: "/admin/hero", icon: ImageIcon },
    { name: "Kelola Kamar", href: "/admin/rooms", icon: ImageIcon },
    { name: "Kelola Careers", href: "/admin/careers", icon: ImageIcon },
  ];

  const isActive = (path: string) => pathname === path;


  if (!mounted) return null;

  return (
    <>
      {/* MOBILE TOGGLE */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-[70] p-2.5 bg-white rounded-xl shadow-md border border-slate-200 md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {/* OVERLAY MOBILE */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-50
          transition-all duration-300 ease-in-out
          flex flex-col overflow-hidden

          ${
            isMobile
              ? isOpen
                ? "w-64 translate-x-0"
                : "w-64 -translate-x-full"
              : isOpen
                ? "w-64 translate-x-0"
                : "w-20 translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 min-h-[88px] flex items-center">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            {isOpen ? (
              <span className="font-semibold text-[28px] tracking-tight leading-none">
                Panel Admin
              </span>
            ) : (
              <span className="font-bold text-xl">PA</span>
            )}
          </Link>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                  group
                  ${
                    active
                      ? "bg-slate-100 text-black shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-black"
                  }
                `}
              >
                <item.icon
                  size={20}
                  className={
                    active
                      ? "text-black"
                      : "text-slate-400 group-hover:text-black"
                  }
                />

                {isOpen && (
                  <span className="text-[14px] font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}

                {active && isOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          {/* HOME */}
          <button
            onClick={() => router.push("/")}
            className="
              w-full flex items-center gap-4 px-4 py-3 rounded-xl
              bg-blue-600 text-white font-bold
              shadow-md hover:scale-[1.02] active:scale-[0.98]
              transition-all cursor-pointer
            "
          >
            <Home size={20} />
            {isOpen && <span className="text-[14px]">Beranda</span>}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-4 px-4 py-3 rounded-xl
              bg-red-600 text-white font-bold
              shadow-md hover:scale-[1.02] active:scale-[0.98]
              transition-all cursor-pointer
            "
          >
            <LogOut size={20} />
            {isOpen && <span className="text-[14px]">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
