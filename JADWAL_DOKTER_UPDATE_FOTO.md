# Update Jadwal Dokter - Menambahkan Foto dan Link ke Profil

## Perubahan yang Dilakukan

### 1. **Menampilkan Foto Dokter**

- Setiap dokter di tabel jadwal sekarang menampilkan foto profil mereka
- Foto ditampilkan dengan ukuran 48x48 px dalam bentuk circular
- Jika dokter tidak memiliki foto, placeholder kosong akan ditampilkan

### 2. **Link ke Profil Dokter**

- Setiap baris dokter (termasuk sesi tambahan) sekarang bisa diklik
- Ketika diklik, pengguna akan diarahkan ke halaman profil dokter: `/dokter/{id}`
- Efek hover ditampilkan untuk menunjukkan bahwa baris bisa diklik
- Cursor berubah menjadi pointer saat hover

### 3. **Peningkatan UX**

- Foto dokter membantu pengguna dengan cepat mengidentifikasi dokter
- Interaksi yang lebih intuitif dengan baris yang clickable
- Transisi hover yang smooth untuk visual feedback yang lebih baik

## File yang Diubah

- `components/DoctorScheduleGrid.tsx`

## Implementasi Teknis

- Menambahkan `Image` dari `next/image` untuk optimisasi gambar
- Menambahkan `useRouter` dari `next/navigation` untuk navigasi
- Mengupdate struktur baris tabel untuk menampilkan foto di sebelah nama dokter
- Menambahkan event `onClick` pada setiap baris dokter
- Menambahkan class `cursor-pointer` untuk visual feedback

## Testing

Untuk memastikan fitur bekerja dengan baik:

1. Periksa bahwa foto dokter ditampilkan jika ada
2. Klik pada baris dokter manapun
3. Pastikan navigasi ke halaman profil dokter berfungsi dengan benar
4. Verifikasi bahwa baris sesi tambahan juga bisa diklik
