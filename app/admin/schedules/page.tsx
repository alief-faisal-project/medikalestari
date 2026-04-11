"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import { supabase } from "@/lib/supabase";
import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  fetchDoctors,
} from "@/lib/api";
import { Doctor, Schedule } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const DAYS_OF_WEEK = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const AdminSchedulesPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    doctor_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    is_available: true,
  });
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
      fetchData();
    };

    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      const doctorsList = await fetchDoctors();
      setDoctors(doctorsList);

      const { data, error } = await supabase.from("schedules").select("*");
      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const scheduleData = {
        doctor_id: formData.doctor_id,
        day_of_week: formData.day_of_week,
        start_time: formData.start_time,
        end_time: formData.end_time,
        is_available: formData.is_available,
      };

      if (editingId) {
        await updateSchedule(editingId, scheduleData);
      } else {
        await createSchedule(scheduleData);
      }

      resetForm();
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Terjadi kesalahan saat menyimpan jadwal");
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setFormData({
      doctor_id: schedule.doctor_id,
      day_of_week: schedule.day_of_week,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_available: schedule.is_available,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      try {
        await deleteSchedule(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Terjadi kesalahan saat menghapus jadwal");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      doctor_id: "",
      day_of_week: "",
      start_time: "",
      end_time: "",
      is_available: true,
    });
    setEditingId(null);
  };

  const getDoctorName = (doctorId: string) => {
    return doctors.find((d) => d.id === doctorId)?.name || "Unknown";
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Kelola Jadwal Dokter
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            Tambah Jadwal
          </button>
        </div>

        {/* Schedules List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Nama Dokter
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Hari
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Jam Mulai
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Jam Selesai
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {getDoctorName(schedule.doctor_id)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {schedule.day_of_week}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {schedule.start_time}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {schedule.end_time}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          schedule.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {schedule.is_available ? "Tersedia" : "Tidak Tersedia"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Doctor Select */}
              <div>
                <label
                  htmlFor="doctor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pilih Dokter
                </label>
                <select
                  id="doctor"
                  value={formData.doctor_id}
                  onChange={(e) =>
                    setFormData({ ...formData, doctor_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">-- Pilih Dokter --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Select */}
              <div>
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hari
                </label>
                <select
                  id="day"
                  value={formData.day_of_week}
                  onChange={(e) =>
                    setFormData({ ...formData, day_of_week: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">-- Pilih Hari --</option>
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Time */}
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jam Mulai
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={formData.start_time}
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* End Time */}
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jam Selesai
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={formData.end_time}
                  onChange={(e) =>
                    setFormData({ ...formData, end_time: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3">
                <input
                  id="available"
                  type="checkbox"
                  checked={formData.is_available}
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium text-gray-700"
                >
                  Tersedia
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6"
              >
                {editingId ? "Perbarui Jadwal" : "Tambah Jadwal"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedulesPage;
