"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalSchedules: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }

      // Fetch statistics
      const { count: doctorCount } = await supabase
        .from("doctors")
        .select("*", { count: "exact", head: true });

      const { count: scheduleCount } = await supabase
        .from("schedules")
        .select("*", { count: "exact", head: true });

      setStats({
        totalDoctors: doctorCount || 0,
        totalSchedules: scheduleCount || 0,
      });
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctors Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Dokter
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {stats.totalDoctors}
                </p>
              </div>
              <div className="text-6xl text-blue-200">👨‍⚕️</div>
            </div>
            <button
              onClick={() => router.push("/admin/doctors")}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kelola Dokter
            </button>
          </div>

          {/* Schedules Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Jadwal
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.totalSchedules}
                </p>
              </div>
              <div className="text-6xl text-green-200">📅</div>
            </div>
            <button
              onClick={() => router.push("/admin/schedules")}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Kelola Jadwal
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/admin/doctors?action=create")}
              className="bg-blue-50 border border-blue-200 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition-colors font-semibold"
            >
              + Tambah Dokter Baru
            </button>
            <button
              onClick={() => router.push("/admin/schedules?action=create")}
              className="bg-green-50 border border-green-200 text-green-600 py-3 rounded-lg hover:bg-green-100 transition-colors font-semibold"
            >
              + Tambah Jadwal Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
