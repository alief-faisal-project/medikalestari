"use client";
import React from "react";
import { Schedule } from "@/lib/types";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface DoctorScheduleDisplayProps {
  schedules: Schedule[];
  onBooking: () => void;
}

const DAYS_ORDER = {
  Senin: 0,
  Selasa: 1,
  Rabu: 2,
  Kamis: 3,
  Jumat: 4,
  Sabtu: 5,
  Minggu: 6,
};

export default function DoctorScheduleDisplay({
  schedules,
  onBooking,
}: Readonly<DoctorScheduleDisplayProps>) {
  // Group schedules by day of week
  const schedulesByDay = schedules.reduce(
    (acc, schedule) => {
      if (!acc[schedule.day_of_week]) {
        acc[schedule.day_of_week] = [];
      }
      acc[schedule.day_of_week].push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  // Sort days
  const sortedDays = Object.keys(schedulesByDay).sort(
    (a, b) =>
      (DAYS_ORDER[a as keyof typeof DAYS_ORDER] || 7) -
      (DAYS_ORDER[b as keyof typeof DAYS_ORDER] || 7),
  );

  return (
    // Container utama compact
    <div className="max-w-2xl bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold text-gray-800">Jadwal Praktik</h2>
      </div>

      {sortedDays.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200 mb-4">
          <p className="text-xs text-gray-500">
            Belum ada jadwal praktik tersedia
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          {sortedDays.map((day, dayIndex) => (
            <div key={day} className="flex flex-col gap-1.5">
              {schedulesByDay[day].map((schedule) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between bg-[#f0f9fb] border border-[#e0f2f7] rounded-lg px-3 py-2"
                >
                  <span className="text-sm font-bold text-[#2d3748]">
                    {day}
                  </span>
                  <span className="text-sm font-medium text-[#4a5568]">
                    {schedule.start_time.substring(0, 5)} -{" "}
                    {schedule.end_time.substring(0, 5)}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Button Rounded Full dengan Gradient [#005075] ke [#0084BF] */}
      <div className="flex justify-start">
        <motion.button
          whileHover={{
            scale: 1.03,
            shadow: "0px 4px 10px rgba(0, 80, 117, 0.3)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={onBooking}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#005075] to-[#0084BF] text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all text-sm"
        >
          <Calendar size={16} strokeWidth={2.5} />
          <span>Buat Janji</span>
        </motion.button>
      </div>
    </div>
  );
}
