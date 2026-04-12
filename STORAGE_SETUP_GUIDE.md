# PANDUAN SETUP STORAGE BUCKET DI SUPABASE

## ⚠️ PENTING: Error "must be owner of table objects"

Error ini terjadi karena kita tidak bisa memodifikasi `storage.objects` table langsung via SQL. Supabase membatasi akses ini untuk keamanan.

**Solusi: Setup storage bucket policies via UI Supabase Console**

---

## LANGKAH-LANGKAH SETUP STORAGE BUCKET

### 1. Buka Supabase Console

- Login ke [supabase.com](https://supabase.com)
- Pilih project Anda (RS Medika Lestari)
- Klik **Storage** di sidebar kiri

### 2. Buat/Konfigurasi Bucket "doctors"

#### a. Jika bucket sudah ada:

1. Klik bucket **doctors**
2. Klik tombol **Settings** (icon gear/roda gigi)
3. Pastikan **Make this bucket public** sudah di-check ✓
4. Klik **Save**

#### b. Jika bucket belum ada:

1. Klik tombol **Create a new bucket**
2. Nama: `doctors`
3. Pilih **Public bucket** ✓
4. Klik **Create bucket**

### 3. Buat/Konfigurasi Bucket "content"

Ulangi langkah yang sama seperti bucket "doctors":

1. Klik **Create a new bucket** (jika belum ada)
2. Nama: `content`
3. Pilih **Public bucket** ✓
4. Klik **Create bucket**

### 4. Verifikasi Setup Bucket

1. Buka tab **Storage** di Supabase Console
2. Lihat daftar buckets:
   - ✓ `doctors` (public)
   - ✓ `content` (public)

---

## SETUP RLS POLICIES VIA UI (OPTIONAL)

Jika Anda ingin setup RLS policies untuk storage:

### 1. Klik bucket (contoh: "doctors")

### 2. Klik tab **Policies**

### 3. Klik tombol **New Policy** atau **Create Policy**

### 4. Pilih template atau buat custom:

**Untuk Public Read:**

```
- Allowed operation: SELECT
- Everyone can read this bucket
```

**Untuk Authenticated Write:**

```
- Allowed operation: INSERT, UPDATE, DELETE
- Only authenticated users can
```

### 5. Klik **Create policy** atau **Save**

---

## ALTERNATIVE: Setup via Supabase CLI

Jika Anda familiar dengan CLI:

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Login
supabase login

# Link project
supabase link

# Pull database schema dan policies
supabase db pull

# Edit policies di supabase/migrations/
# Kemudian push kembali
supabase db push
```

---

## TESTING UPLOAD

Setelah setup bucket selesai:

1. Buka admin panel: `http://localhost:3000/admin/doctors`
2. Login dengan akun admin
3. Klik **Tambah Dokter**
4. Upload foto dokter
5. Jika berhasil, foto akan tersimpan di bucket "doctors"

---

## ERROR REFERENCE

### Error: "Bucket not found"

**Penyebab:** Bucket "doctors" atau "content" belum dibuat
**Solusi:** Buat bucket via UI Supabase Console

### Error: "Access denied to bucket"

**Penyebab:** Bucket bersifat private
**Solusi:** Set bucket menjadi public via Settings

### Error: "File too large"

**Penyebab:** Ukuran file melebihi limit
**Solusi:** Naikkan file size limit atau kompres gambar

### Error: "Unsupported file type"

**Penyebab:** Format file tidak didukung
**Solusi:** Gunakan format: JPG, PNG, WebP, GIF

---

## CHECKLIST SETUP COMPLETION

- [ ] SQL ALTER sudah dijalankan di SQL Editor (tanpa storage.objects)
- [ ] Bucket "doctors" sudah dibuat dan public
- [ ] Bucket "content" sudah dibuat dan public
- [ ] Tabel doctors, schedules, mading_content, hero_banners sudah ada
- [ ] RLS policies sudah aktif di semua tabel
- [ ] Upload test ke bucket berhasil
- [ ] Admin panel bisa menambah dokter/mading

---

## NEXT STEPS

Setelah setup storage berhasil:

1. **Admin Dashboard:** Akses `/admin/dashboard`
2. **Kelola Dokter:** Akses `/admin/doctors` (tanpa email & phone field)
3. **Kelola Mading:** Akses `/admin/mading` (akan dibuat di step berikutnya)
4. **Kelola Hero:** Akses `/admin/hero` (akan dibuat di step berikutnya)

---

**Support:** Jika ada error, screenshot error message dan buka issue di GitHub repository.
