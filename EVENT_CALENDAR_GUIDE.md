# 📅 Event Calendar Feature - Quick Guide

## ✨ Apa yang Baru?

Admin sekarang bisa **menambahkan tanggal kalender** untuk setiap event yang dibuat di panel Mading!

---

## 🎯 Fitur Baru di Admin Panel

### 1. **Date Picker untuk Event**

- Ketika memilih tipe "Event", akan muncul 3 field tanggal:
  - 📅 **Tanggal Mulai Event** - Kapan event dimulai
  - 📅 **Tanggal Berakhir Event** - Kapan event berakhir
  - 🏷️ **Tanggal Tampil** - Format custom untuk ditampilkan ke user (misal: "20 Mei 2026")

### 2. **Kolom Tanggal di Tabel Event**

- Tabel Event sekarang menampilkan kolom "Tanggal"
- Menampilkan tanggal display atau range kalender

---

## 📝 Cara Menggunakan

### **Menambah Event Baru:**

```
1. Panel Admin → Kelola Mading
2. Klik "Tambah Konten"
3. Pilih "Event" (Jenis Konten)
4. Isi form:

   📸 Gambar: [Upload foto event]

   📝 Judul: "Skrining TBC & Rontgen Thorax"

   📄 Deskripsi: "Program deteksi dini kesehatan paru gratis..."

   📅 Tanggal Mulai Event: 2026-05-20

   📅 Tanggal Berakhir Event: 2026-05-25

   🏷️ Tanggal Tampil: 20 Mei 2026

   🔢 Urutan: 1

5. Klik "Tambah Konten" ✓
```

---

## 🗂️ File yang Diubah

| File                           | Perubahan                                                        |
| ------------------------------ | ---------------------------------------------------------------- |
| `lib/types.ts`                 | ✅ Menambah field `start_date` dan `end_date` ke `MadingContent` |
| `app/admin/mading/page.tsx`    | ✅ Menambah date picker untuk event, update form state           |
| `components/MadingSection.tsx` | ✅ Update display tanggal event (support kalender range)         |

---

## 🔍 Contoh Data Event

### **Sebelum (Old):**

```javascript
{
  id: "1",
  type: "event",
  title: "Kickboxing Class",
  description: "Tingkatkan kebugaran jantung dengan sesi cardio intensif.",
  image_url: "https://...",
  date: "25 Mei 2026",
  order: 2
}
```

### **Sekarang (New):**

```javascript
{
  id: "1",
  type: "event",
  title: "Kickboxing Class",
  description: "Tingkatkan kebugaran jantung dengan sesi cardio intensif.",
  image_url: "https://...",
  date: "25 Mei 2026",              // Display format (opsional)
  start_date: "2026-05-20",         // Kalender start
  end_date: "2026-05-25",           // Kalender end
  order: 2
}
```

---

## 🎨 Display di Frontend

### **Admin Table:**

```
Judul                    | Tanggal              | Order
------------------------+---------------------+-------
Skrining TBC & Rontgen   | 20 Mei 2026         | 1
                         | 2026-05-20 s/d ...  |
                         |                     |
Kickboxing Class         | 25 Mei 2026         | 2
                         | 2026-05-20 s/d ...  |
```

### **Halaman User:**

```
🕐 20 MEI 2026 (atau range: 2026-05-20 - 2026-05-25)
Skrining TBC & Rontgen Thorax
Program deteksi dini kesehatan paru gratis...
```

---

## ✅ Fitur Tambahan

- ✅ **Backward Compatible** - Event lama tetap berfungsi
- ✅ **Validasi** - Date fields required untuk event baru
- ✅ **Fleksibel** - Bisa gunakan `date` saja, kalender saja, atau keduanya
- ✅ **User Friendly** - Native date picker dari browser
- ✅ **Mobile Responsive** - Bekerja baik di semua device

---

## 🚀 Next Steps

1. ✅ Sinkronkan dengan database (pastikan kolom ada)
2. ✅ Test menambah event baru dengan tanggal
3. ✅ Verifikasi tampilan di halaman user
4. ✅ Update event lama (jika perlu) dengan kalender range

---

## 📞 Bantuan

Jika ada pertanyaan atau issue:

- Cek dokumentasi lengkap di `FEATURE_EVENT_CALENDAR.md`
- Pastikan database schema ter-update
- Verifikasi API endpoints support field baru
