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
        <Loader2 className="h-12 w-12 animate-spin text-[#006adb] mb-4" />
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
            placeholder="Masukan Nama Dokter"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            className="w-full pl-11 border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-[#006adb] text-sm bg-white text-slate-900 placeholder-slate-500"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialty(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              selectedSpecialty === null
                ? "bg-[#006adb] text-white shadow-md"
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
                    ? "bg-[#006adb] text-white "
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {specialty} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* GRID VIEW - DESKTOP */}
      {filteredDoctors.length > 0 && (
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <button
              key={doctor.id}
              onClick={() => router.push(`/dokter/${doctor.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/dokter/${doctor.id}`);
                }
              }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-slate-200 hover:border-blue-200 hover:shadow-md hover:shadow-[#006adb] text-left"
            >
              {/* Doctor Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <div className="flex gap-4 items-center">
                  {doctor.image_url && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-slate-200">
                      <Image
                        src={doctor.image_url}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-normal">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#006adb]/10">
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          className="py-2 px-1 font-semibold text-slate-700 border-b border-slate-200"
                        >
                          {day.substring(0, 3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {DAYS.map((day) => {
                        const schedule = getScheduleForCell(
                          day,
                          1,
                          doctor.schedules,
                        );
                        return (
                          <td
                            key={`${doctor.id}-${day}-1`}
                            className="py-2 px-1 border-b border-r border-slate-200 last:border-r-0 text-center h-12 align-middle"
                          >
                            {schedule.length > 0 ? (
                              <div className="text-[10px] font-medium text-slate-700 whitespace-normal">
                                {schedule[0].start_time.substring(0, 5)}
                              </div>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      {DAYS.map((day) => {
                        const schedule = getScheduleForCell(
                          day,
                          2,
                          doctor.schedules,
                        );
                        return (
                          <td
                            key={`${doctor.id}-${day}-2`}
                            className="py-2 px-1 border-r border-slate-200 last:border-r-0 text-center h-12 align-middle"
                          >
                            {schedule.length > 0 ? (
                              <div className="text-[10px] font-medium text-slate-700 whitespace-normal">
                                {schedule[0].start_time.substring(0, 5)}
                              </div>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* TABLE VIEW - MOBILE/TABLET */}
      {filteredDoctors.length > 0 && (
        <div className="lg:hidden flex flex-col gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => router.push(`/dokter/${doctor.id}`)}
              className="bg-white border border-slate-200 shadow-sm overflow-hidden active:scale-[0.99] transition-transform"
            >
              {/* Bagian Atas: Profil Dokter */}
              <div className="p-4 flex items-center gap-4 bg-slate-50/50">
                {doctor.image_url && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-slate-200">
                    <Image
                      src={doctor.image_url}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 leading-tight">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-normal mt-0.5">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              {/* Bagian Bawah: Tabel Jadwal Ringkas */}
              <div className="border-t border-slate-100">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80">
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          className="py-2 text-[10px] font-bold text-slate-500 uppercase border-r border-slate-100 last:border-0"
                        >
                          {day.substring(0, 3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {DAYS.map((day) => {
                        const s1 = getScheduleForCell(day, 1, doctor.schedules);
                        const s2 = getScheduleForCell(day, 2, doctor.schedules);
                        const isAvailable = s1.length > 0 || s2.length > 0;

                        return (
                          <td
                            key={`${doctor.id}-${day}`}
                            className={`py-3 px-0.5 text-center border-r border-slate-100 last:border-0 ${
                              isAvailable ? "bg-white" : "bg-slate-50/30"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center gap-1.5 min-h-[40px]">
                              {/* Sesi 1 */}
                              {s1.length > 0 ? (
                                <span className="text-[11px] font-bold text-slate-800">
                                  {s1[0].start_time.substring(0, 5)}
                                </span>
                              ) : s2.length === 0 ? (
                                <span className="text-slate-300 text-xs">
                                  —
                                </span>
                              ) : null}

                              {/* Sesi 2 - Menumpuk Langsung di Bawahnya */}
                              {s2.length > 0 && (
                                <span className="text-[11px] font-bold text-slate-800 ">
                                  {s2[0].start_time.substring(0, 5)}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg font-medium">
            {searchDoctor
              ? `Dokter "${searchDoctor}" tidak ditemukan`
              : "Tidak ada jadwal dokter untuk spesialisasi ini"}
          </p>
        </div>
      )}

      {/* LEGEND */}
      {filteredDoctors.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-slate-800 mb-2">
            Keterangan:
          </p>
          <ul className="text-xs text-slate-700 space-y-1">
            <li>• Jam praktek ditampilkan dalam format 24 jam (HH:mm)</li>
            <li>
              • Baris kedua menampilkan sesi praktek kedua jika tersedia pada
              hari yang sama
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
