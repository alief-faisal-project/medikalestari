// Doctor Types
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  image?: string;
  phone?: string;
  email?: string;
}

export interface DoctorResponse {
  data: Doctor[];
  total: number;
}

// Service Types
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  price?: number;
}

export interface ServiceResponse {
  data: ServiceItem[];
  total: number;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

// API Response Wrapper
export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}
