# 🏥 Medika Lestari - Setup & Implementation Guide

## 📋 Ringkasan Perubahan

### 1. **Admin Panel Edit Dokter - Hapus Email & Telepon**

- ✅ Field email dan phone dihapus dari form
- ✅ Table hanya menampilkan: Foto, Nama, Spesialisasi, Aksi
- 📍 File: `app/admin/doctors/page.tsx`

### 2. **Section Dokter Kami - Filter Dinamis**

- ✅ Semua dokter ditampilkan di halaman awal
- ✅ Filtering hanya terjadi setelah klik tombol "Cari Dokter"
- ✅ Form reset ke default ketika tidak ada pencarian aktif
- 📍 File: `components/DoctorSection.tsx`

### 3. **Mading Section - Database Integration**

- ✅ Data hardcode diganti dari database
- ✅ Batasi 4 item untuk Edukasi dan 4 item untuk Event
- ✅ Skeleton loading ketika sedang load data
- ✅ Empty state dengan card abu-abu ketika kosong
- 📍 File: `components/MadingSection.tsx`

### 4. **Admin Panel Mading**

- ✅ Tambah/Edit/Hapus konten Edukasi & Event
- ✅ Date picker untuk Edukasi (format: "April 14, 2026")
- ✅ Upload gambar dengan preview
- ✅ Order/urutan konten
- 📍 File: `app/admin/mading/page.tsx`

### 5. **Admin Panel Hero Banner**

- ✅ Tambah/Edit/Hapus banner hero
- ✅ Upload gambar dengan preview
- ✅ Aktif/nonaktif banner
- ✅ Order/urutan banner
- 📍 File: `app/admin/hero/page.tsx`

### 6. **Hero Section - Dynamic from Database**

- ✅ Gambar hero tidak hardcode lagi
- ✅ Ambil dari database `hero_banners`
- ✅ Fallback ke hardcoded jika database kosong
- 📍 File: `components/HeroSection.tsx`

### 7. **Database & Types**

- ✅ Tambah interface: `MadingContent`, `HeroBanner`
- ✅ API functions untuk CRUD mading & hero
- 📍 File: `lib/types.ts`, `lib/api.ts`

---

## 🗄️ Setup Database Supabase

### Step 1: Jalankan SQL di Supabase Console

