import { supabase } from "./supabase";
import { Doctor, Schedule } from "./types";

// DOCTOR OPERATIONS
export async function fetchDoctors(
  specialty?: string,
  searchName?: string,
): Promise<Doctor[]> {
  let query = supabase.from("doctors").select("*");

  if (specialty && specialty !== "Semua Spesialis") {
    query = query.eq("specialty", specialty);
  }

  if (searchName) {
    query = query.ilike("name", `%${searchName}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }

  return data || [];
}

export async function fetchDoctorById(id: string): Promise<Doctor | null> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching doctor:", error);
    return null;
  }

  return data;
}

export async function createDoctor(doctor: Omit<Doctor, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("doctors")
    .insert([doctor])
    .select();

  if (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }

  return data[0];
}

export async function updateDoctor(
  id: string,
  doctor: Partial<Omit<Doctor, "id" | "created_at">>,
) {
  const { data, error } = await supabase
    .from("doctors")
    .update(doctor)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }

  return data[0];
}

export async function deleteDoctor(id: string) {
  const { error } = await supabase.from("doctors").delete().eq("id", id);

  if (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
}

// SCHEDULE OPERATIONS
export async function fetchSchedulesByDoctor(
  doctorId: string,
): Promise<Schedule[]> {
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("doctor_id", doctorId);

  if (error) {
    console.error("Error fetching schedules:", error);
    return [];
  }

  return data || [];
}

export async function createSchedule(
  schedule: Omit<Schedule, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("schedules")
    .insert([schedule])
    .select();

  if (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }

  return data[0];
}

export async function updateSchedule(
  id: string,
  schedule: Partial<Omit<Schedule, "id" | "created_at">>,
) {
  const { data, error } = await supabase
    .from("schedules")
    .update(schedule)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }

  return data[0];
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase.from("schedules").delete().eq("id", id);

  if (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
}

// UPLOAD IMAGE
export async function uploadDoctorImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `doctor-images/${fileName}`;

  try {
  const { error: uploadError } = await supabase.storage
      .from("doctors")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw new Error(uploadError.message || "Upload error");
    }

      // getPublicUrl returns { data: { publicUrl: string } }
    interface GetPublicUrlResponse {
      data?: {
        publicUrl?: string;
        public_url?: string;
      };
      publicUrl?: string;
      public_url?: string;
    }
    const publicData = (await supabase.storage.from("doctors").getPublicUrl(filePath)) as GetPublicUrlResponse;
    const publicUrl = publicData?.data?.publicUrl || publicData?.data?.public_url || publicData?.publicUrl || publicData?.public_url;
      if (!publicUrl) {
        console.error("Public URL missing", publicData);
        throw new Error("Public URL not available. Check bucket permissions and that the bucket exists.");
      }

      return publicUrl;
  } catch (err) {
    // normalize error
    const message = (err && (err as Error).message) || String(err) || "Unknown upload error";
      throw message;
  }
}
