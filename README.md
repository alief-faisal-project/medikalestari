# RS Medika Lestari - Admin Panel & Doctor Management System

Sistem manajemen dokter dan jadwal untuk Rumah Sakit Medika Lestari dengan admin panel lengkap dan integrasi Supabase.

## ✨ Fitur Utama

- 📋 **Admin Panel** - Dashboard untuk mengelola dokter dan jadwal
- 👨‍⚕️ **Manajemen Dokter** - CRUD dokter dengan upload foto
- 📅 **Jadwal Dokter** - Kelola jadwal kerja dokter
- 🔍 **Search & Filter** - Cari dokter berdasarkan nama atau spesialisasi
- 🔐 **Authentication** - Login admin dengan Supabase Auth
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Modern UI** - Menggunakan Tailwind CSS dan Framer Motion

## 🛠️ Teknologi yang Digunakan

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasi
- **Supabase** - Backend & Database
- **Lucide React** - Icons

## 📦 Instalasi & Setup

### 1. Install Dependencies

```bash
npm install
# atau
pnpm install
```

### 2. Setup Supabase

#### a. Create Supabase Project

1. Buka https://supabase.com
2. Sign up/login
3. Create new project
4. Tunggu project siap

#### b. Copy Environment Variables

1. Di Supabase dashboard, pergi ke **Settings > API**
2. Copy `Project URL` dan `Anon Key`
3. Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### c. Run SQL Migrations

1. Buka SQL Editor di Supabase dashboard
2. Copy isi dari `SQL_MIGRATIONS.sql`
3. Jalankan semua query

Queries yang akan dibuat:

- `doctors` table - Data dokter
- `schedules` table - Jadwal dokter
- `admin_users` table - User admin
- Storage bucket `doctors` - Penyimpanan foto

#### d. Setup Authentication

1. Di Supabase, pergi ke **Authentication > Providers**
2. Pastikan **Email** provider aktif
3. Pergi ke **Users** dan buat user baru:
   - Email: `admin@medika.com`
   - Password: `admin123456`

## 🚀 Menjalankan Aplikasi

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Akses aplikasi di `http://localhost:3000`

## 📍 Routes/Pages

### Publik

- `/` - Homepage dengan Hero Section
- `/dokter` - Halaman daftar dokter dengan search & filter

### Admin (Protected)

- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard dengan statistik
- `/admin/doctors` - Kelola dokter (CRUD)
- `/admin/schedules` - Kelola jadwal dokter (CRUD)

## 🔑 Admin Login

**Default Credentials:**

- Email: `admin@medika.com`
- Password: `admin123456`

⚠️ **Ganti password setelah login pertama!**

## 📊 Database Schema

### Doctors Table

```sql
- id: UUID (Primary Key)
- name: String
- specialty: String
- image_url: String (URL ke foto)
- experience_years: Integer
- bio: String (Deskripsi singkat)
- phone: String
- email: String
- created_at: Timestamp
```

### Schedules Table

```sql
- id: UUID (Primary Key)
- doctor_id: UUID (Foreign Key → doctors)
- day_of_week: String (Senin, Selasa, etc.)
- start_time: Time (Format HH:mm)
- end_time: Time (Format HH:mm)
- is_available: Boolean
- created_at: Timestamp
```

### Admin Users Table

```sql
- id: UUID (Primary Key)
- email: String (Unique)
- password_hash: String (Managed by Supabase Auth)
- role: String
- created_at: Timestamp
```

## 🎨 Fitur UI/UX

### Doctor Section

- ✅ Filter by specialty
- ✅ Search by doctor name (real-time)
- ✅ Display doctor information (photo, bio, experience, contact)
- ✅ Call & email buttons
- ✅ Appointment & schedule buttons
- ✅ Loading states dengan spinner
- ✅ Empty state messaging

### Admin Panel

- ✅ Dashboard dengan statistik
- ✅ Doctor management dengan modal form
- ✅ Photo upload dengan preview
- ✅ Schedule management
- ✅ Active navigation indicators
- ✅ Mobile responsive menu
- ✅ Logout functionality

## 📤 Upload Foto Dokter

Di admin panel, foto dokter bisa diupload dengan:

- Format: JPG, PNG, WebP
- Max size: 5MB (bisa diatur di kode)
- Storage: Supabase Storage bucket `doctors`
- Public access enabled

## 🔒 Security Features

- 🔐 Row Level Security (RLS) di Supabase
- 🔐 Authenticated uploads hanya untuk admin
- 🔐 Public read untuk doctors & schedules
- 🔐 Protected routes di admin panel
- 🔐 Session management dengan Supabase Auth

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

### Error: "Missing Supabase environment variables"

- Pastikan `.env.local` sudah dibuat
- Restart dev server: `npm run dev`

### Error: "Authentication failed"

- Pastikan user admin sudah dibuat di Supabase
- Email: `admin@medika.com`
- Password: `admin123456`

### Error: "Cannot upload photo"

- Pastikan storage bucket `doctors` sudah dibuat
- Check Supabase RLS policies

## 📝 API Functions

### Doctor Functions (`lib/api.ts`)

```typescript
// Fetch semua dokter dengan optional filter
fetchDoctors(specialty?: string, searchName?: string): Promise<Doctor[]>

// Get dokter by ID
fetchDoctorById(id: string): Promise<Doctor | null>

// Buat dokter baru
createDoctor(doctor: DoctorData): Promise<Doctor>

// Update dokter
updateDoctor(id: string, doctor: DoctorData): Promise<Doctor>

// Delete dokter
deleteDoctor(id: string): Promise<void>

// Upload foto dokter
uploadDoctorImage(file: File): Promise<string>
```

### Schedule Functions

```typescript
// Fetch jadwal by doctor ID
fetchSchedulesByDoctor(doctorId: string): Promise<Schedule[]>

// Buat jadwal baru
createSchedule(schedule: ScheduleData): Promise<Schedule>

// Update jadwal
updateSchedule(id: string, schedule: ScheduleData): Promise<Schedule>

// Delete jadwal
deleteSchedule(id: string): Promise<void>
```

## 🎯 Next Steps / Enhancement

- [ ] Appointment/booking system
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Payment integration
- [ ] Patient dashboard
- [ ] Doctor availability real-time sync
- [ ] Multi-language support
- [ ] Analytics & reporting

## 📧 Support

Untuk issues atau questions, silakan hubungi tim development.

## 📄 License

Private project untuk RS Medika Lestari.

---

**Last Updated:** April 2026
