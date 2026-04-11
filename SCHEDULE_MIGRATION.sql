-- Pastikan table schedules sudah ada dengan struktur yang tepat
-- Jalankan di Supabase SQL Editor

-- Cek apakah table schedules sudah ada, jika ada, struktur sudah benar
-- Jika tidak ada, uncomment di bawah:

-- CREATE TABLE IF NOT EXISTS schedules (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
--   day_of_week VARCHAR(20) NOT NULL,
--   start_time VARCHAR(5) NOT NULL,
--   end_time VARCHAR(5) NOT NULL,
--   is_available BOOLEAN DEFAULT true,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT valid_times CHECK (start_time < end_time)
-- );

-- CREATE INDEX idx_schedules_doctor_id ON schedules(doctor_id);
-- CREATE INDEX idx_schedules_day ON schedules(day_of_week);

-- Memungkinkan multiple schedule per dokter per hari
-- Contoh data yang valid:
-- - Dokter A, Senin, 08:00-12:00 (Jam 1)
-- - Dokter A, Senin, 14:00-17:00 (Jam 2)
-- - Dokter A, Selasa, 08:00-12:00
-- dst.

-- RLS Policies (keamanan)
-- ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- -- Allow read for public
-- CREATE POLICY "Allow public read" ON schedules
--   FOR SELECT USING (true);

-- -- Allow admin write
-- CREATE POLICY "Allow admin write" ON schedules
--   FOR INSERT WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM admin_users WHERE id = auth.uid()
--     )
--   );

-- CREATE POLICY "Allow admin update" ON schedules
--   FOR UPDATE USING (
--     EXISTS (
--       SELECT 1 FROM admin_users WHERE id = auth.uid()
--     )
--   );

-- CREATE POLICY "Allow admin delete" ON schedules
--   FOR DELETE USING (
--     EXISTS (
--       SELECT 1 FROM admin_users WHERE id = auth.uid()
--     )
--   );
