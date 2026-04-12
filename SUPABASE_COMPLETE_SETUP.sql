-- ============================================================
-- COMPLETE SUPABASE SETUP - Jalankan di SQL Editor Supabase
-- ============================================================
-- Tujuan:
-- 1. Create/Fix storage buckets (doctors, content)
-- 2. Create tables: doctors, schedules, mading_content, hero_banners
-- 3. Setup RLS policies untuk semua tables
-- 4. Setup RLS policies untuk storage buckets
-- ============================================================

-- ============================================================
-- PART 1: CREATE STORAGE BUCKETS
-- ============================================================

-- Drop buckets jika sudah ada (jika perlu reset)
-- DELETE FROM storage.buckets WHERE id IN ('doctors', 'content');

-- Create/Update bucket 'doctors'
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'doctors',
  'doctors',
  true,
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

-- Create/Update bucket 'content'
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'content',
  'content',
  true,
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760;

-- ============================================================
-- PART 2: CREATE TABLES (jika belum ada)
-- ============================================================

-- 1. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar(255) NOT NULL,
  specialty varchar(255) NOT NULL,
  image_url text,
  experience_years integer,
  bio text,
  phone varchar(20),
  email varchar(255),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 2. SCHEDULES TABLE
CREATE TABLE IF NOT EXISTS public.schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id uuid NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  day_of_week varchar(50) NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 3. MADING_CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.mading_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type varchar(50) NOT NULL CHECK (type IN ('edukasi', 'event')),
  title varchar(255) NOT NULL,
  description text,
  image_url text NOT NULL,
  date varchar(50),
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 4. HERO_BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.hero_banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- ============================================================
-- PART 3: ENABLE RLS ON TABLES
-- ============================================================

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mading_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 4: DROP OLD POLICIES (untuk clean up)
-- ============================================================

-- Drop doctors policies
DROP POLICY IF EXISTS "Allow public read doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated insert doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated update doctors" ON public.doctors;
DROP POLICY IF EXISTS "Allow authenticated delete doctors" ON public.doctors;

-- Drop schedules policies
DROP POLICY IF EXISTS "Allow public read schedules" ON public.schedules;
DROP POLICY IF EXISTS "Allow authenticated insert schedules" ON public.schedules;
DROP POLICY IF EXISTS "Allow authenticated update schedules" ON public.schedules;
DROP POLICY IF EXISTS "Allow authenticated delete schedules" ON public.schedules;

-- Drop mading_content policies
DROP POLICY IF EXISTS "Allow public read mading content" ON public.mading_content;
DROP POLICY IF EXISTS "Allow authenticated insert mading content" ON public.mading_content;
DROP POLICY IF EXISTS "Allow authenticated update mading content" ON public.mading_content;
DROP POLICY IF EXISTS "Allow authenticated delete mading content" ON public.mading_content;

-- Drop hero_banners policies
DROP POLICY IF EXISTS "Allow public read hero banners" ON public.hero_banners;
DROP POLICY IF EXISTS "Allow authenticated insert hero banners" ON public.hero_banners;
DROP POLICY IF EXISTS "Allow authenticated update hero banners" ON public.hero_banners;
DROP POLICY IF EXISTS "Allow authenticated delete hero banners" ON public.hero_banners;

-- Drop storage policies
DROP POLICY IF EXISTS "Allow public read doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update doctors storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete doctors storage" ON storage.objects;

DROP POLICY IF EXISTS "Allow public read content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update content storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete content storage" ON storage.objects;

-- ============================================================
-- PART 5: CREATE NEW RLS POLICIES FOR TABLES
-- ============================================================

-- DOCTORS POLICIES
CREATE POLICY "Allow public read doctors" ON public.doctors
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert doctors" ON public.doctors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update doctors" ON public.doctors
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete doctors" ON public.doctors
  FOR DELETE USING (true);

-- SCHEDULES POLICIES
CREATE POLICY "Allow public read schedules" ON public.schedules
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert schedules" ON public.schedules
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update schedules" ON public.schedules
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete schedules" ON public.schedules
  FOR DELETE USING (true);

-- ============================================================
-- MADING_CONTENT POLICIES
-- ============================================================
CREATE POLICY "Allow public read mading content" ON public.mading_content
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert mading content" ON public.mading_content
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update mading content" ON public.mading_content
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete mading content" ON public.mading_content
  FOR DELETE USING (true);

