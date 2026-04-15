import { supabase } from "./supabase";
import { Doctor, Schedule, MadingContent, HeroBanner } from "./types";

// API Gateway Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Helper function untuk retry fetch
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 3,
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`[Attempt ${i + 1}/${retries}] Fetching ${url}`);

      // Create abort controller dengan timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${i + 1} failed:`, lastError.message);

      if (i < retries - 1) {
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw lastError || new Error("Fetch failed after retries");
}

// DOCTOR OPERATIONS
export async function fetchDoctors(
  specialty?: string,
  searchName?: string,
): Promise<Doctor[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/doctors`);
    const { data } = await response.json();

    let doctors = data || [];

    if (specialty && specialty !== "Semua Spesialis") {
      doctors = doctors.filter((d: Doctor) => d.specialty === specialty);
    }

    if (searchName) {
      doctors = doctors.filter((d: Doctor) =>
        d.name.toLowerCase().includes(searchName.toLowerCase()),
      );
    }

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors from API Gateway:", error);
    console.log("Falling back to Supabase...");

    // Fallback to Supabase
    let query = supabase.from("doctors").select("*");

    if (specialty && specialty !== "Semua Spesialis") {
      query = query.eq("specialty", specialty);
    }

    if (searchName) {
      query = query.ilike("name", `%${searchName}%`);
    }

    const { data, error: supabaseError } = await query;

    if (supabaseError) {
      console.error("Error fetching doctors from Supabase:", supabaseError);
      return [];
    }

    return data || [];
  }
}

export async function fetchDoctorById(id: string): Promise<Doctor | null> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/doctors/${id}`);
    const { data } = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching doctor from API Gateway:", error);
    console.log("Falling back to Supabase...");

    // Fallback to Supabase
    const { data, error: supabaseError } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    if (supabaseError) {
      console.error("Error fetching doctor from Supabase:", supabaseError);
      return null;
    }

    return data;
  }
}

export async function createDoctor(doctor: Omit<Doctor, "id" | "created_at">) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    // Fallback to Supabase
    const { data, error: supabaseError } = await supabase
      .from("doctors")
      .insert([doctor])
      .select();

    if (supabaseError) {
      console.error("Error creating doctor in Supabase:", supabaseError);
      throw supabaseError;
    }

    return data[0];
  }
}

export async function updateDoctor(
  id: string,
  doctor: Partial<Omit<Doctor, "id" | "created_at">>,
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    // Fallback to Supabase
    const { data, error: supabaseError } = await supabase
      .from("doctors")
      .update(doctor)
      .eq("id", id)
      .select();

    if (supabaseError) {
      console.error("Error updating doctor in Supabase:", supabaseError);
      throw supabaseError;
    }

    return data[0];
  }
}

export async function deleteDoctor(id: string) {
  try {
    await fetch(`${API_BASE_URL}/api/doctors/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    // Fallback to Supabase
    const { error: supabaseError } = await supabase
      .from("doctors")
      .delete()
      .eq("id", id);

    if (supabaseError) {
      console.error("Error deleting doctor from Supabase:", supabaseError);
      throw supabaseError;
    }
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
