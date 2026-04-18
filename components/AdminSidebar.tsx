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
  User,
  Home,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (data?.session?.user?.email) setUserEmail(data.session.user.email);
      } catch {
        /* ignore */
      }
    };
    load();
    return () => {
      mounted = false;
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
    { name: "Kelola Careers", href: "/admin/careers", icon: ImageIcon },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-[60] md:hidden p-2 bg-white rounded-lg shadow-md border border-slate-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed top-0 left-0 h-screen bg-white border-r border-slate-100 transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-0 -left-64 md:w-20 md:left-0"}
        overflow-hidden flex flex-col
      `}
      >
        {/* Brand Logo Section */}
        <div className="p-6 border-b border-slate-50">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            {isOpen && (
              <span className="font-semibold text-[30px] tracking-tight">
                Panel Admin
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                  ${
                    Active
                      ? "bg-slate-50 text-black shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-black"
                  }
                `}
              >
                <item.icon
                  size={20}
                  className={
                    Active
                      ? "text-black"
                      : "text-slate-400 group-hover:text-black"
                  }
                />
                {isOpen && (
                  <span className="text-[14px] font-medium">{item.name}</span>
                )}
                {Active && isOpen && (
                  <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Home, User & Logout) */}
        <div className="p-4 border-t border-slate-50 space-y-3">
          {/* Button Kembali ke Beranda */}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-4 px-4 py-3 bg-blue-600 text-white rounded-xl transition-all duration-300 
            shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
            hover:scale-[1.02] hover:shadow-[0_6px_15px_rgba(0,0,0,0.08)] 
            active:scale-[0.97] group border border-gray-100 cursor-pointer"
          >
            <Home size={20} className="text-whit" />
            {isOpen && <span className="text-[14px] font-bold">Beranda</span>}
          </button>

          {/* Button Logout */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
              bg-red-600 text-white font-bold cursor-pointer
              shadow-[0_4px_15px_rgba(239,68,68,0.3)] 
              hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)]
              active:scale-[0.97]
              border border-gray-100
            `}
          >
            <LogOut size={20} />
            {isOpen && <span className="text-[14px]">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Overlay mobile ketika sidebar aktif */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
