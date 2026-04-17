import { supabase } from "./supabase";
import { Doctor, Schedule, MadingContent, HeroBanner } from "./types";

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

export async function fetchDoctorsBySpecialty(
  specialty: string,
): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("specialty", specialty);

  if (error) {
    console.error("Error fetching doctors by specialty:", error);
    return [];
  }

  return data || [];
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
    const publicData = (await supabase.storage
      .from("doctors")
      .getPublicUrl(filePath)) as GetPublicUrlResponse;
    const publicUrl =
      publicData?.data?.publicUrl ||
      publicData?.data?.public_url ||
      publicData?.publicUrl ||
      publicData?.public_url;
    if (!publicUrl) {
      console.error("Public URL missing", publicData);
      throw new Error(
        "Public URL not available. Check bucket permissions and that the bucket exists.",
      );
    }

    return publicUrl;
  } catch (err) {
    // normalize error
    const message =
      (err && (err as Error).message) || String(err) || "Unknown upload error";
    throw message;
  }
}

// MADING OPERATIONS
export async function fetchMadingContent(
  type?: "edukasi" | "event",
): Promise<MadingContent[]> {
  let query = supabase
    .from("mading_content")
    .select("*")
    .order("order", { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching mading content:", error);
    return [];
  }

  return data || [];
}

export async function createMadingContent(
  content: Omit<MadingContent, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("mading_content")
    .insert([content])
    .select();

  if (error) {
    console.error("Error creating mading content:", error);
    throw error;
  }

  return data[0];
}

export async function updateMadingContent(
  id: string,
  content: Partial<Omit<MadingContent, "id" | "created_at">>,
) {
  const { data, error } = await supabase
    .from("mading_content")
    .update(content)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating mading content:", error);
    throw error;
  }

  return data[0];
}

export async function deleteMadingContent(id: string) {
  const { error } = await supabase.from("mading_content").delete().eq("id", id);

  if (error) {
    console.error("Error deleting mading content:", error);
    throw error;
  }
}

// HERO BANNER OPERATIONS
export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  const { data, error } = await supabase
    .from("hero_banners")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching hero banners:", error);
    return [];
  }

  return data || [];
}

export async function createHeroBanner(
  banner: Omit<HeroBanner, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("hero_banners")
    .insert([banner])
    .select();

  if (error) {
    console.error("Error creating hero banner:", error);
    throw error;
  }

  return data[0];
}

export async function updateHeroBanner(
  id: string,
  banner: Partial<Omit<HeroBanner, "id" | "created_at">>,
) {
  const { data, error } = await supabase
    .from("hero_banners")
    .update(banner)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating hero banner:", error);
    throw error;
  }

  return data[0];
}

export async function deleteHeroBanner(id: string) {
  const { error } = await supabase.from("hero_banners").delete().eq("id", id);

  if (error) {
    console.error("Error deleting hero banner:", error);
    throw error;
  }
}

// UPLOAD IMAGE (generic for mading/hero)
export async function uploadContentImage(
  file: File,
  folder: string = "content",
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("content")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw new Error(uploadError.message || "Upload error");
    }

    interface GetPublicUrlResponse {
      data?: {
        publicUrl?: string;
        public_url?: string;
      };
      publicUrl?: string;
      public_url?: string;
    }
    const publicData = (await supabase.storage
      .from("content")
      .getPublicUrl(filePath)) as GetPublicUrlResponse;
    const publicUrl =
      publicData?.data?.publicUrl ||
      publicData?.data?.public_url ||
      publicData?.publicUrl ||
      publicData?.public_url;

    if (!publicUrl) {
      console.error("Public URL missing", publicData);
      throw new Error(
        "Public URL not available. Check bucket permissions and that the bucket exists.",
      );
    }

    return publicUrl;
  } catch (err) {
    const message =
      (err && (err as Error).message) || String(err) || "Unknown upload error";
    throw message;
  }
}
