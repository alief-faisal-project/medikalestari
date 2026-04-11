╔═══════════════════════════════════════════════════════════════════════════════╗
║ 🎉 PERBAIKAN ADMIN PANEL - FINAL ║
║ Semua Kode Sudah Diperbaiki & Siap Dijalankan ║
╚═══════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════════════════════════
📋 RINGKASAN MASALAH & SOLUSI
═══════════════════════════════════════════════════════════════════════════════════

🔴 MASALAH 1: Error saat submit dokter
Error Message: "new row violates row-level security policy for table doctors"
Penyebab: RLS policy tidak mengizinkan INSERT
✅ Solusi: Jalankan SQL di Supabase (lihat STEP 1 di bawah)

🔴 MASALAH 2: Login ulang setiap masuk admin panel
Penyebab: useEffect dengan dependency [router] menyebabkan redirect loop
✅ Solusi: Sudah diperbaiki - dependency diubah ke []

🔴 MASALAH 3: Field "Tahun Pengalaman" perlu dihapus
Penyebab: Feature tidak diperlukan
✅ Solusi: Sudah dihapus dari form, tabel, dan type definition

═══════════════════════════════════════════════════════════════════════════════════
📁 FILE YANG SUDAH DIUBAH
═══════════════════════════════════════════════════════════════════════════════════

✅ app/admin/doctors/page.tsx

- Hapus field experience_years dari formData state
- Hapus dari handleEdit function
- Hapus dari resetForm function
- Hapus dari tabel display
- Hapus dari form input section
- Fix useEffect dependency (hanya jalankan saat mount)
- Add error message handling di catch block
  ✓ NO ERRORS

✅ lib/types.ts

- Buat experience_years optional: experience_years?: number
  ✓ NO ERRORS

✅ lib/api.ts

- Perbaiki upload error handling
- Better error messages
  ✓ NO ERRORS

📝 File Baru Dibuat:
✅ SUPABASE_FIX.sql - SQL siap copy-paste
✅ SUPABASE_ALTER.sql - Penjelasan detail
✅ PERBAIKAN_ADMIN_PANEL.md - Panduan lengkap
✅ SQL_READY_TO_RUN.txt - Checklist
✅ SUMMARY_PERBAIKAN.txt - Ringkasan visual

═══════════════════════════════════════════════════════════════════════════════════
🚀 LANGKAH EKSEKUSI - IKUTI INI SAJA
═══════════════════════════════════════════════════════════════════════════════════

STEP 1: JALANKAN SQL DI SUPABASE
────────────────────────────────────────────────────────────────────────────────

A. Buka Supabase Console
→ https://supabase.com
→ Login dengan akun Anda

B. Pilih Project
→ Klik project "rs medika lestari"

C. Buka SQL Editor
→ Sidebar kiri → Cari "SQL Editor"
→ Klik "SQL Editor"

D. Buat Query Baru
→ Klik tombol "+ New Query"

E. Copy SQL Lengkap
→ Buka file: SUPABASE_FIX.sql (di root folder)
→ Copy SEMUA isi file tersebut (Ctrl+A, Ctrl+C)

F. Paste ke Supabase
→ Paste ke editor query Supabase (Ctrl+V)
→ Seharusnya melihat ~40 baris SQL

G. Jalankan SQL
→ Klik tombol "Run" atau tekan Ctrl+Enter
→ Tunggu 5-10 detik

H. Verifikasi Sukses
→ Seharusnya muncul pesan "Success" atau output tanpa error
→ Jika error, catat pesan errornya dan beri tahu

────────────────────────────────────────────────────────────────────────────────

STEP 2: PASTIKAN STORAGE BUCKET ADA
────────────────────────────────────────────────────────────────────────────────

A. Buka Storage di Supabase
→ Dashboard → Sidebar kiri → "Storage"

B. Cek Bucket "doctors"
→ Lihat daftar buckets
→ Seharusnya sudah ada "doctors" (dari migration awal)
→ Jika belum ada, lanjut ke C

C. (Jika bucket belum ada) Buat Bucket
→ Klik "+ New Bucket"
→ Nama: doctors
→ Centang ✓ Public bucket
→ Klik "Create bucket"

D. Verifikasi Bucket Public
→ Klik bucket "doctors"
→ Settings → Cek bahwa "Public bucket" ✓ ON
→ Done!

────────────────────────────────────────────────────────────────────────────────

STEP 3: JALANKAN DI LOCAL DAN TEST
────────────────────────────────────────────────────────────────────────────────

A. Start Dev Server (jika belum jalan)

```
npm run dev
```

→ Seharusnya berjalan di http://localhost:3000

B. Akses Admin Login
→ Buka browser: http://localhost:3000/admin/login
→ Masukkan email dan password admin Anda

C. Test Login Tidak Berulang
→ Setelah login sukses, masuk ke dashboard
→ Klik menu "Kelola Dokter" atau buka /admin/doctors
→ ✓ Seharusnya TIDAK redirect ke login page lagi
→ ✓ Halaman langsung menampilkan tabel dokter

