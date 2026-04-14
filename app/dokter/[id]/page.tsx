"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchDoctorById, fetchSchedulesByDoctor } from "@/lib/api";
import { Doctor, Schedule } from "@/lib/types";
import DoctorScheduleDisplay from "@/components/DoctorScheduleDisplay";
import BookingForm from "@/components/BookingForm";

const DoctorDetailPage = () => {
  const params = useParams();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
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
    if (doctorId) loadData();
  }, [doctorId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
          {/* KOLOM KIRI: STICKY IMAGE 
              - 'lg:sticky': Membuat kolom menempel saat scroll di layar besar.
              - 'lg:top-24': Mengatur jarak dari atas layar saat sticky aktif.
          */}
          <div className="lg:col-span-4 lg:sticky lg:top-70 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-[0_10px_50px_rgba(0,0,0,0.1)] bg-slate-50"
            >
              <Image
                src={doctor.image_url || "/placeholder-doctor.jpg"}
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[12px] font-bold text-slate-400 uppercase">
                Bagikan Profil Dokter
              </p>
              <div className="flex gap-4">
                {/* WhatsApp */}
                <a
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-[#25D366] transition-all border border-slate-100 shadow-sm hover:shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-[#E1306C] transition-all border border-slate-100 shadow-sm hover:shadow-md"
                >
                  <i className="fa-brands fa-instagram text-xl"></i>
                </a>
                {/* Telegram */}
                <a
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-[#0088cc] transition-all border border-slate-100 shadow-sm hover:shadow-md"
                >
                  <i className="fa-brands fa-telegram text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: INFO & JADWAL */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Identitas Dokter */}
              <div className="mb-10">
                <h1 className="text-5xl font-bold text-[#005075] mb-2 lowercase tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-xl text-slate-400 font-medium">
                  Spesialis {doctor.specialty}
                </p>
              </div>

              {/* SECTION 1: BIODATA (Berada di atas Jadwal) */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#005075] mb-4">
                  Biodata
                </h2>
                <div className="text-slate-600 leading-relaxed max-w-3xl text-lg">
                  {doctor.bio || "Informasi biodata dokter belum tersedia."}
                </div>
              </div>

              {/* SECTION 2: JADWAL PRAKTEK */}
              <div className="pt-10 border-t border-slate-100">
                <DoctorScheduleDisplay
                  schedules={schedules}
                  onBooking={() => setShowBookingForm(true)}
                />
              </div>
            </motion.div>
          </div>
        </div>
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
