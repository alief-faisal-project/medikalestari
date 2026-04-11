"use client";
import React from "react";
import { Schedule } from "@/lib/types";
import { Calendar, Clock, CheckCircle } from "lucide-react";
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
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#0084BF] p-3 rounded-lg">
          <Calendar className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-[#003d79]">Jadwal Praktik</h2>
      </div>

      {sortedDays.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Belum ada jadwal praktik</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sortedDays.map((day, dayIndex) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              className="bg-white rounded-lg border-2 border-blue-200 p-6 hover:border-[#0084BF] transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#0084BF] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {dayIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-[#003d79]">{day}</h3>
                {schedulesByDay[day]?.every((s) => s.is_available) && (
                  <CheckCircle className="text-green-500 ml-auto" size={20} />
                )}
              </div>

              <div className="space-y-3">
                {schedulesByDay[day].map((schedule, idx) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between bg-linear-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="text-[#0084BF]" size={18} />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Jam {idx + 1}
                        </p>
                        <p className="text-sm text-gray-600">
                          {schedule.start_time} - {schedule.end_time}
                        </p>
                      </div>
                    </div>
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
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBooking}
        className="w-full bg-linear-to-r from-[#0084BF] to-[#0073a5] text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <Calendar size={20} />
        Buat Janji Temu
      </motion.button>
    </div>
  );
}
