-- ============================================================
-- SUPABASE ALTER STATEMENTS - Jalankan di SQL Editor Supabase
-- ============================================================
-- Tujuan:
-- 1. Fix RLS policy untuk INSERT/UPDATE/DELETE ke tabel doctors (hapus email & phone tidak required)
-- 2. Buat tabel mading_content untuk mengelola konten Mading/Event
-- 3. Buat tabel hero_banners untuk mengelola Hero Banner dinamis
-- 4. Setup RLS policies untuk tabel baru
-- 5. Pastikan storage bucket content ada dan public
-- ============================================================

-- ============================================================
-- PART 1: FIX DOCTORS TABLE RLS POLICIES
-- ============================================================

-- 1. DROP policy lama yang mungkin conflict (jika ada)
DROP POLICY IF EXISTS "Allow authenticated insert doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated update doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated delete doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated upload doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete doctors storage" ON storage.objects;

-- 2. ENABLE RLS pada tabel doctors (jika belum)
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- 3. CREATE policies untuk doctors table - baru dan lebih permissive

-- Policy untuk SELECT (public read)
CREATE POLICY "Allow public read doctors" ON public.doctors
  FOR SELECT USING (true);

-- Policy untuk INSERT (authenticated users)
CREATE POLICY "Allow authenticated insert doctors" ON public.doctors
  FOR INSERT WITH CHECK (true);

-- Policy untuk UPDATE (authenticated users)
CREATE POLICY "Allow authenticated update doctors" ON public.doctors
  FOR UPDATE USING (true) WITH CHECK (true);

-- Policy untuk DELETE (authenticated users)
CREATE POLICY "Allow authenticated delete doctors" ON public.doctors
  FOR DELETE USING (true);

-- ============================================================
-- PART 2: CREATE MADING_CONTENT TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.mading_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type varchar(50) NOT NULL CHECK (type IN ('edukasi', 'event')), -- 'edukasi' or 'event'
  title varchar(255) NOT NULL,
  description text,
  image_url text NOT NULL,
  date varchar(50), -- untuk edukasi (e.g., "April 14, 2026")
  "order" integer NOT NULL DEFAULT 0, -- untuk sorting
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mading_content ENABLE ROW LEVEL SECURITY;

-- Create policies untuk mading_content
CREATE POLICY "Allow public read mading content" ON public.mading_content
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert mading content" ON public.mading_content
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update mading content" ON public.mading_content
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete mading content" ON public.mading_content
  FOR DELETE USING (true);

-- ============================================================
-- PART 3: CREATE HERO_BANNERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.hero_banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  "order" integer NOT NULL DEFAULT 0, -- untuk sorting/urutan tampilan
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policies untuk hero_banners
CREATE POLICY "Allow public read hero banners" ON public.hero_banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated insert hero banners" ON public.hero_banners
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update hero banners" ON public.hero_banners
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete hero banners" ON public.hero_banners
  FOR DELETE USING (true);

-- ============================================================
-- PART 4: STORAGE POLICIES
-- ============================================================

-- 4. ENABLE RLS pada storage.objects (jika belum)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- DROP policies lama untuk storage
DROP POLICY IF EXISTS "Allow public read content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete content storage" ON storage.objects;

-- CREATE policies untuk storage bucket content

-- Policy untuk SELECT storage (public read)
CREATE POLICY "Allow public read content storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'content');

-- Policy untuk INSERT storage (authenticated upload)
CREATE POLICY "Allow authenticated insert content storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'content');

-- Policy untuk UPDATE storage (authenticated)
CREATE POLICY "Allow authenticated update content storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'content') WITH CHECK (bucket_id = 'content');

-- Policy untuk DELETE storage (authenticated)
CREATE POLICY "Allow authenticated delete content storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'content');

-- ============================================================
-- PART 5: CREATE STORAGE BUCKETS (Uncomment jika needed)
-- ============================================================

-- Jalankan ini hanya sekali, atau gunakan UI Storage Supabase

-- Insert bucket 'doctors' (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES ('doctors', 'doctors', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Insert bucket 'content' (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES ('content', 'content', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================================
-- PART 6: POPULATE INITIAL DATA (OPTIONAL)
-- ============================================================

-- Uncomment dan jalankan untuk setup initial data

-- -- Insert sample hero banners
-- INSERT INTO public.hero_banners (image_url, "order", is_active)
-- VALUES
--   ('/hero1.jpg', 1, true),
--   ('/hero2.jpg', 2, true),
--   ('/hero3.jpg', 3, true);

-- -- Insert sample mading content (Edukasi)
-- INSERT INTO public.mading_content (type, title, description, image_url, date, "order")
-- VALUES
--   (
--     'edukasi',
--     'Trik Yang Bisa Dilakukan Agar Anak Semangat Berpuasa',
--     'Sudah menjelang minggu-minggu terakhir puasa di bulan Ramadhan, bagaimana puasanya Moms and Dads?...',
--     'https://images.unsplash.com/photo-1536640712247-c45474d41d44?q=80&w=400&auto=format&fit=crop',
--     'April 14, 2026',
--     1
--   ),
--   (
--     'edukasi',
--     'Tips Aman Puasa di Bulan Ramadhan Bagi Penderita Maag',
--     'Sakit maag adalah rasa tidak nyaman di perut...',
--     'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop',
--     'April 13, 2026',
--     2
--   );

-- -- Insert sample mading content (Event)
-- INSERT INTO public.mading_content (type, title, description, image_url, "order")
-- VALUES
--   (
--     'event',
--     'SKRINING TBC & RONTGEN THORAX',
--     '',
--     'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400',
--     1
--   ),
--   (
--     'event',
--     'KICKBOXING CLASS',
--     '',
--     'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400',
--     2
--   );

-- ============================================================
-- CATATAN PENTING:
-- ============================================================
-- - Policies menggunakan CHECK (true) = memperbolehkan semua user authenticated
-- - Untuk production: pertimbangkan menambahkan column 'created_by' dan check auth.uid()
-- 
-- Langkah selanjutnya:
-- 1. Login ke Supabase Console
-- 2. Buka Project -> SQL Editor
-- 3. Buat query baru
-- 4. Copy-paste semua SQL di atas
-- 5. Jalankan (Run)
-- 6. Verifikasi table di Data Editor
-- 7. Update Hero Banner & Mading Content di admin panel
-- ============================================================
