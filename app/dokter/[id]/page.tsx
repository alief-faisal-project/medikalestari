"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  Mail,
  ArrowLeft,
  Calendar,
  Heart,
  Award,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import { fetchDoctorById, fetchSchedulesByDoctor } from "@/lib/api";
import { Doctor, Schedule } from "@/lib/types";
import DoctorScheduleDisplay from "@/components/DoctorScheduleDisplay";
import BookingForm from "@/components/BookingForm";

const DoctorDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profil" | "jadwal">("profil");
  const [showBookingForm, setShowBookingForm] = useState(false);

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
                onClick={() => setShowBookingForm(true)}
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
            <DoctorScheduleDisplay
              schedules={schedules}
              onBooking={() => setShowBookingForm(true)}
            />
          )}
        </motion.div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          doctorName={doctor.name}
          specialty={doctor.specialty}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default DoctorDetailPage;