-- ============================================================
-- HERO_BANNERS POLICIES
-- ============================================================
CREATE POLICY "Allow public read hero banners" ON public.hero_banners
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert hero banners" ON public.hero_banners
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update hero banners" ON public.hero_banners
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete hero banners" ON public.hero_banners
  FOR DELETE USING (true);

-- ============================================================
-- PART 6: STORAGE POLICIES (via Supabase Console UI)
-- ============================================================
-- CATATAN: Storage policies tidak bisa diatur via SQL karena permission issues
-- Setup storage policies via Supabase Console:
-- 1. Buka Supabase Console -> Storage
-- 2. Klik bucket "doctors"
-- 3. Tab "Policies" -> New Policy
-- 4. Gunakan policy template yang sudah disediakan
-- 5. Ulangi untuk bucket "content"

-- ATAU gunakan Supabase CLI:
-- supabase link
-- supabase db remote set
-- supabase db pull  (untuk get current policies)
-- Kemudian edit di supabase/migrations/ dan push

-- Untuk development, Anda bisa set bucket menjadi PUBLIC dari Storage UI
-- Storage -> Select Bucket -> Edit Bucket -> Make public

-- ============================================================
-- PART 7: CREATE INDEXES (untuk performa)
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON public.doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_name ON public.doctors(name);
CREATE INDEX IF NOT EXISTS idx_schedules_doctor_id ON public.schedules(doctor_id);
CREATE INDEX IF NOT EXISTS idx_schedules_day ON public.schedules(day_of_week);
CREATE INDEX IF NOT EXISTS idx_mading_type ON public.mading_content(type);
CREATE INDEX IF NOT EXISTS idx_mading_order ON public.mading_content("order");
CREATE INDEX IF NOT EXISTS idx_hero_order ON public.hero_banners("order");

-- ============================================================
-- PART 8: SAMPLE DATA (OPTIONAL - Uncomment jika perlu)
-- ============================================================

-- Sample Hero Banners
-- INSERT INTO public.hero_banners (image_url, "order", is_active)
-- VALUES
--   ('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=600&fit=crop', 1, true),
--   ('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=600&fit=crop', 2, true),
--   ('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=600&fit=crop', 3, true)
-- ON CONFLICT DO NOTHING;

-- Sample Mading Content - Edukasi
-- INSERT INTO public.mading_content (type, title, description, image_url, date, "order")
-- VALUES
--   (
--     'edukasi',
--     'Pentingnya Vaksinasi untuk Kesehatan Anak',
--     'Vaksinasi adalah langkah penting dalam menjaga kesehatan anak anda dari penyakit-penyakit berbahaya.',
--     'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
--     'April 12, 2026',
--     1
--   )
-- ON CONFLICT DO NOTHING;

-- ============================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- ============================================================

-- Check if buckets exist
-- SELECT id, name, public FROM storage.buckets WHERE id IN ('doctors', 'content');

-- Check if tables exist
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check RLS policies
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- ============================================================
-- TROUBLESHOOTING
-- ============================================================

-- Error: "must be owner of table objects"
-- Solusi: Jangan modifikasi storage.objects via SQL, gunakan Supabase Console UI
-- 1. Buka Storage di Supabase Console
-- 2. Edit bucket policies dari UI (lebih aman)

-- Jika error "bucket_id does not exist in storage.buckets":
-- 1. Pastikan bagian CREATE STORAGE BUCKETS sudah dijalankan
-- 2. Verifikasi via Storage menu di Supabase Console
-- 3. Jika masih error, coba refresh halaman

-- Jika error pada RLS policies untuk tables:
-- 1. Pastikan RLS sudah di-ENABLE pada tabel
-- 2. Verifikasi policies via Authentication -> Policies di Supabase Console
-- 3. Test dengan authenticated user

-- Jika upload file error:
-- 1. Pastikan bucket adalah public (set via Storage UI)
-- 2. Pastikan file size tidak melebihi limit
-- 3. Pastikan mime type sesuai dengan allowed_mime_types

-- ============================================================
-- SELESAI!
-- ============================================================
-- Langkah-langkah:
-- 1. Copy seluruh SQL di atas
-- 2. Buka Supabase Console -> Project -> SQL Editor
-- 3. Buat query baru
-- 4. Paste semua SQL
-- 5. Klik "Run" atau Ctrl+Enter
-- 6. Tunggu hingga selesai (tidak ada error)
-- 7. Verifikasi di Data Editor atau Storage
-- 8. Test upload di admin panel
-- ============================================================
