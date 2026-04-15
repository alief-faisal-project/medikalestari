# Fitur Event Calendar - Dokumentasi Implementasi

## Ringkasan Perubahan

Fitur calendar untuk Event telah berhasil diintegrasikan ke panel admin bagian Mading. User admin sekarang dapat menambahkan dan mengatur tanggal event dengan mudah.

---

## Perubahan yang Dilakukan

### 1. **Update Types** (`lib/types.ts`)

Ditambahkan 2 field baru ke interface `MadingContent`:

- `start_date?: string` - Tanggal mulai event (format YYYY-MM-DD)
- `end_date?: string` - Tanggal berakhir event (format YYYY-MM-DD)

```typescript
export interface MadingContent {
  id: string;
  type: "edukasi" | "event";
  title: string;
  description: string;
  image_url: string;
  date?: string; // Untuk display di frontend
  start_date?: string; // Untuk kalender
  end_date?: string; // Untuk kalender
  order: number;
  created_at: string;
}
```

### 2. **Update Admin Panel** (`app/admin/mading/page.tsx`)

#### Perubahan di Form State:

- Menambahkan `start_date` dan `end_date` ke form state
- Conditional rendering untuk date picker berdasarkan tipe konten

#### Date Picker untuk Event:

Ketika user memilih tipe "Event", akan muncul 3 input:

1. **Tanggal Mulai Event** - Date picker untuk memilih tanggal mulai
2. **Tanggal Berakhir Event** - Date picker untuk memilih tanggal berakhir
3. **Tanggal Tampil** - Text input untuk format display yang custom (misal: "20 Mei 2026")

#### Update Tabel Event:

- Menambahkan kolom "Tanggal" di tabel list event
- Menampilkan `date` atau range `start_date` - `end_date` jika tersedia

### 3. **Update Frontend Component** (`components/MadingSection.tsx`)

Diperbarui logic penampilan tanggal event:

- Menampilkan `date` jika ada (untuk backward compatibility)
- Jika tidak ada, menampilkan range: `start_date - end_date` dari kalender
- Fallback ke "Segera Hadir" jika tidak ada tanggal

---

## Cara Penggunaan

### Menambah Event Baru:

1. Buka Panel Admin → Kelola Mading
2. Klik tombol "Tambah Konten"
3. Pilih "Event" di dropdown "Jenis Konten"
4. Isi form:
   - **Gambar**: Upload foto event
   - **Judul**: Nama event
   - **Deskripsi**: Penjelasan singkat
   - **Tanggal Mulai Event**: Pilih tanggal mulai (kalender)
   - **Tanggal Berakhir Event**: Pilih tanggal berakhir (kalender)
   - **Tanggal Tampil**: Format custom untuk ditampilkan di website (misal: "20 Mei 2026")
   - **Urutan**: Nomor urutan tampilan (lebih kecil = lebih atas)

5. Klik "Tambah Konten"

### Mengedit Event:

1. Buka Panel Admin → Kelola Mading
2. Di tabel Event, klik icon Edit pada event yang ingin diubah
3. Ubah informasi yang diperlukan (termasuk tanggal kalender)
4. Klik "Perbarui Konten"

### Menghapus Event:

1. Di tabel Event, klik icon Trash/Hapus
2. Konfirmasi penghapusan

---

## Database Schema

Jika menggunakan Supabase, pastikan tabel `mading_content` memiliki kolom:

- `start_date` (text/date) - nullable
- `end_date` (text/date) - nullable

Atau jika menggunakan JSON field, data akan otomatis disimpan sebagai bagian dari object.

---

## Frontend Display

### Di Halaman Utama (MadingSection):

```
Event items menampilkan:
- Tanggal display dari field "date" (contoh: "20 Mei 2026")
- Atau range dari start_date dan end_date (contoh: "2026-05-20 - 2026-05-25")
```

### Di Admin Panel:

```
Tabel Event menampilkan:
- Kolom Tanggal: Menampilkan date display
- Sub-text: Range start_date - end_date (jika ada)
```

---

## Field Data

### Saat Create/Update Event:

```javascript
{
  type: "event",
  title: "Skrining TBC & Rontgen Thorax",
  description: "Program deteksi dini kesehatan paru gratis bagi masyarakat umum.",
  image_url: "https://...",
  date: "20 Mei 2026", // Display format
  start_date: "2026-05-20", // Kalender start
  end_date: "2026-05-25", // Kalender end
  order: 1
}
```

---

## Fitur Tambahan

✅ Backward compatible dengan event lama yang hanya memiliki field `date`
✅ Validasi: Tanggal mulai dan berakhir wajib diisi untuk event baru
✅ Fleksibel: Bisa menggunakan `date` saja atau `start_date`/`end_date`, atau keduanya

---

## Testing Checklist

- [ ] Bisa menambah event baru dengan tanggal kalender
- [ ] Bisa mengedit event dan mengubah tanggal
- [ ] Tanggal tampil di admin tabel dengan benar
- [ ] Event tampil di halaman utama dengan tanggal yang benar
- [ ] Delete event berfungsi
- [ ] Backward compatible dengan event lama

---

## Support

Jika ada error atau pertanyaan, cek:

1. Database table sudah memiliki kolom `start_date` dan `end_date`
2. TypeScript types sudah ter-update di `lib/types.ts`
3. API functions mendukung field baru (jika menggunakan API)
