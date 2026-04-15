# SQL ALTER Mading Content - Supabase

## Perintah (Jalankan di Supabase SQL Editor)

```sql
ALTER TABLE mading_content
ADD COLUMN start_date DATE,
ADD COLUMN end_date DATE;
```

## Penjelasan Kolom

| Kolom        | Tipe | Kegunaan                                |
| ------------ | ---- | --------------------------------------- |
| `date`       | TEXT | Untuk edukasi (format: "14 April 2026") |
| `start_date` | DATE | Untuk event - tanggal mulai             |
| `end_date`   | DATE | Untuk event - tanggal akhir (opsional)  |

## Catatan

- Jalankan di Supabase → SQL Editor
- Tidak perlu drop kolom `date` lama (masih digunakan untuk edukasi)
- Event akan gunakan `start_date` dan `end_date`
