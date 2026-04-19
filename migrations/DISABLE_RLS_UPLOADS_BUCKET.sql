-- Disable Row Level Security untuk bucket 'uploads'
-- Script ini HARUS dijalankan sebagai OWNER (gunakan service role key)
-- Login dengan service role key jika belum

-- 1. Drop semua existing policies di storage.objects
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload to uploads bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read to uploads bucket" ON storage.objects;

-- 2. Disable RLS pada table storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 3. Create permissive policies yang allow siapa saja
CREATE POLICY "Allow all operations on storage objects"
ON storage.objects
FOR ALL
USING (true)
WITH CHECK (true);

-- Setelah menjalankan script ini, RLS akan disabled dan upload harus berhasil
