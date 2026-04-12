"use client";

import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import {
  Users,
  Calendar,
  Plus,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

// Pindahkan ke luar agar tidak merah dan tidak re-render tidak perlu
const EmbossButton = ({ onClick, children, className = "", icon: Icon }) => (
  <button
    onClick={onClick}
    className={`group px-6 py-4 bg-white text-slate-700 rounded-xl transition-all duration-300 
    shadow-[0_0_15px_rgba(0,0,0,0.06)] 
    hover:shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] 
    active:scale-[0.97] cursor-pointer flex items-center justify-center gap-3 ${className}`}
  >
    {Icon && (
      <Icon size={18} className="transition-transform group-hover:scale-110" />
    )}
    <span className="font-medium text-[14px]">{children}</span>
  </button>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalSchedules: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      if (authLoading) return;
      if (!isAuthenticated) {
        router.push("/admin/login");
        return;
      }

      try {
        const [docRes, schRes] = await Promise.all([
          fetch("/api/admin/stats/doctors")
            .then((r) => r.json())
            .catch(() => ({ count: 0 })),
          fetch("/api/admin/stats/schedules")
            .then((r) => r.json())
            .catch(() => ({ count: 0 })),
        ]);

        if (mounted) {
          setStats({
            totalDoctors: docRes.count || 0,
            totalSchedules: schRes.count || 0,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading stats:", error);
        if (mounted) setLoading(false);
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-200 border-t-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-black font-sans">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <header className="mb-12 flex items-center gap-4">
          <div className="p-2.5 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-slate-100">
            <LayoutDashboard size={20} className="text-black" />
          </div>
          <h1 className="text-xl font-medium">Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card Dokter */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-100 group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-[12px] mb-2">
                  Total Database Dokter
                </p>
                <p className="text-5xl font-light tracking-normal">
                  {stats.totalDoctors < 10
                    ? `0${stats.totalDoctors}`
                    : stats.totalDoctors}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Users size={24} />
              </div>
            </div>
            <EmbossButton
              onClick={() => router.push("/admin/doctors")}
              className="mt-10 w-full border border-slate-100"
              icon={ChevronRight}
            >
              Kelola Data Dokter
            </EmbossButton>
          </div>

          {/* Card Jadwal */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-100 group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-[12px] mb-2">
                  Total Jadwal Aktif
                </p>
                <p className="text-5xl font-light tracking-normal">
                  {stats.totalSchedules < 10
                    ? `0${stats.totalSchedules}`
                    : stats.totalSchedules}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Calendar size={24} />
              </div>
            </div>
            <EmbossButton
              onClick={() => router.push("/admin/schedules")}
              className="mt-10 w-full border border-slate-100"
              icon={ChevronRight}
            >
              Atur Jadwal Praktik
            </EmbossButton>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-5 bg-black rounded-full"></div>
            <h2 className="text-[14px] font-medium uppercase tracking-tight">
              Aksi Cepat
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmbossButton
              onClick={() => router.push("/admin/doctors?action=create")}
              className="border border-slate-100"
              icon={Plus}
            >
              Tambah Tenaga Medis
            </EmbossButton>
            <EmbossButton
              onClick={() => router.push("/admin/schedules?action=create")}
              className="border border-slate-100"
              icon={Plus}
            >
              Buat Plotting Jadwal
            </EmbossButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
