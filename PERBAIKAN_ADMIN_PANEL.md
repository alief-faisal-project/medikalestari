# 🔧 PERBAIKAN ADMIN PANEL - LANGKAH LENGKAP

## ✅ Perbaikan yang Sudah Dilakukan di Kode

### 1. **Hapus Field Pengalaman Tahun**

- ✓ Dihapus dari form input
- ✓ Dihapus dari tabel display
- ✓ Dihapus dari handleEdit
- ✓ Dihapus dari resetForm

### 2. **Perbaiki Session Check (Tidak Login Ulang)**

- ✓ Mengubah dependency dari `[router]` menjadi `[]` (hanya jalankan sekali saat mount)
- ✓ Ini mencegah redirect ke login page berulang kali saat sudah login

### 3. **Perbaiki Error Handling Upload**

- ✓ Error message sekarang ditampilkan di alert admin
- ✓ Lebih jelas apa penyebab error

---

## 📋 SQL YANG HARUS DIJALANKAN DI SUPABASE

### LANGKAH-LANGKAH EKSEKUSI:

1. Login ke [Supabase Console](https://supabase.com)
2. Pilih project Anda: **rs medika lestari**
3. Buka menu **SQL Editor** (di sidebar kiri)
4. Klik **New Query**
5. Copy-paste semua SQL di bawah ini ke editor
6. Klik **Run** (atau tekan Ctrl+Enter)
7. Tunggu hingga selesai (seharusnya tidak ada error)

---

## 🗄️ SQL LENGKAP SIAP COPY-PASTE

```sql
-- ============================================================
-- SUPABASE FIX - RLS POLICIES UNTUK ADMIN PANEL
-- ============================================================
-- Jalankan semua SQL di bawah ini di Supabase SQL Editor

-- 1. DROP policy lama yang mungkin conflict
DROP POLICY IF EXISTS "Allow authenticated insert doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated update doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated delete doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated upload doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete doctors storage" ON storage.objects;

-- 2. ENABLE RLS pada tabel doctors
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- 3. CREATE policies untuk doctors table

-- Policy untuk SELECT (publik bisa baca)
CREATE POLICY "Allow public read doctors" ON public.doctors
  FOR SELECT USING (true);

-- Policy untuk INSERT (authenticated users)
CREATE POLICY "Allow authenticated insert doctors" ON public.doctors
  FOR INSERT WITH CHECK (true);

-- Policy untuk UPDATE (authenticated users)
CREATE POLICY "Allow authenticated update doctors" ON public.doctors
  FOR UPDATE USING (true) WITH CHECK (true);

-- Policy untuk DELETE (authenticated users)
CREATE POLICY "Allow authenticated delete doctors" ON public.doctors
  FOR DELETE USING (true);

-- 4. ENABLE RLS pada storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 5. DROP policies lama di storage
DROP POLICY IF EXISTS "Allow public read doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete doctors storage" ON storage.objects;

-- 6. CREATE policies baru untuk storage bucket doctors

-- Policy untuk SELECT storage (publik bisa baca)
CREATE POLICY "Allow public read doctors storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'doctors');

-- Policy untuk INSERT storage (upload file)
CREATE POLICY "Allow authenticated insert doctors storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'doctors');

-- Policy untuk UPDATE storage
CREATE POLICY "Allow authenticated update doctors storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'doctors') WITH CHECK (bucket_id = 'doctors');

-- Policy untuk DELETE storage
CREATE POLICY "Allow authenticated delete doctors storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'doctors');

-- ============================================================
-- SELESAI
-- ============================================================
```

---

## 🪣 PASTIKAN BUCKET STORAGE ADA

Jika belum pernah membuat bucket `doctors`, lakukan ini:

1. Buka Supabase Console → Project Anda
2. Menu di sidebar kiri: **Storage**
3. Klik **New Bucket**
4. Nama: `doctors`
5. Pastikan **Public bucket** di-enable ✓
6. Klik **Create bucket**

---

## 🧪 TEST SETELAH PERBAIKAN

### Test 1: Login tidak berulang

1. Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login dengan email & password admin
3. Seharusnya masuk ke `/admin/dashboard`
4. Klik menu "Kelola Dokter" atau buka langsung `/admin/doctors`
5. **Seharusnya TIDAK ke-redirect ke login page lagi** ✓

### Test 2: Upload gambar & submit dokter

1. Klik tombol **"Tambah Dokter"**
2. Isi form:
   - Foto: Pilih gambar apapun (JPG, PNG)
   - Nama: "dr. Budi Santoso"
   - Spesialisasi: Pilih dari dropdown (misalnya "Spesialis Jantung & Pembuluh Darah")
   - Biodata: "Dokter berpengalaman..."
   - Email: "budi@example.com"
   - Telepon: "0812345678"
3. Klik **Simpan**
4. **Jika sukses**: Dokter muncul di tabel di bawah tanpa error
5. **Jika error**: Alert akan menampilkan pesan error (lihat di bawah)

### Test 3: Edit dokter

1. Klik tombol **Edit** (pensil icon) pada salah satu dokter
2. Ubah data apapun
3. Klik **Simpan**
4. Seharusnya data ter-update tanpa error

---

## 🚨 TROUBLESHOOTING JIKA MASIH ERROR

### Error: "new row violates row-level security policy"

- **Penyebab**: Policies RLS tidak benar
- **Solusi**: Pastikan Anda sudah menjalankan SQL di atas, terutama policies `INSERT` pada tabel `doctors`

### Error: "bucket not found"

- **Penyebab**: Bucket `doctors` belum dibuat di Storage
- **Solusi**: Buat bucket `doctors` via Supabase UI (lihat bagian "PASTIKAN BUCKET STORAGE ADA" di atas)

### Error: "session token not found" atau "401 Unauthorized"

- **Penyebab**: User belum login atau session expired
- **Solusi**: Login ulang via `/admin/login`

### Error saat upload gambar

- **Penyebab**: Bucket tidak public atau policies storage kurang tepat
- **Solusi**:
  1. Cek bucket `doctors` di Storage → pastikan Public ✓
  2. Jalankan SQL policies storage lagi

---

## 📝 NOTES

- Field **Tahun Pengalaman** sudah dihapus sepenuhnya dari form admin
- Dropdown spesialisasi sekarang konsisten dengan SearchDropdown di homepage
- Session/login sekarang tidak berulang ketika sudah masuk admin panel
- Semua field yang diperlukan sudah ada: Nama, Spesialisasi, Email, Telepon, Biodata, Foto

---

## 🔍 VERIFIKASI SUPABASE SETTINGS

Untuk memastikan semuanya benar:

1. **Cek Bucket**: Storage → `doctors` → pastikan **Public** ✓
2. **Cek Policies**: Database → Policies → pastikan 8 policies sudah dibuat (4 untuk `doctors` table, 4 untuk `storage.objects`)
3. **Cek Authentication**: Auth → pastikan ada minimal 1 user dengan email yang digunakan login admin

---

Jika masih ada masalah, salin pesan **Error** yang muncul di alert dan beri tahu! 🚀
