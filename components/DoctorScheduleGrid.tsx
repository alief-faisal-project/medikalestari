"use client";

import React, { useState, useMemo } from "react";
import { Doctor, Schedule } from "@/lib/types";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DoctorWithSchedule extends Doctor {
  schedules: Schedule[];
}

interface DoctorScheduleGridProps {
  doctorsWithSchedules: DoctorWithSchedule[];
  loading?: boolean;
}

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function DoctorScheduleGrid({
  doctorsWithSchedules = [],
  loading = false,
}: Readonly<DoctorScheduleGridProps>) {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [searchDoctor, setSearchDoctor] = useState("");

  const specialties = useMemo(() => {
    if (!doctorsWithSchedules) return [];
    const specs = new Set(doctorsWithSchedules.map((doc) => doc.specialty));
    return Array.from(specs).sort((a, b) => a.localeCompare(b));
  }, [doctorsWithSchedules]);

  const filteredDoctors = useMemo(() => {
    if (!doctorsWithSchedules) return [];
    return doctorsWithSchedules
      .filter((doc) => {
        const matchesSpecialty =
          !selectedSpecialty || doc.specialty === selectedSpecialty;
        const matchesSearch = doc.name
          .toLowerCase()
          .includes(searchDoctor.toLowerCase());
        return matchesSpecialty && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [doctorsWithSchedules, selectedSpecialty, searchDoctor]);

  const getScheduleForCell = (
    day: string,
    row: number,
    schedules: Schedule[] = [],
  ) => {
    const daySchedules = schedules
      .filter((s) => s.day_of_week === day)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

    if (row === 1) return daySchedules.slice(0, 1);
    if (row === 2) return daySchedules.slice(1, 2);
    return [];
  };

  if (loading) {
    return (
      <div className="w-full min-h-96 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#005cb3] mb-4" />
        <p className="text-slate-600">Memuat jadwal dokter...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* SEARCH & FILTER SECTION */}
      <div className="space-y-4">
        {/* Search Bar with Lucide Icon */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama dokter..."
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-[#005cb3] focus:ring-2 focus:ring-[#005cb3]/20 transition text-slate-900 placeholder-slate-500"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialty(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              selectedSpecialty === null
                ? "bg-[#005cb3] text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Semua ({doctorsWithSchedules.length})
          </button>
          {specialties.map((specialty) => {
            const count = doctorsWithSchedules.filter(
              (doc) => doc.specialty === specialty,
            ).length;
            return (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
                  selectedSpecialty === specialty
                    ? "bg-[#005cb3] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {specialty} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLE VIEW */}
      {filteredDoctors.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse min-w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-left font-bold text-slate-800 text-sm">
                  Dokter
                </th>
                <th className="py-4 px-4 text-left font-bold text-slate-800 text-sm border-l border-slate-200">
                  Spesialisasi
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="py-4 px-3 text-center font-bold text-slate-800 text-sm whitespace-nowrap border-l border-slate-200"
                  >
                    {day.substring(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, idx) => (
                <React.Fragment key={doctor.id}>
                  {/* Row 1 - First Schedule */}
                  <tr
                    onClick={() => router.push(`/dokter/${doctor.id}`)}
                    className={`border-b border-slate-200 transition-colors cursor-pointer ${
                      idx % 2 === 0
                        ? "bg-white hover:bg-blue-50"
                        : "bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        {doctor.image_url && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-200">
                            <Image
                              src={doctor.image_url}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span>{doctor.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#005cb3] font-medium border-l border-slate-200">
                      {doctor.specialty}
                    </td>
                    {DAYS.map((day) => {
                      const schedule = getScheduleForCell(
                        day,
                        1,
                        doctor.schedules,
                      );
                      return (
                        <td
                          key={`${doctor.id}-${day}-1`}
                          className="py-4 px-3 text-center text-sm border-l border-slate-200"
                        >
                          {schedule.length > 0 ? (
                            <span className="font-medium text-slate-700">
                              {schedule[0].start_time.substring(0, 5)}
                            </span>
                          ) : (
                            <span className="text-slate-300 text-lg">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 2 - Second Schedule */}
                  {doctor.schedules.some((s) => {
                    const dayCount = doctor.schedules.filter(
                      (x) => x.day_of_week === s.day_of_week,
                    ).length;
                    return dayCount > 1;
                  }) && (
                    <tr
                      onClick={() => router.push(`/dokter/${doctor.id}`)}
                      className={`border-b border-slate-200 text-xs transition-colors cursor-pointer ${
                        idx % 2 === 0
                          ? "bg-blue-50/30 hover:bg-blue-100/30"
                          : "bg-slate-100/50 hover:bg-slate-100"
                      }`}
                    >
                      <td
                        colSpan={2}
                        className="py-2 px-6 italic text-slate-400"
                      >
                        Sesi Tambahan
                      </td>
                      {DAYS.map((day) => {
                        const schedule = getScheduleForCell(
                          day,
                          2,
                          doctor.schedules,
                        );
                        return (
                          <td
                            key={`${doctor.id}-${day}-2`}
                            className="py-3 px-3 text-center border-l border-slate-200"
                          >
                            {schedule.length > 0 ? (
                              <span className="font-medium text-slate-600">
                                {schedule[0].start_time.substring(0, 5)}
                              </span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg font-medium">
            {searchDoctor
              ? `Dokter "${searchDoctor}" tidak ditemukan`
              : "Tidak ada jadwal dokter untuk spesialisasi ini"}
          </p>
        </div>
      )}

      {/* LEGEND */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-slate-800 mb-2">Keterangan:</p>
        <ul className="text-xs text-slate-700 space-y-1">
          <li>• Jam praktek ditampilkan dalam format 24 jam (HH:mm)</li>
          <li>
            • Baris kedua menampilkan sesi praktek kedua jika tersedia pada hari
            yang sama
          </li>
        </ul>
      </div>
    </div>
  );
}
