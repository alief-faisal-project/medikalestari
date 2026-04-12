# 📚 Dokumentasi Setup Lengkap - RS Medika Lestari

## 🎯 Ringkasan Perubahan

Berikut adalah ringkasan semua perubahan yang telah dilakukan untuk mengintegrasikan Supabase dengan fitur admin panel yang lengkap:

---

## 📋 Daftar Fitur Baru

### 1. **Edit Dokter - Hapus Email & Telepon dari Form**

- ✅ Email dan telepon tidak perlu diinput saat menambah/edit dokter
- ✅ Field hanya untuk: Nama, Spesialisasi, Biodata, Foto
- ✅ Email & Telepon tetap tersimpan di database tapi tidak di-display di table

**File yang diubah:**

- `app/admin/doctors/page.tsx` - Hapus form input email & phone
- `lib/api.ts` - Tidak ada perubahan (tetap support email & phone)

---

### 2. **Filter Dokter di Section Dokter Kami**

- ✅ Semua dokter ditampilkan di awal (tanpa filter)
- ✅ Filtering hanya berfungsi setelah user klik button "Cari Dokter"
- ✅ Ketika tidak ada hasil filter, tampil pesan "Tidak ada dokter sesuai kriteria"

**File yang diubah:**

- `components/DoctorSection.tsx` - Update state management untuk filter

---

### 3. **Mading & Event - Ambil dari Database**

- ✅ Struktur layout tetap sama, hanya dinamis dari database
- ✅ Jika kosong, tampil card abu-abu dengan tulisan "Kosong"
- ✅ Batasi maksimal 4 item untuk Edukasi dan 4 untuk Event
- ✅ Admin panel untuk kelola Mading dengan date picker

**File yang diubah:**

- `components/MadingSection.tsx` - Fetch data dari database
- `app/admin/mading/page.tsx` - Panel admin dengan date picker
- `lib/api.ts` - Add Mading CRUD functions
- `lib/types.ts` - Add MadingContent interface

---

### 4. **Hero Banner - Dinamis dari Database**

- ✅ Hero banner bukan hardcode lagi
- ✅ Admin bisa tambah/edit/hapus banner
- ✅ Fallback ke hardcoded jika database kosong
- ✅ Admin panel untuk kelola Hero Banner

**File yang diubah:**

- `components/HeroSection.tsx` - Fetch dari database
- `app/admin/hero/page.tsx` - Panel admin
- `lib/api.ts` - Add Hero Banner CRUD functions
- `lib/types.ts` - Add HeroBanner interface

---

### 5. **Skeleton Loading di Semua Tempat**

- ✅ Ganti semua loading text dengan skeleton
- ✅ Doctor Section skeleton
- ✅ Mading & Event skeleton
- ✅ Hero Banner skeleton

**File yang diubah:**

- `components/DoctorSection.tsx` - Add DoctorSkeleton
- `components/MadingSection.tsx` - Add card skeleton
- `components/HeroSection.tsx` - Add loading state

---

### 6. **Admin Panel UI Improvements**

- ✅ Modal tidak lagi terpotong (overflow-y-auto pada container parent)
- ✅ Background tetap putih (tidak hitam) saat form dibuka
- ✅ Date picker yang proper untuk input tanggal
- ✅ Form layout lebih clean dan rapi

**File yang diubah:**

- `app/admin/mading/page.tsx` - Improve modal
- `app/admin/hero/page.tsx` - Improve modal

---

## 🗄️ Database Setup

### Tabel yang Dibuat/Diupdate

#### 1. `doctors`

```sql
- id: uuid (primary key)
- name: varchar(255)
- specialty: varchar(255)
- image_url: text
- bio: text
- phone: varchar(20)
- email: varchar(255)
- experience_years: integer
- created_at: timestamp
- updated_at: timestamp
```

#### 2. `schedules`

```sql
- id: uuid (primary key)
- doctor_id: uuid (FK to doctors)
- day_of_week: varchar(50)
- start_time: time
- end_time: time
- is_available: boolean
- created_at: timestamp
- updated_at: timestamp
```

