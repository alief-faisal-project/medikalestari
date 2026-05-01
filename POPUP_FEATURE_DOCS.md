# 📋 Fitur Kelola Popup - Dokumentasi

## 📝 Deskripsi

Fitur **Kelola Popup** memungkinkan Anda untuk mengelola gambar popup yang ditampilkan ketika pengunjung pertama kali memasuki website.

## ✨ Fitur Utama

### 1. **Upload Maksimal 3 Gambar**

- Dapat menambahkan hingga 3 gambar popup
- Setiap popup dapat memiliki judul dan deskripsi (opsional)
- Upload langsung melalui interface admin

### 2. **Display & Navigasi**

- Popup otomatis ditampilkan saat pengunjung pertama kali masuk ke website
- Pengunjung dapat navigasi antar gambar dengan tombol "Sebelumnya" dan "Berikutnya"
- Indikator dot menunjukkan posisi gambar yang sedang ditampilkan

### 3. **Muncul Kembali Saat Keluar Tab**

- Jika pengunjung meninggalkan tab website dan kembali lagi, popup akan muncul kembali
- Menggunakan JavaScript `sessionStorage` untuk tracking
- Jika pengunjung menutup browser, popup akan muncul lagi saat membuka ulang website

### 4. **Tombol Close (X)**

- Tombol close dengan icon X di pojok kanan atas popup
- Pengunjung dapat menutup popup kapan saja
- Overlay background juga dapat diklik untuk menutup popup

### 5. **Kontrol Aktif/Non-aktif**

- Setiap popup dapat diaktifkan atau dinonaktifkan
- Popup yang nonaktif tidak akan ditampilkan ke pengunjung
- Dapat diedit kapan saja tanpa kehilangan data

## 🛠️ Cara Penggunaan

### Menambah Popup Baru

1. **Buka Admin Panel**
   - Login ke `/admin/login`
   - Navigasi ke menu **"Kelola Popup"**

2. **Klik Tombol "Tambah Popup"**
   - Akan muncul modal form

3. **Isi Form**
   - **Gambar Popup** (wajib): Upload gambar dengan klik area upload
   - **Judul** (opsional): Judul popup
   - **Deskripsi** (opsional): Penjelasan popup
   - **Urutan Tampil** (wajib): Pilih 1, 2, atau 3
   - **Aktifkan Popup**: Centang untuk mengaktifkan

4. **Klik Tombol "Tambah"**
   - Popup berhasil ditambahkan

### Mengedit Popup

1. Klik tombol **Edit** (pensil) pada kartu popup
2. Ubah data sesuai kebutuhan
3. Klik **"Perbarui"** untuk menyimpan perubahan

### Menghapus Popup

1. Klik tombol **Delete** (keranjang) pada kartu popup
2. Konfirmasi penghapusan
3. Popup terhapus dari sistem

### Mengaktifkan/Menonaktifkan Popup

1. Klik tombol **"Matikan"** atau **"Aktifkan"** pada kartu popup
2. Status akan langsung berubah

## 📱 Tampilan di Frontend

### Desktop

- Popup ditampilkan di tengah layar dengan ukuran responsif
- Overlay semi-transparan di belakang popup

### Mobile

- Popup menyesuaikan ukuran layar
- Tetap responsif dan mudah digunakan

## 💾 Database Table

Table `popups` memiliki struktur:

```
- id (UUID, primary key)
- image_url (text): URL gambar
- title (text): Judul popup
- description (text): Deskripsi popup
- display_order (integer): Urutan tampil (1-3)
- is_active (boolean): Status aktif/tidak
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔒 Keamanan

- Hanya admin yang dapat mengelola popup
- Memerlukan autentikasi sebelum akses halaman admin
- Upload file divalidasi di server

## ⚙️ Konfigurasi

### File Terkait

- `/lib/popup-api.ts` - API functions
- `/components/PopupDisplay.tsx` - Komponen popup frontend
- `/app/admin/popup/page.tsx` - Halaman admin
- `/components/AdminSidebar.tsx` - Menu admin (sudah ditambahkan)

### Import yang Dibutuhkan

- `lucide-react` - Icons
- `next/image` - Image optimization
- Supabase - Database & Storage

## 🚀 Deployment

Sebelum deploy, pastikan:

1. Table `popups` sudah dibuat di Supabase
2. Storage bucket `content` sudah tersedia
3. Permissions sudah dikonfigurasi dengan benar

## ❓ FAQ

**Q: Berapa maksimal popup yang bisa ditambahkan?**
A: Maksimal 3 popup sesuai kebutuhan.

**Q: Apakah popup akan muncul lagi jika pengunjung refresh halaman?**
A: Tidak, popup hanya muncul sekali per session. Akan muncul lagi jika pengunjung keluar dan masuk kembali.

**Q: Bisa ubah urutan popup?**
A: Ya, melalui fitur edit, ubah "Urutan Tampil" sesuai kebutuhan.

**Q: Gambar apa saja yang bisa di-upload?**
A: Format JPG, PNG, GIF, WebP. Ukuran maksimal tergantung konfigurasi Supabase.

---

**Dibuat:** May 1, 2026
**Status:** ✅ Ready to Use
