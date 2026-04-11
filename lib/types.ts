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
  day_of_week: string; // Monday, Tuesday, etc.
  start_time: string; // HH:mm format
  end_time: string; // HH:mm format
  is_available: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}