D. Test Submit Dokter Baru
→ Klik tombol "+ Tambah Dokter"
→ Modal form terbuka
→ Isi form dengan data:
_ Foto Dokter: Pilih file gambar (JPG/PNG)
_ Nama: "dr. Budi Santoso"
_ Spesialisasi: Pilih dari dropdown (coba "Spesialis Jantung & Pembuluh Darah")
_ Biodata: "Dokter berpengalaman dengan dedikasi tinggi"
_ Email: "budi@example.com"
_ Telepon: "0812345678"
→ Klik tombol "Simpan"

✅ HASIL SUKSES: - Modal menutup - Dokter baru muncul di tabel bawah - Foto docter terlihat di kolom pertama - Tidak ada error alert

E. Test Edit Dokter
→ Klik tombol "Edit" (icon pensil) pada dokter di tabel
→ Form terbuka dengan data terisi
→ Ubah salah satu field (coba ubah email)
→ Klik "Simpan"
→ ✓ Data ter-update tanpa error

F. Test Delete Dokter (opsional)
→ Klik tombol "Hapus" (icon trash) pada dokter
→ Confirm dialog muncul
→ Klik "OK"
→ ✓ Dokter terhapus dari tabel

═══════════════════════════════════════════════════════════════════════════════════
🧪 TROUBLESHOOTING - JIKA MASIH ERROR
═══════════════════════════════════════════════════════════════════════════════════

❌ Error: "new row violates row-level security policy"

Diagnosis:
→ SQL belum dijalankan di Supabase
→ atau SQL jalankan tapi ada error

Solusi:

1.  Cek Supabase → Database → Policies
    Seharusnya ada 8 policies:
    - Allow public read doctors
    - Allow authenticated insert doctors
    - Allow authenticated update doctors
    - Allow authenticated delete doctors
    - Allow public read doctors storage
    - Allow authenticated insert doctors storage
    - Allow authenticated update doctors storage
    - Allow authenticated delete doctors storage

2.  Jika kurang, jalankan SQL lagi (STEP 1)
3.  Jika sudah ada semua tapi masih error:
    → Refresh browser (Ctrl+Shift+R)
    → Login ulang
    → Coba submit lagi

❌ Error: "bucket 'doctors' not found"

Diagnosis:
→ Bucket storage tidak ada

Solusi:
→ Supabase → Storage → Buat bucket "doctors" (STEP 2)
→ Pastikan "Public bucket" ✓ ON

❌ Error: "Cannot read properties of undefined" saat upload gambar

Diagnosis:
→ getPublicUrl tidak mengembalikan URL yang valid

Solusi:

1.  Refresh halaman (Ctrl+Shift+R)
2.  Cek browser console (F12) untuk pesan error detail
3.  Pastikan bucket "doctors" public
4.  Coba upload gambar yang lebih kecil (< 5MB)

❌ Error: "401 Unauthorized" atau "session not found"

Diagnosis:
→ User session expired atau belum login

Solusi:
→ Buka http://localhost:3000/admin/login
→ Login ulang
→ Coba lagi

❌ Halaman masih redirect ke login meskipun sudah login

Diagnosis:
→ Kode masih menggunakan dependency lama

Solusi:

1.  Buka file app/admin/doctors/page.tsx
2.  Cek line 46 - seharusnya: }, []);
3.  Jika masih: }, [router] - update menjadi []
4.  Refresh browser dan login ulang

═══════════════════════════════════════════════════════════════════════════════════
📋 FORM FIELD SEKARANG (SETELAH PERBAIKAN)
═══════════════════════════════════════════════════════════════════════════════════

Form Input:
✓ Foto Dokter (file upload)
✓ Nama Dokter (text)
✓ Spesialisasi (dropdown - 12 pilihan tetap)
✓ Biodata (textarea)
✓ Email (email input)
✓ Telepon (phone input)

Dihapus:
✗ Tahun Pengalaman (tidak perlu)

Spesialisasi yang tersedia:

1. Spesialis Penyakit Dalam
2. Spesialis Bedah Umum
3. Spesialis Saraf
4. Spesialis Orthopedi
5. Spesialis Paru
6. Spesialis Jantung & Pembuluh Darah
7. Spesialis THT
8. Spesialis Anak
9. Spesialis Mata
10. Spesialis Obgyn
11. Spesialis Gigi
12. Spesialis Fisioterapi

═══════════════════════════════════════════════════════════════════════════════════
✅ VERIFIKASI FINAL - CHECKLIST
═══════════════════════════════════════════════════════════════════════════════════

Sebelum declare selesai, verifikasi ini:

☑ Sudah copy-paste SQL dari SUPABASE_FIX.sql ke Supabase SQL Editor
☑ SQL sudah dijalankan (ada output "Success" atau no error)
☑ Bucket "doctors" ada di Storage dan "Public bucket" ON
☑ Buka http://localhost:3000/admin/login dan login
☑ Klik menu "Kelola Dokter" - tidak redirect ke login
☑ Form punya 6 field (tidak ada Tahun Pengalaman)
☑ Dropdown Spesialisasi punya 12 pilihan
☑ Bisa submit dokter baru tanpa error RLS
☑ Foto upload sukses dan terlihat di tabel
☑ Edit dan delete berfungsi normal

Jika semua ☑, maka SELESAI! 🎉

═══════════════════════════════════════════════════════════════════════════════════

Pertanyaan? Error masih ada?
→ Salin pesan error yang muncul di alert atau console
→ Beri tahu dan saya siap bantu debug! 🚀
