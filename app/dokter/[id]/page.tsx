"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Award,
  Stethoscope,
  MoveRight,
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
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#0084BF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Dokter tidak ditemukan
          </h2>
          <button
            onClick={() => router.push("/dokter")}
            className="mt-4 text-sm font-bold border-b-2 border-black pb-1"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Navigation - Font Normal */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm font-bold mb-12 hover:text-gray-500 transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Left: Foto Bulat Clean */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[8px] border-white shadow-xl bg-white">
              <Image
                src={
                  doctor.image_url ||
                  "https://images.unsplash.com/photo-1612349317150-e539c59dc62a?w=800"
                }
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Info Section */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Label Kategori - Tracking Normal */}
              <span className="inline-block px-4 py-1.5 bg-[#0084BF] text-white text-xs font-bold uppercase mb-6 rounded-full shadow-sm">
                {doctor.specialty}
              </span>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                {doctor.name}
              </h1>

              {doctor.bio && (
                <div className="max-w-xl mb-10">
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {doctor.bio}
                  </p>
                </div>
              )}

              {/* Button - Gradient & Rounded Full */}
              <button
                onClick={() => setActiveTab("jadwal")}
                className="group flex items-center gap-3 bg-gradient-to-r from-[#005075] to-[#0084BF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Calendar size={20} />
                Lihat Jadwal Praktek
                <MoveRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Tabs - Font Normal */}
        <div className="flex gap-10 border-b border-gray-200 mb-12">
          {["profil", "jadwal"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-extrabold uppercase transition-all relative ${
                activeTab === tab ? "text-black" : "text-gray-400"
              }`}
            >
              {tab === "profil" ? "Profil Lengkap" : "Jadwal Praktik"}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0084BF]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[300px]"
        >
          {activeTab === "profil" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Award size={24} className="text-[#0084BF]" />
                  <h3 className="text-sm font-bold uppercase text-gray-400">
                    Pengalaman
                  </h3>
                </div>
                {doctor.experience_years && (
                  <div className="mb-4">
                    <span className="text-5xl font-black">
                      {doctor.experience_years}
                    </span>
                    <span className="text-sm font-bold text-gray-500 ml-2">
                      Tahun Praktik
                    </span>
                  </div>
                )}
                <p className="text-sm text-gray-500 leading-loose font-medium">
                  Berfokus pada pemulihan pasien secara holistik menggunakan
                  standar medis {doctor.specialty} yang teruji.
                </p>
              </div>

              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Stethoscope size={24} className="text-[#0084BF]" />
                  <h3 className="text-sm font-bold uppercase text-gray-400">
                    Bidang Fokus
                  </h3>
                </div>
                <div className="text-2xl font-bold mb-4">
                  {doctor.specialty}
                </div>
                <p className="text-sm text-gray-500 leading-loose font-medium">
                  Memberikan layanan konsultasi dan tindakan medis profesional
                  demi hasil yang maksimal bagi setiap pasien.
                </p>
              </div>
            </div>
          )}

          {activeTab === "jadwal" && (
            <div className="max-w-4xl">
              <DoctorScheduleDisplay
                schedules={schedules}
                onBooking={() => setShowBookingForm(true)}
              />
            </div>
          )}
        </motion.div>
      </div>

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