#### 3. `mading_content` ⭐ BARU

```sql
- id: uuid (primary key)
- type: varchar(50) CHECK ('edukasi' OR 'event')
- title: varchar(255)
- description: text
- image_url: text
- date: varchar(50) -- Hanya untuk edukasi
- order: integer -- Untuk sorting
- created_at: timestamp
- updated_at: timestamp
```

#### 4. `hero_banners` ⭐ BARU

```sql
- id: uuid (primary key)
- image_url: text
- order: integer -- Untuk sorting
- is_active: boolean
- created_at: timestamp
- updated_at: timestamp
```

### Storage Buckets

#### 1. `doctors`

- Public: true
- Max file size: 5MB
- MIME types: image/jpeg, image/png, image/webp, image/gif

#### 2. `content` ⭐ BARU

- Public: true
- Max file size: 10MB
- MIME types: image/jpeg, image/png, image/webp, image/gif

---

## 🔐 RLS (Row-Level Security) Policies

### Semua tabel (doctors, schedules, mading_content, hero_banners):

```sql
-- SELECT (Public Read)
CREATE POLICY "Allow public read [table]"
  FOR SELECT USING (true);

-- INSERT (Authenticated)
CREATE POLICY "Allow authenticated insert [table]"
  FOR INSERT WITH CHECK (true);

-- UPDATE (Authenticated)
CREATE POLICY "Allow authenticated update [table]"
  FOR UPDATE USING (true) WITH CHECK (true);

-- DELETE (Authenticated)
CREATE POLICY "Allow authenticated delete [table]"
  FOR DELETE USING (true);
```

---

## 🚀 Langkah-Langkah Setup

### A. Setup Supabase Database

1. **Buka Supabase Console**
   - Login ke https://supabase.com
   - Pilih project Anda

2. **Jalankan SQL**
   - Buka `SQL Editor`
   - Buat query baru
   - Copy-paste isi file `SUPABASE_COMPLETE_SETUP.sql`
   - Klik `Run`

3. **Setup Storage Buckets via UI**
   - Buka `Storage` menu
   - Jika bucket `doctors` belum ada, buat baru
   - Jika bucket `content` belum ada, buat baru
   - Set kedua bucket menjadi `PUBLIC` (Edit bucket → Make public)

4. **Verifikasi**
   - Buka `Data Editor` → cek tabel `mading_content` dan `hero_banners` sudah ada
   - Buka `Storage` → cek bucket `doctors` dan `content` ada

### B. Update TypeScript Types

Types sudah update di `lib/types.ts`:

```typescript
export interface MadingContent { ... }
export interface HeroBanner { ... }
```

### C. Update API Functions

API functions sudah ditambah di `lib/api.ts`:

```typescript
// Mading
export async function fetchMadingContent();
export async function createMadingContent();
export async function updateMadingContent();
export async function deleteMadingContent();

// Hero
export async function fetchHeroBanners();
export async function createHeroBanner();
export async function updateHeroBanner();
export async function deleteHeroBanner();

// Upload
export async function uploadContentImage();
```

### D. Update Components

Components sudah update untuk fetch dari database:

- ✅ `components/HeroSection.tsx`
- ✅ `components/MadingSection.tsx`
- ✅ `components/DoctorSection.tsx`

### E. Admin Panels Sudah Tersedia

- ✅ `app/admin/doctors/page.tsx` - Kelola Dokter (updated)
- ✅ `app/admin/mading/page.tsx` - Kelola Mading ⭐ BARU
- ✅ `app/admin/hero/page.tsx` - Kelola Hero ⭐ BARU

---

## 🐛 Troubleshooting

### Error: "Bucket not found"

**Solusi:**

1. Buka Supabase Console → Storage
2. Buat bucket baru dengan nama `content` (jika belum ada)
3. Set bucket menjadi PUBLIC
4. Refresh admin page

