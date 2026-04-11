"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session) {
          setUserEmail(session.user.email || null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (path: string) => {
    return pathname === path
      ? "bg-blue-700 text-white"
      : "text-gray-700 hover:bg-gray-100";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/admin/dashboard"
            className="text-2xl font-bold text-blue-600"
          >
            Admin RS Medika
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/admin/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/dashboard")}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/doctors"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/doctors")}`}
            >
              Kelola Dokter
            </Link>
            <Link
              href="/admin/schedules"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/schedules")}`}
            >
              Jadwal Dokter
            </Link>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4">
            <Link
              href="/admin/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/dashboard")}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/doctors"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/doctors")}`}
            >
              Kelola Dokter
            </Link>
            <Link
              href="/admin/schedules"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive("/admin/schedules")}`}
            >
              Jadwal Dokter
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
