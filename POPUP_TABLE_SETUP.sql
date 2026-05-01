-- Script SQL untuk membuat table POPUPS di Supabase
-- Copy & paste ke SQL Editor di Supabase

-- Create POPUPS table
CREATE TABLE IF NOT EXISTS popups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 1 CHECK (display_order >= 1 AND display_order <= 3),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index untuk performance
CREATE INDEX IF NOT EXISTS idx_popups_display_order ON popups(display_order);
CREATE INDEX IF NOT EXISTS idx_popups_is_active ON popups(is_active);

-- Enable RLS (Row Level Security)
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- Create policy untuk SELECT (public read)
CREATE POLICY "Allow public read popups" ON popups
  FOR SELECT
  USING (true);

-- Create policy untuk INSERT (authenticated users only)
CREATE POLICY "Allow authenticated users to insert popups" ON popups
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy untuk UPDATE (authenticated users only)
CREATE POLICY "Allow authenticated users to update popups" ON popups
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy untuk DELETE (authenticated users only)
CREATE POLICY "Allow authenticated users to delete popups" ON popups
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_popups_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_popups_updated_at_trigger
BEFORE UPDATE ON popups
FOR EACH ROW
EXECUTE FUNCTION update_popups_updated_at();

-- Query untuk test (setelah table dibuat)
-- SELECT * FROM popups ORDER BY display_order;
