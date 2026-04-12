export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image_url: string;
  experience_years?: number;
  bio: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  doctor_id: string;
  day_of_week: string; // Senin, Selasa, etc.
  start_time: string; // HH:mm format
  end_time: string; // HH:mm format
  is_available: boolean;
  created_at: string;
}

export interface DaySchedule {
  day: string;
  dayOfWeek: string;
  schedules: Array<{
    startTime: string;
    endTime: string;
  }>;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface MadingContent {
  id: string;
  type: "edukasi" | "event"; // edukasi or event
  title: string;
  description: string;
  image_url: string;
  date?: string;
  order: number;
  created_at: string;
}

export interface HeroBanner {
  id: string;
  image_url: string;
  order: number;
  is_active: boolean;
  created_at: string;
}