1. Login ke [Supabase Console](https://supabase.com/)
2. Pilih Project
3. Buka **SQL Editor** → **New Query**
4. Copy-paste isi file: `SUPABASE_COMPLETE_SETUP.sql`
5. Klik **Run** atau tekan `Ctrl+Enter`
6. Tunggu hingga selesai (tidak ada error)

### Step 2: Setup Storage Buckets via UI

Karena RLS policies storage tidak bisa diatur via SQL, setup manual:

#### Untuk bucket "doctors":

1. Buka **Storage** di Supabase Console
2. Lihat bucket "doctors" (seharusnya sudah ada dari SQL)
3. Klik bucket → **Settings**
4. Toggle **Make public** → ON
5. Klik **Save**

#### Untuk bucket "content":

1. Buka **Storage** di Supabase Console
2. Lihat bucket "content" (seharusnya sudah ada dari SQL)
3. Klik bucket → **Settings**
4. Toggle **Make public** → ON
5. Klik **Save**

### Step 3: Verify Tables & Policies

#### Check Tables:

1. Buka **Data Editor**
2. Di sidebar, pastikan ada tables:
   - `doctors`
   - `schedules`
   - `mading_content`
   - `hero_banners`

#### Check RLS Policies:

1. Buka **Authentication** → **Policies**
2. Expand setiap table
3. Verifikasi policies ada (read, insert, update, delete)

---

## 🚀 Menggunakan Admin Panel

### A. Admin Dokter

**URL:** `http://localhost:3000/admin/doctors`

**Fitur:**

- ✅ Tambah dokter: Klik "Tambah Dokter"
- ✅ Form: Foto, Nama, Spesialisasi, Biodata (TANPA email/phone)
- ✅ Edit dokter: Klik tombol edit di table
- ✅ Hapus dokter: Klik tombol hapus + confirm

**Catatan:**

- Foto required, max 5MB
- Nama & Spesialisasi required
- Biodata optional

---

### B. Admin Mading

**URL:** `http://localhost:3000/admin/mading`

**Fitur:**

#### Edukasi:

- ✅ Tambah edukasi: Klik "Tambah Konten"
- ✅ Form: Jenis (Edukasi), Gambar, Judul, Deskripsi, **Tanggal (date picker)**, Urutan
- ✅ Date picker format otomatis jadi: "April 14, 2026"
- ✅ Edit & Hapus

#### Event:

- ✅ Tambah event: Klik "Tambah Konten"
- ✅ Form: Jenis (Event), Gambar, Judul, Deskripsi, **TANPA Tanggal**, Urutan
- ✅ Edit & Hapus

**Catatan:**

- Max 4 edukasi & 4 event tampil di halaman public
- Urutan (order) menentukan posisi tampilan
- Gambar required, max 10MB

---

### C. Admin Hero Banner

**URL:** `http://localhost:3000/admin/hero`

**Fitur:**

- ✅ Tambah banner: Klik "Tambah Banner"
- ✅ Form: Gambar, Urutan, Aktif/Nonaktif
- ✅ Edit & Hapus
- ✅ Toggle aktif/nonaktif di table

**Catatan:**

- Gambar required, max 10MB
- Hanya banner dengan `is_active = true` tampil di halaman public
- Urutan menentukan rotasi di slider

---

## 🔧 Troubleshooting

### Error: "Bucket not found"

**Solusi:**

1. Pastikan SQL dari `SUPABASE_COMPLETE_SETUP.sql` sudah dijalankan
2. Refresh halaman Supabase Console
3. Cek di **Storage** apakah bucket "doctors" & "content" sudah ada
4. Jika tidak ada, buat manual:
   - Storage → Create bucket → `doctors` (PUBLIC)
   - Storage → Create bucket → `content` (PUBLIC)

### Error: "Row Level Security violation" / "new row violates row-level security policy"

**Solusi:**

1. Pastikan Anda sudah login sebagai authenticated user
2. Check RLS policies di **Authentication** → **Policies**
3. Pastikan policies menggunakan `auth.role() = 'authenticated'`
4. Jika policy masih error, drop & recreate:

```sql
-- Di SQL Editor
DROP POLICY IF EXISTS "Allow authenticated insert mading content" ON public.mading_content;
CREATE POLICY "Allow authenticated insert mading content" ON public.mading_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### Error: "Invalid date format"

**Solusi:**

1. Gunakan date picker (bukan ketik manual)
2. Format otomatis jadi: "April 14, 2026"
3. Jika error tetap, clear form & coba lagi

### Upload gambar error

**Solusi:**

1. Pastikan file berformat: JPEG, PNG, WebP, GIF
2. Pastikan file size:
   - Dokter: max 5MB
   - Mading/Hero: max 10MB
3. Pastikan bucket sudah PUBLIC (toggle di Storage settings)
4. Jika error "No such file or directory", tunggu server restart

### Halaman admin blank/tidak loading

**Solusi:**

1. Check console browser (F12 → Console)
2. Pastikan sudah login di `/admin/login`
3. Clear browser cache (Ctrl+Shift+Del)
4. Restart dev server: `npm run dev` atau `pnpm dev`

---

## 📱 Frontend Pages

### Public Pages

#### 1. Homepage (/)

- HeroSection: Gambar dari `hero_banners` table
- Dokter Kami: Semua dokter, filter setelah klik "Cari"
- Mading: Maksimal 4 edukasi + 4 event dari database

#### 2. Dokter List (/dokter)

- Tampilkan semua dokter
- Filter & search setelah klik "Cari Dokter"
- Pagination: 10 item per halaman

#### 3. Detail Dokter (/dokter/[id])

- Foto bulat
- Nama, spesialisasi, biodata
- Jadwal praktik
- Tombol "Buat Janji Temu"

---

## 📊 Database Schema

### Tables

```
doctors
├── id (uuid, primary key)
├── name (varchar)
├── specialty (varchar)
├── image_url (text)
├── bio (text)
├── phone (varchar)
├── email (varchar)
└── created_at, updated_at

schedules
├── id (uuid, primary key)
├── doctor_id (uuid, FK → doctors)
├── day_of_week (varchar)
├── start_time (time)
├── end_time (time)
├── is_available (boolean)
└── created_at, updated_at

mading_content
├── id (uuid, primary key)
├── type (varchar: 'edukasi' | 'event')
├── title (varchar)
├── description (text)
├── image_url (text)
├── date (varchar, optional)
├── order (integer)
└── created_at, updated_at

hero_banners
├── id (uuid, primary key)
├── image_url (text)
├── order (integer)
├── is_active (boolean)
└── created_at, updated_at
```

---

## 🔐 Authentication

Semua admin panel dilindungi oleh:

1. **Supabase Auth:** Email + Password login
2. **Session check:** Redirect ke `/admin/login` jika tidak authenticated
3. **RLS Policies:** Database-level access control

### Membuat Admin User:

1. Buka Supabase Console → **Authentication** → **Users**
2. Klik **Add user**
3. Input email & password
4. Klik **Create user**
5. Login di `/admin/login` dengan credential tersebut

---

## 🎯 Quick Reference

| Page            | URL              | Functions            |
| --------------- | ---------------- | -------------------- |
| Admin Dokter    | /admin/doctors   | CRUD dokter          |
| Admin Mading    | /admin/mading    | CRUD edukasi & event |
| Admin Hero      | /admin/hero      | CRUD hero banner     |
| Admin Dashboard | /admin/dashboard | Overview stats       |
| Public Dokter   | /dokter          | List & filter        |
| Detail Dokter   | /dokter/[id]     | Info lengkap         |

---

## 📝 File Structure

```
app/
├── admin/
│   ├── doctors/page.tsx       ✅ Edit dokter
│   ├── mading/page.tsx        ✅ Edit mading
│   ├── hero/page.tsx          ✅ Edit hero banner
│   ├── dashboard/page.tsx
│   └── login/page.tsx
├── dokter/
│   ├── page.tsx               ✅ List dokter
│   └── [id]/page.tsx
└── page.tsx                   ✅ Homepage

components/
├── HeroSection.tsx            ✅ Dynamic from DB
├── DoctorSection.tsx          ✅ Filter logic
├── MadingSection.tsx          ✅ Dynamic from DB
├── AdminNavbar.tsx
└── ...

lib/
├── api.ts                     ✅ CRUD functions
├── types.ts                   ✅ Interfaces
├── supabase.ts
└── ...
```

---

## ✨ Status Implementasi

- ✅ Admin Panel - Hapus Email/Phone Dokter
- ✅ Doctor Section - Filter setelah klik tombol
- ✅ Mading Section - Database integration
- ✅ Admin Mading - Full CRUD + Date picker
- ✅ Admin Hero Banner - Full CRUD
- ✅ Hero Section - Dynamic from database
- ✅ Skeleton loading di semua section
- ✅ RLS Policies untuk semua tables
- ✅ Storage buckets setup

---

## 🆘 Support

Jika ada error atau pertanyaan:

1. Check **Browser Console** (F12 → Console)
2. Check **Server Logs** (terminal dev server)
3. Check **Supabase Logs** (Supabase Console → Logs)
4. Lihat **TROUBLESHOOTING** section di atas

---

**Last Updated:** April 12, 2026
**Version:** 1.0
