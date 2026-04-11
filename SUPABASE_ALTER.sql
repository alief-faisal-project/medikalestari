-- ============================================================
-- SUPABASE ALTER STATEMENTS - Jalankan di SQL Editor Supabase
-- ============================================================
-- Tujuan:
-- 1. Fix RLS policy untuk INSERT/UPDATE/DELETE ke tabel doctors
-- 2. Pastikan admin authenticated bisa melakukan CRUD operations
-- 3. Hapus constraints yang terlalu ketat
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

-- 4. ENABLE RLS pada storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 5. CREATE policies untuk storage bucket doctors

-- Policy untuk SELECT storage (public read)
CREATE POLICY "Allow public read doctors storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'doctors');

-- Policy untuk INSERT storage (authenticated upload)
CREATE POLICY "Allow authenticated insert doctors storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'doctors');

-- Policy untuk UPDATE storage (authenticated)
CREATE POLICY "Allow authenticated update doctors storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'doctors') WITH CHECK (bucket_id = 'doctors');

-- Policy untuk DELETE storage (authenticated)
CREATE POLICY "Allow authenticated delete doctors storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'doctors');

-- 6. Pastikan bucket doctors ada dan public
-- (Jalankan di UI Storage jika belum ada, atau uncomment di bawah)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('doctors', 'doctors', true)
-- ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================================
-- CATATAN PENTING:
-- ============================================================
-- - Policies di atas menggunakan CHECK (true) = memperbolehkan semua user authenticated
-- - Jika ingin lebih ketat, batasi dengan: auth.uid() = '{user_id}' atau role check lainnya
-- - Untuk testing/development: policies ini cukup permissive untuk admin
-- - Untuk production: pertimbangkan menambahkan column 'created_by' ke doctors table dan check auth.uid()
-- 
-- Langkah selanjutnya:
-- 1. Login ke Supabase Console
-- 2. Buka Project -> SQL Editor
-- 3. Buat query baru
-- 4. Copy-paste semua SQL di atas
-- 5. Jalankan (Run)
-- 6. Kembali ke admin panel dan coba submit dokter baru
-- ============================================================
