-- SUPABASE SQL - COPY-PASTE KE SQL EDITOR SUPABASE
-- Jalankan ini di Supabase Console → SQL Editor → New Query
-- LENGKAP: Buat tabel + Policies + Storage

-- ============================================================
-- STEP 1: Buat Tabel doctors (jika belum ada)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  image_url TEXT,
  experience_years INTEGER,
  bio TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- STEP 2: Buat Tabel schedules (jika belum ada)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- STEP 3: Buat Index
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON public.doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_schedules_doctor_id ON public.schedules(doctor_id);

-- ============================================================
-- STEP 4: DROP Policies Lama (jika ada)
-- ============================================================

DROP POLICY IF EXISTS "Allow authenticated insert doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated update doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated delete doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;

-- ============================================================
-- STEP 5: ENABLE RLS
-- ============================================================

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 6: CREATE Policies untuk Tabel doctors
-- ============================================================

CREATE POLICY "Allow public read doctors" ON public.doctors
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert doctors" ON public.doctors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update doctors" ON public.doctors
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete doctors" ON public.doctors
  FOR DELETE USING (true);

-- ============================================================
-- STEP 7: CREATE Policies untuk Tabel schedules
-- ============================================================

CREATE POLICY "Allow public read schedules" ON public.schedules
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert schedules" ON public.schedules
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update schedules" ON public.schedules
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete schedules" ON public.schedules
  FOR DELETE USING (true);

-- ============================================================
-- CATATAN PENTING: Storage Bucket Policies
-- ============================================================
-- Jika Anda ingin mengatur policies untuk upload gambar ke bucket 'doctors',
-- gunakan UI Supabase Storage, bukan SQL (karena storage.objects adalah tabel sistem)
-- 
-- Langkah di UI:
-- 1. Klik Storage → bucket "doctors"
-- 2. Klik "Policies" tab
-- 3. New Policy → "Allow authenticated users to upload" 
--    - FOR INSERT
--    - USING (true)
--    - WITH CHECK (bucket_id = 'doctors')
-- 4. Save
-- ============================================================

-- ============================================================
-- SELESAI!
-- Jika tidak ada error di atas, perbaikan berhasil ✅
-- ============================================================