### Error: "new row violates row-level security policy"

**Solusi:**

1. Pastikan SQL dari `SUPABASE_COMPLETE_SETUP.sql` sudah dijalankan
2. Verifikasi RLS policies di `Authentication → Policies`
3. Pastikan policies menggunakan `CHECK (true)` untuk INSERT
4. Logout dan login kembali ke admin panel

### Error: "invalid date" saat menambah Mading

**Solusi:**

1. Gunakan date picker (tekan field tanggal)
2. Jangan ketik manual
3. Format otomatis jadi "Bulan Tanggal, Tahun" (e.g., "April 12, 2026")

### Modal terpotong atau background hitam

**Solusi:**

1. Pastikan sudah update ke versi terbaru dari `app/admin/mading/page.tsx`
2. Pastikan modal punya `overflow-y-auto` di container parent
3. Clear browser cache (Ctrl+Shift+Delete)

### Upload gambar gagal

**Solusi:**

1. Pastikan bucket menjadi PUBLIC (bukan private)
2. Pastikan ukuran file < 10MB untuk `content` bucket
3. Format gambar: JPG, PNG, WebP, GIF
4. Check internet connection

---

## 📝 Contoh Penggunaan Admin Panel

### Menambah Mading Edukasi

1. Buka `/admin/mading`
2. Klik "Tambah Konten"
3. Pilih Jenis: "Edukasi"
4. Upload Gambar
5. Isi Judul
6. Isi Deskripsi
7. Pilih Tanggal (pakai date picker)
8. Atur Urutan
9. Klik "Tambah Konten"

### Menambah Hero Banner

1. Buka `/admin/hero`
2. Klik "Tambah Banner"
3. Upload Gambar Banner
4. Atur Urutan Tampilan
5. Centang "Aktif" (opsional)
6. Klik "Tambah Banner"

### Edit/Hapus

1. Lihat tabel
2. Klik icon Edit (pensil) atau Delete (tempat sampah)

---

## 🔄 API Integration

### Fetch Mading dari Frontend

```typescript
import { fetchMadingContent } from "@/lib/api";

const edukasi = await fetchMadingContent("edukasi"); // Max 4 items
const events = await fetchMadingContent("event"); // Max 4 items
```

### Fetch Hero Banner dari Frontend

```typescript
import { fetchHeroBanners } from "@/lib/api";

const banners = await fetchHeroBanners();
// Gunakan hanya yang is_active = true
```

### Upload Gambar

```typescript
import { uploadContentImage } from "@/lib/api";

const imageUrl = await uploadContentImage(file, "mading"); // atau "hero"
```

---

## ✅ Checklist Setup

- [ ] Copy file `SUPABASE_COMPLETE_SETUP.sql`
- [ ] Login ke Supabase Console
- [ ] Jalankan SQL di SQL Editor
- [ ] Verifikasi tabel di Data Editor
- [ ] Setup bucket `doctors` (PUBLIC)
- [ ] Setup bucket `content` (PUBLIC)
- [ ] Cek Admin Panel `/admin/mading`
- [ ] Cek Admin Panel `/admin/hero`
- [ ] Test tambah Mading Edukasi
- [ ] Test tambah Mading Event
- [ ] Test tambah Hero Banner
- [ ] Verifikasi di halaman utama

---

## 📞 Support

Jika masih ada error:

1. Cek console browser (F12 → Console tab)
2. Cek error message di Supabase
3. Baca troubleshooting section di atas
4. Cek file `.env.local` sudah punya SUPABASE_URL dan SUPABASE_ANON_KEY

---

## 🎉 Selesai!

Semua fitur sudah siap digunakan. Admin panel bisa akses:

- `/admin/doctors` - Kelola Dokter ✅
- `/admin/mading` - Kelola Mading & Event ✅
- `/admin/hero` - Kelola Hero Banner ✅
- `/admin/schedules` - Kelola Jadwal Dokter
- `/admin/dashboard` - Dashboard

Happy coding! 🚀
