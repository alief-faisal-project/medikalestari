# 📋 Jadwal Dokter - Dokumentasi

## 🎯 Fitur Baru: Halaman Jadwal Dokter Terpadu

Kami telah membuat halaman jadwal dokter yang mengintegrasikan semua jadwal dokter dalam satu tempat yang mudah diakses.

## 📍 Lokasi File

- **Page**: `/app/jadwal-dokter/page.tsx`
- **Component**: `/components/DoctorScheduleGrid.tsx`
- **API**: `/lib/api.ts` (fungsi `fetchAllDoctorsWithSchedules`)

## ✨ Fitur Utama

### 1. **Tampilan Tabel Minimalis & Clean**

- Menampilkan nama dokter, spesialisasi, dan jadwal praktek
- Desain yang rapi dan profesional
- Mudah dibaca di semua ukuran layar (responsive)

### 2. **Filter Spesialisasi**

- Tombol filter untuk memilih spesialisasi dokter
- Menampilkan jumlah dokter per spesialisasi
- Filter "Semua" untuk menampilkan semua dokter

### 3. **Pencarian Dokter**

- Kolom pencarian untuk mencari nama dokter
- Real-time filtering saat mengetik

### 4. **Jadwal Praktek**

- Menampilkan jadwal per hari (Senin - Minggu)
- Mendukung multiple schedule per hari (baris kedua untuk sesi kedua)
- Format 24 jam (HH:mm)

### 5. **Kontak Langsung**

- Tombol "Call" untuk menghubungi via telepon
- Tombol "Email" untuk mengirim email
- Link aktif ke WhatsApp dan email

## 🔧 Teknologi yang Digunakan

- **Frontend**: React, Tailwind CSS
- **Backend**: Next.js Server Components
- **Database**: Supabase
- **Data Fetching**: Server-side fetching untuk performa optimal

## 📊 Data Structure

### Doctor with Schedules

```typescript
interface DoctorWithSchedule extends Doctor {
  schedules: Schedule[];
}
```

### Schedule

```typescript
interface Schedule {
  id: string;
  doctor_id: string;
  day_of_week: string; // Senin, Selasa, etc.
  start_time: string; // HH:mm format
  end_time: string; // HH:mm format
  is_available: boolean;
  created_at: string;
}
```

## 🎨 Design Details

### Warna & Styling

- Primary Color: `#005cb3` (Blue)
- Secondary Colors: `#0074d9`, `#004fa3`
- Background: White & Slate
- Border: Slate-200

### Responsive Design

- Desktop: Full table dengan 7 kolom hari
- Mobile: Horizontal scroll table
- Padding & spacing: Optimized untuk readability

### Hover Effects

- Baris tabel berubah warna saat hover
- Button dengan transition smooth
- Link dengan underline pada hover

## 🚀 Cara Menggunakan

### 1. Akses Halaman

```
/jadwal-dokter
```

### 2. Filter Dokter

- Klik tombol spesialisasi untuk filter
- Gunakan search bar untuk mencari nama dokter

### 3. Lihat Jadwal

- Tabel menampilkan jadwal untuk setiap hari
- Baris kedua (warna lebih terang) = sesi praktek kedua

### 4. Hubungi Dokter

- Klik "Call" untuk menghubungi via telepon
- Klik "Email" untuk mengirim email

## 📱 Mobile Responsiveness

- Tabel responsive dengan horizontal scroll
- Filter dan search mobile-friendly
- Touch-friendly button sizes
- Optimized padding untuk mobile

## ⚡ Performance

- Server-side data fetching
- Memoized filtering untuk performa optimal
- Minimal re-renders dengan useMemo
- Optimized table rendering

## 🔄 Integrasi dengan ServicesSection

Component ServicesSection telah diupdate untuk menambahkan link ke halaman jadwal dokter:

- Tombol "Jadwal Dokter" di bagian Pelayanan
- Link langsung ke `/jadwal-dokter`

## 📝 Update yang Dilakukan

### File Baru

1. `/app/jadwal-dokter/page.tsx` - Halaman jadwal dokter
2. `/components/DoctorScheduleGrid.tsx` - Component tabel jadwal

### File yang Dimodifikasi

1. `/lib/api.ts` - Tambah fungsi `fetchAllDoctorsWithSchedules()`
2. `/components/ServicesSection.tsx` - Tambah link ke halaman jadwal

## 🎯 Fitur di Masa Depan

Kemungkinan enhancement:

- [ ] Export jadwal ke format PDF/Excel
- [ ] Print-friendly layout
- [ ] Calendar view (agendakelender)
- [ ] Booking appointment langsung dari halaman
- [ ] Notifikasi jadwal dokter berubah
- [ ] Dark mode support

## 🐛 Testing

### Test Cases

- ✅ Filter by specialty works correctly
- ✅ Search doctor by name works
- ✅ Multiple schedules per day display correctly
- ✅ Contact links (Call & Email) work
- ✅ Responsive on mobile/tablet/desktop
- ✅ Loading state displays correctly
- ✅ Empty state handles correctly

## 📞 Support

Untuk pertanyaan atau update jadwal, hubungi:

- **WhatsApp**: +62 822-4623-2527
- **Email**: marketing@rsmedikalestari.com

---

**Last Updated**: April 19, 2026
**Version**: 1.0.0
