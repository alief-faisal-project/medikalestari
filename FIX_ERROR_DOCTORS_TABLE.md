🔧 PERBAIKAN SUPABASE ERROR - relation "public.doctors" does not exist

═══════════════════════════════════════════════════════════════════════════════

❌ ERROR YANG TERJADI:
────────────────────
"Failed to run sql query: ERROR: 42P01: relation "public.doctors" does not exist"

✅ PENYEBAB:
───────────
Tabel "doctors" belum dibuat di Supabase database

✅ SOLUSI:
─────────
File SUPABASE_FIX.sql sudah di-UPDATE dengan SQL LENGKAP yang:

1. Membuat tabel doctors
2. Membuat tabel schedules
3. Setup RLS policies
4. Setup storage policies

═══════════════════════════════════════════════════════════════════════════════

📝 LANGKAH EKSEKUSI (UPDATE):

1. Buka file: SUPABASE_FIX.sql (sudah di-update)
2. Copy SEMUA isi file (mulai dari baris pertama sampai akhir)
3. Buka https://supabase.com
4. Login ke project "rs medika lestari"
5. SQL Editor → New Query
6. Paste semua SQL ke editor
7. Klik: RUN
8. Tunggu "Success" (seharusnya tidak ada error lagi)

═══════════════════════════════════════════════════════════════════════════════

✅ JIKA BERHASIL:
─────────────────

- Tidak ada error di output SQL Editor
- Tabel doctors sudah ada
- Policies sudah aktif
- Siap untuk admin panel!

═══════════════════════════════════════════════════════════════════════════════

🧪 TEST SETELAH SQL SUKSES:

1. npm run dev
2. http://localhost:3000/admin/login
3. Login dengan credentials Anda
4. Klik "Kelola Dokter"
5. Tambah Dokter Baru:
   - Foto: Upload gambar
   - Nama: dr. Test
   - Spesialisasi: Pilih dari dropdown
   - Email: test@example.com
   - Telepon: 08123456789
   - Biodata: Test dokter
6. Klik Simpan
7. ✓ Seharusnya tidak ada error, dokter muncul di tabel

═══════════════════════════════════════════════════════════════════════════════

💡 NOTES:

- SQL sekarang menggunakan CREATE TABLE IF NOT EXISTS (aman jika dijalankan berkali-kali)
- SQL juga membuat tabel schedules (sudah siap untuk fitur jadwal dokter di masa depan)
- Storage policies juga sudah siap
- Tidak perlu buat bucket manual (policies akan bekerja ketika Anda upload gambar)

═══════════════════════════════════════════════════════════════════════════════

Selesai! Langsung copy-paste SUPABASE_FIX.sql ke SQL Editor dan run. 🚀
