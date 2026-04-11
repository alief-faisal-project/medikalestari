"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  Stethoscope,
  Award,
  ArrowLeft,
  Calendar,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { fetchDoctorById, fetchSchedulesByDoctor } from "@/lib/api";
import { Doctor, Schedule } from "@/lib/types";

const DoctorDetailPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const doctorId = params.id as string;
  const action = searchParams.get("action");

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profil" | "jadwal" | "booking">(
    action === "booking" ? "booking" : "profil",
  );
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    keluhan: "",
    preferredDate: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const doctorData = await fetchDoctorById(doctorId);
        if (doctorData) {
          setDoctor(doctorData);
          const schedulesData = await fetchSchedulesByDoctor(doctorId);
          setSchedules(schedulesData);
        }
      } catch (error) {
        console.error("Error loading doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      loadData();
    }
  }, [doctorId]);

  const handleBookingSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle booking submission here
    alert(
      `Janji temu berhasil dibuat untuk ${bookingForm.patientName} dengan ${doctor?.name}`,
    );
    setBookingForm({
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      patientAge: "",
      keluhan: "",
      preferredDate: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#0084BF] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Dokter tidak ditemukan
          </h2>
          <button
            onClick={() => router.push("/dokter")}
            className="mt-4 text-[#0084BF] font-bold"
          >
            Kembali ke Daftar Dokter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#0084BF] font-bold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        {/* Doctor Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Doctor Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#0084BF] shadow-lg">
              <Image
                src={
                  doctor.image_url ||
                  "https://images.unsplash.com/photo-1612349317150-e539c59dc62a?w=500&h=500&fit=crop"
                }
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-[#003d79] mb-2">
              {doctor.name}
            </h1>
            <p className="text-xl text-[#0084BF] font-bold mb-4">
              {doctor.specialty}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              {doctor.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={20} className="text-[#0084BF]" />
                  <span>{doctor.phone}</span>
                </div>
              )}
              {doctor.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={20} className="text-[#0084BF]" />
                  <span>{doctor.email}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {doctor.bio && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#003d79] mb-2">
                  Tentang
                </h3>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab("jadwal")}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#0084BF] text-[#0084BF] font-bold rounded-lg hover:bg-blue-50 transition-all"
              >
                <Calendar size={18} />
                Lihat Jadwal
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className="flex items-center gap-2 px-6 py-3 bg-[#0084BF] text-white font-bold rounded-lg hover:bg-[#0073a5] transition-all"
              >
                <Heart size={18} />
                Buat Janji
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("profil")}
              className={`pb-4 px-2 font-bold uppercase text-sm tracking-wider transition-all ${
                activeTab === "profil"
                  ? "text-[#0084BF] border-b-2 border-[#0084BF]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Profil Lengkap
            </button>
            <button
              onClick={() => setActiveTab("jadwal")}
              className={`pb-4 px-2 font-bold uppercase text-sm tracking-wider transition-all ${
                activeTab === "jadwal"
                  ? "text-[#0084BF] border-b-2 border-[#0084BF]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Jadwal Praktek
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`pb-4 px-2 font-bold uppercase text-sm tracking-wider transition-all ${
                activeTab === "booking"
                  ? "text-[#0084BF] border-b-2 border-[#0084BF]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Buat Janji
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Tab */}
          {activeTab === "profil" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#003d79] mb-6 flex items-center gap-2">
                  <Award size={24} />
                  Pengalaman & Keahlian
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  {doctor.experience_years && (
                    <p className="text-lg text-gray-700 mb-4">
                      <span className="font-bold text-[#0084BF]">
                        {doctor.experience_years}+
                      </span>{" "}
                      tahun pengalaman
                    </p>
                  )}
                  <p className="text-gray-600">
                    {doctor.specialty} dengan dedikasi tinggi dalam memberikan
                    pelayanan kesehatan terbaik kepada pasien.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#003d79] mb-6 flex items-center gap-2">
                  <Stethoscope size={24} />
                  Spesialisasi
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-lg font-bold text-[#0084BF] mb-2">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600">
                    Berpengalaman dalam menangani berbagai kasus di bidang
                    spesialisasi ini dengan hasil yang memuaskan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "jadwal" && (
            <div>
              <h3 className="text-2xl font-bold text-[#003d79] mb-6">
                Jadwal Praktek
              </h3>
              {schedules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-[#0084BF]" />
                        <span className="font-bold text-[#003d79]">
                          {schedule.day_of_week}
                        </span>
                      </div>
                      <p className="text-gray-600 ml-7">
                        {schedule.start_time} - {schedule.end_time}
                      </p>
                      <div className="mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            schedule.is_available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {schedule.is_available ? "Tersedia" : "Penuh"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">Jadwal praktek belum tersedia</p>
                </div>
              )}
            </div>
          )}

          {/* Booking Tab */}
          {activeTab === "booking" && (
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-[#003d79] mb-6">
                Buat Janji Temu
              </h3>
              <form
                onSubmit={handleBookingSubmit}
                className="space-y-6 bg-gray-50 p-8 rounded-lg border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="patientName"
                      className="block text-sm font-bold text-[#003d79] mb-2"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      id="patientName"
                      type="text"
                      required
                      value={bookingForm.patientName}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          patientName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF]"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="patientAge"
                      className="block text-sm font-bold text-[#003d79] mb-2"
                    >
                      Usia *
                    </label>
                    <input
                      id="patientAge"
                      type="number"
                      required
                      value={bookingForm.patientAge}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          patientAge: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF]"
                      placeholder="Usia Anda"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="patientEmail"
                      className="block text-sm font-bold text-[#003d79] mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="patientEmail"
                      type="email"
                      required
                      value={bookingForm.patientEmail}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          patientEmail: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF]"
                      placeholder="Email Anda"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="patientPhone"
                      className="block text-sm font-bold text-[#003d79] mb-2"
                    >
                      Nomor Telepon *
                    </label>
                    <input
                      id="patientPhone"
                      type="tel"
                      required
                      value={bookingForm.patientPhone}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          patientPhone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF]"
                      placeholder="Nomor Telepon Anda"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-bold text-[#003d79] mb-2"
                  >
                    Tanggal Pilihan *
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    required
                    value={bookingForm.preferredDate}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        preferredDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="keluhan"
                    className="block text-sm font-bold text-[#003d79] mb-2"
                  >
                    Keluhan / Gejala *
                  </label>
                  <textarea
                    id="keluhan"
                    required
                    value={bookingForm.keluhan}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        keluhan: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084BF] resize-none"
                    rows={4}
                    placeholder="Deskripsikan keluhan atau gejala Anda"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#0084BF] text-white font-bold rounded-lg hover:bg-[#0073a5] transition-all uppercase tracking-wider"
                >
                  Konfirmasi Janji Temu
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
